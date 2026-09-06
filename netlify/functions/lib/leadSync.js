// Orchestrator: gate -> map -> upsert -> add tags -> duplicate-safe opportunity.
// No process.env access (config is injected). Returns a structured summary and
// never throws — the Netlify Forms submission is always the recovery record.

import { missingRequiredKeys } from './config.js'
import { mapLead } from './leadMapper.js'
import { createGhlClient } from './ghlClient.js'

const NOOP_LOGGER = { error() {}, warn() {}, info() {}, debug() {} }

/**
 * @param {Record<string,string>} eventData  Netlify formSubmitted `event.data`.
 * @param {{config: object, logger?: object, client?: object}} deps
 *   `client` may be injected for tests; otherwise a real client is built.
 */
export async function syncLead(eventData, { config, logger, client } = {}) {
  const log = logger ?? NOOP_LOGGER

  // Gate off: exit with no outbound call.
  if (!config?.syncEnabled) {
    log.info({ event: 'lead_sync', outcome: 'skipped', reason: 'sync-disabled' })
    return { outcome: 'skipped', reason: 'sync-disabled' }
  }

  // Gate on but misconfigured: fail closed, log names only.
  const missing = missingRequiredKeys(config)
  if (missing.length > 0) {
    log.error({ event: 'lead_sync', outcome: 'skipped', reason: 'missing-config', missing })
    return { outcome: 'skipped', reason: 'missing-config', missing }
  }

  const mapped = mapLead(eventData, {
    locationId: config.locationId,
    opportunityNamePrefix: config.opportunityNamePrefix,
  })
  if (!mapped.ok) {
    const detail = mapped.missingFields ? { missingFields: mapped.missingFields } : {}
    log.info({ event: 'lead_sync', outcome: 'skipped', reason: mapped.reason, ...detail })
    return { outcome: 'skipped', reason: mapped.reason, ...detail }
  }

  const ghl = client ?? createGhlClient(config)

  try {
    const upsert = await ghl.upsertContact(mapped.contact)
    if (!upsert.contactId) {
      log.error({ event: 'lead_sync', step: 'upsert', outcome: 'error', reason: 'no-contact-id', traceId: upsert.traceId })
      return { outcome: 'error', step: 'upsert', reason: 'no-contact-id' }
    }
    log.info({ event: 'lead_sync', step: 'upsert', outcome: 'ok', isNew: upsert.isNew, traceId: upsert.traceId })

    // Deterministic attribution: exactly the configured source + quote tags,
    // de-duplicated. GHL_TEST_TAG is never applied to customer leads here.
    const tags = [...new Set([config.sourceTag, config.quoteTag].filter(Boolean))]
    const tagResult = await ghl.addContactTags(upsert.contactId, tags)
    log.info({
      event: 'lead_sync',
      step: 'tags',
      outcome: tagResult.skipped ? 'skipped' : 'ok',
      count: tagResult.added.length,
      traceId: tagResult.traceId ?? null,
    })

    // Duplicate-safe policy, scoped to website-quote opportunities only. An
    // existing open opportunity suppresses creation ONLY when its name begins
    // with the configured GHL_OPPORTUNITY_NAME_PREFIX (the search endpoint
    // already scopes to this contact + pipeline + status=open). An unrelated
    // open opportunity (different prefix) does not suppress creation.
    const prefix = config.opportunityNamePrefix
    const openOpportunities = await ghl.searchOpenOpportunities(upsert.contactId)
    const applicable = prefix
      ? openOpportunities.filter(
          (opp) => typeof opp?.name === 'string' && opp.name.startsWith(prefix),
        )
      : openOpportunities
    if (applicable.length > 0) {
      log.info({ event: 'lead_sync', step: 'opportunity', outcome: 'ok', action: 'reused-existing', openCount: openOpportunities.length, applicableCount: applicable.length })
      return {
        outcome: 'ok',
        contact: upsert.isNew ? 'created' : 'updated',
        opportunity: 'existing',
        openCount: openOpportunities.length,
        applicableCount: applicable.length,
      }
    }

    const created = await ghl.createOpportunity({
      contactId: upsert.contactId,
      name: mapped.opportunity.name,
    })
    log.info({ event: 'lead_sync', step: 'opportunity', outcome: 'ok', action: 'created', traceId: created.traceId })
    return {
      outcome: 'ok',
      contact: upsert.isNew ? 'created' : 'updated',
      opportunity: 'created',
    }
  } catch (err) {
    // Non-sensitive error metadata only. No tokens, no PII, no payload echo.
    log.error({
      event: 'lead_sync',
      outcome: 'error',
      name: err?.name ?? 'Error',
      status: err?.status ?? null,
      code: err?.code ?? null,
      traceId: err?.traceId ?? null,
    })
    return { outcome: 'error', reason: err?.name ?? 'Error', status: err?.status ?? null }
  }
}
