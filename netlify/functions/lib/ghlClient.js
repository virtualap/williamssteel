// Narrow GoHighLevel v3 REST client. Server-only. Native fetch + AbortController.
//
// Confirmed against current official HighLevel API docs (Version: v3,
// https://services.leadconnectorhq.com):
//   - POST /contacts/upsert                 (locationId required; never send `tags`)
//   - POST /contacts/:contactId/tags        (dedicated add-tags endpoint)
//   - GET  /opportunities/search            (status=open filter)
//   - POST /opportunities/                  (create; documented fields only)

export class GhlApiError extends Error {
  constructor(message, { status = null, traceId = null, code = null } = {}) {
    super(message)
    this.name = 'GhlApiError'
    this.status = status
    this.traceId = traceId
    this.code = code
  }
}

export function createGhlClient(config, deps = {}) {
  const fetchImpl = deps.fetch ?? globalThis.fetch
  if (typeof fetchImpl !== 'function') {
    throw new Error('global fetch is unavailable in this runtime')
  }

  const baseHeaders = {
    Authorization: `Bearer ${config.privateIntegrationToken}`,
    Accept: 'application/json',
    Version: config.apiVersion,
  }

  async function request(method, path, { query, body } = {}) {
    const url = new URL(path, config.apiBaseUrl)
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), config.requestTimeoutMs)

    let response
    try {
      response = await fetchImpl(url, {
        method,
        headers: body
          ? { ...baseHeaders, 'Content-Type': 'application/json' }
          : baseHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })
    } catch (err) {
      const timedOut = err && err.name === 'AbortError'
      throw new GhlApiError(
        timedOut ? 'GoHighLevel request timed out' : 'GoHighLevel request failed',
        { status: 0 },
      )
    } finally {
      clearTimeout(timer)
    }

    const text = await response.text()
    let json = null
    if (text) {
      try {
        json = JSON.parse(text)
      } catch {
        json = null
      }
    }

    if (!response.ok) {
      throw new GhlApiError(`GoHighLevel ${method} ${path} responded ${response.status}`, {
        status: response.status,
        traceId: json?.traceId ?? null,
        code: json?.code ?? json?.error ?? null,
      })
    }
    return json ?? {}
  }

  return {
    // 1. Contact upsert. locationId is injected here from config. `tags` is
    //    stripped defensively — sending it would overwrite existing tags.
    async upsertContact(contact) {
      const body = { ...contact, locationId: config.locationId }
      delete body.tags
      const data = await request('POST', '/contacts/upsert', { body })
      return {
        contactId: data?.contact?.id ?? null,
        isNew: Boolean(data?.new),
        traceId: data?.traceId ?? null,
      }
    },

    // 2. Add tags via the dedicated endpoint. Never overwrites existing tags.
    async addContactTags(contactId, tags) {
      const clean = [
        ...new Set((tags ?? []).map((tag) => String(tag).trim()).filter(Boolean)),
      ]
      if (!contactId || clean.length === 0) return { added: [], skipped: true }
      const data = await request(
        'POST',
        `/contacts/${encodeURIComponent(contactId)}/tags`,
        { body: { tags: clean } },
      )
      return {
        added: clean,
        tags: data?.tags ?? null,
        traceId: data?.traceId ?? null,
        skipped: false,
      }
    },

    // 3. Search open opportunities for this contact in the configured pipeline.
    //    Uses the documented query parameter names exactly.
    async searchOpenOpportunities(contactId) {
      const data = await request('GET', '/opportunities/search', {
        query: {
          locationId: config.locationId,
          pipelineId: config.pipelineId,
          contactId,
          status: 'open',
          limit: 100,
        },
      })
      return Array.isArray(data?.opportunities) ? data.opportunities : []
    },

    // 4. Create a quote opportunity. Payload is limited to fields the current
    //    v3 Create Opportunity docs confirm.
    async createOpportunity({ contactId, name }) {
      const body = {
        locationId: config.locationId,
        pipelineId: config.pipelineId,
        pipelineStageId: config.pipelineStageId,
        contactId,
        name,
        status: 'open',
      }
      const data = await request('POST', '/opportunities/', { body })
      return {
        opportunityId: data?.opportunity?.id ?? data?.id ?? null,
        traceId: data?.traceId ?? null,
      }
    },
  }
}
