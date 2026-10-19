// Ordinary Netlify HTTP Function. Phase 1: authenticated receiver for the
// Netlify Forms outgoing-notification webhook. Bypasses the site's proven-
// non-invoking formSubmitted platform-event path.
//
// Phase 2: after authentication, hands the submission's form fields to the
// existing syncLead(), which is gated by GHL_SYNC_ENABLED (off by default) and
// fails closed on missing config. This file makes no outbound request itself.
//
// No custom `path` is set below: per current Netlify Functions docs, setting
// config.path REPLACES the default route, so leaving it unset is what keeps
// the function reachable at the conventional
//   /.netlify/functions/netlify-form-webhook

import { timingSafeEqual } from 'node:crypto'
import { loadWebhookSecret, loadConfig, createLogger } from './lib/config.js'
import { syncLead } from './lib/leadSync.js'

export const config = {
  method: ['POST'],
}

const NO_STORE = { 'Cache-Control': 'no-store' }

function plainText(status, text) {
  return new Response(text, {
    status,
    headers: { ...NO_STORE, 'Content-Type': 'text/plain' },
  })
}

// Fixed, safe rejection marker: event/outcome/reason only. No request data.
function logRejected(reason) {
  console.info(JSON.stringify({ event: 'netlify_form_webhook', outcome: 'rejected', reason }))
}

function noContent() {
  return new Response(null, { status: 204, headers: NO_STORE })
}

// Pure, defensive: never throws, never returns values — key names only.
export const sortedKeys = (value) =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? Object.keys(value).sort()
    : []

// Pure. Allowlisted structural metadata only — no field values.
export function buildShapeRecord(body) {
  return {
    event: 'netlify_form_webhook_shape',
    topLevelKeys: sortedKeys(body),
    payloadKeys: sortedKeys(body?.payload),
    dataKeys: sortedKeys(body?.data),
    submissionKeys: sortedKeys(body?.submission),
    formKeys: sortedKeys(body?.form),
    typeofPayload: typeof body?.payload,
    typeofData: typeof body?.data,
    typeofSubmission: typeof body?.submission,
    typeofForm: typeof body?.form,
  }
}

// Pure. Timing-safe comparison, only performed once byte lengths are equal.
export function secretsMatch(supplied, configured) {
  if (typeof supplied !== 'string' || typeof configured !== 'string') return false
  if (supplied.length === 0 || configured.length === 0) return false
  const a = Buffer.from(supplied)
  const b = Buffer.from(configured)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

// Pure. Rejects missing, malformed, or non-object (array/scalar/null) JSON.
export function parseJsonBody(text) {
  if (typeof text !== 'string' || text.trim() === '') return { ok: false }
  let parsed
  try {
    parsed = JSON.parse(text)
  } catch {
    return { ok: false }
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false }
  }
  return { ok: true, body: parsed }
}

// Pure. The Netlify outgoing-webhook body is the submission object: `data`
// holds the form fields, and the form identity is the top-level `form_name`
// (the hidden `form-name` field is NOT present inside `data`). The mapper
// identifies the form by `data['form-name']`, so it is supplied from
// `form_name`. Falls back to a nested payload.data, then {}.
export function extractFormData(body) {
  const candidate = [body?.data, body?.payload?.data].find(
    (value) => value && typeof value === 'object' && !Array.isArray(value),
  )
  const fields = { ...(candidate ?? {}) }
  if (typeof body?.form_name === 'string') fields['form-name'] = body.form_name
  return fields
}

// Runs the lead sync for an authenticated, parsed submission. Never throws and
// never returns field values. syncLead itself exits with no outbound call
// unless GHL_SYNC_ENABLED is exactly "true" and the required config is present.
// `deps` lets the self-test inject fakes (no real config or network).
export async function processSubmission(body, deps = {}) {
  try {
    const loadCfg = deps.loadConfig ?? loadConfig
    const sync = deps.syncLead ?? syncLead
    const config = loadCfg()
    const logger = (deps.createLogger ?? createLogger)(config.logLevel)
    const result = await sync(extractFormData(body), { config, logger })
    return { outcome: result?.outcome ?? 'unknown', reason: result?.reason }
  } catch {
    return { outcome: 'error', reason: 'sync-threw' }
  }
}

export default async (request) => {
  if (request.method !== 'POST') {
    logRejected('method-not-allowed')
    return plainText(405, 'Method Not Allowed')
  }

  const configuredSecret = loadWebhookSecret()
  if (!configuredSecret) {
    logRejected('secret-unconfigured')
    return plainText(503, 'Service Unavailable')
  }

  const url = new URL(request.url)
  const suppliedSecret = url.searchParams.get('secret') ?? ''
  if (!secretsMatch(suppliedSecret, configuredSecret)) {
    logRejected('secret-mismatch')
    return plainText(401, 'Unauthorized')
  }

  let rawText
  try {
    rawText = await request.text()
  } catch {
    logRejected('invalid-json')
    return plainText(400, 'Bad Request')
  }

  const parsed = parseJsonBody(rawText)
  if (!parsed.ok) {
    logRejected('invalid-json')
    return plainText(400, 'Bad Request')
  }

  // Sanitized shape only — never the parsed body itself, a header, or the
  // secret.
  console.info(JSON.stringify(buildShapeRecord(parsed.body)))

  const result = await processSubmission(parsed.body)
  console.info(
    JSON.stringify({
      event: 'netlify_form_webhook',
      outcome: 'accepted',
      sync: result.outcome,
      reason: result.reason ?? null,
    }),
  )

  // Always 204 once authenticated: Netlify disables the notification after
  // repeated 4xx/5xx, and the submission is already safe in Netlify Forms.
  return noContent()
}
