// Ordinary Netlify HTTP Function. Phase 1: authenticated receiver for the
// Netlify Forms outgoing-notification webhook. Bypasses the site's proven-
// non-invoking formSubmitted platform-event path.
//
// This phase intentionally does nothing with the notification except log a
// sanitized shape record. It never loads GoHighLevel config, never calls
// leadSync, and never makes an outbound request — even if GHL environment
// values happen to exist. GHL_SYNC_ENABLED is not read here at all.
//
// No custom `path` is set below: per current Netlify Functions docs, setting
// config.path REPLACES the default route, so leaving it unset is what keeps
// the function reachable at the conventional
//   /.netlify/functions/netlify-form-webhook

import { timingSafeEqual } from 'node:crypto'
import { loadWebhookSecret } from './lib/config.js'

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

export default async (request) => {
  if (request.method !== 'POST') {
    return plainText(405, 'Method Not Allowed')
  }

  const configuredSecret = loadWebhookSecret()
  if (!configuredSecret) {
    return plainText(503, 'Service Unavailable')
  }

  const url = new URL(request.url)
  const suppliedSecret = url.searchParams.get('secret') ?? ''
  if (!secretsMatch(suppliedSecret, configuredSecret)) {
    return plainText(401, 'Unauthorized')
  }

  let rawText
  try {
    rawText = await request.text()
  } catch {
    return plainText(400, 'Bad Request')
  }

  const parsed = parseJsonBody(rawText)
  if (!parsed.ok) {
    return plainText(400, 'Bad Request')
  }

  // Sanitized shape only — never the parsed body itself, a header, or the
  // secret. No GHL config load, no field mapping, no sync call, no outbound
  // request happens in this phase.
  console.info(JSON.stringify(buildShapeRecord(parsed.body)))
  console.info(JSON.stringify({ event: 'netlify_form_webhook', outcome: 'accepted_sync_disabled' }))

  return noContent()
}
