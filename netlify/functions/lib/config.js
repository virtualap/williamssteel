// The ONLY module that reads process.env for the GoHighLevel lead sync.
// Everything else receives an immutable config object built here.

const KNOWN_KEYS = [
  'GHL_SYNC_ENABLED',
  'GHL_PRIVATE_INTEGRATION_TOKEN',
  'GHL_LOCATION_ID',
  'GHL_PIPELINE_ID',
  'GHL_PIPELINE_STAGE_ID',
  'GHL_QUOTE_TAG',
  'GHL_SOURCE_TAG',
  'GHL_TEST_TAG',
  'GHL_API_BASE_URL',
  'GHL_API_VERSION',
  'GHL_REQUEST_TIMEOUT_MS',
  'GHL_OPPORTUNITY_NAME_PREFIX',
  'LEAD_SYNC_LOG_LEVEL',
]

// Env var name -> resolved config property. Absence of any of these while the
// sync gate is on is a fail-closed condition (see missingRequiredKeys). The two
// attribution tags are required so lead provenance in the CRM is deterministic.
const REQUIRED = [
  ['GHL_PRIVATE_INTEGRATION_TOKEN', 'privateIntegrationToken'],
  ['GHL_LOCATION_ID', 'locationId'],
  ['GHL_PIPELINE_ID', 'pipelineId'],
  ['GHL_PIPELINE_STAGE_ID', 'pipelineStageId'],
  ['GHL_SOURCE_TAG', 'sourceTag'],
  ['GHL_QUOTE_TAG', 'quoteTag'],
]

const DEFAULT_API_BASE_URL = 'https://services.leadconnectorhq.com'
const DEFAULT_API_VERSION = 'v3'
const DEFAULT_TIMEOUT_MS = 10000
const DEFAULT_LOG_LEVEL = 'info'
// Non-secret. Never auto-applied to customer leads; used only by the controlled
// test procedure and the native-workflow exclusion rule.
const DEFAULT_TEST_TAG = 'test:do-not-contact'

export const LOG_LEVELS = ['error', 'warn', 'info', 'debug']

function str(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function pickKnown(env) {
  const out = {}
  for (const key of KNOWN_KEYS) {
    if (typeof env[key] === 'string' && env[key] !== '') out[key] = env[key]
  }
  return out
}

// Pure: builds a frozen config from an env-like object. loadConfig() feeds it
// process.env; tests feed it explicit fixtures.
export function buildConfig(env = {}) {
  const raw = pickKnown(env)

  const timeout = Number.parseInt(raw.GHL_REQUEST_TIMEOUT_MS ?? '', 10)
  const requestTimeoutMs =
    Number.isFinite(timeout) && timeout > 0 ? timeout : DEFAULT_TIMEOUT_MS

  const level = str(raw.LEAD_SYNC_LOG_LEVEL)
  const logLevel = LOG_LEVELS.includes(level) ? level : DEFAULT_LOG_LEVEL

  return Object.freeze({
    // Gate: outbound CRM calls happen only when the string is exactly "true".
    syncEnabled: env.GHL_SYNC_ENABLED === 'true',
    privateIntegrationToken: str(raw.GHL_PRIVATE_INTEGRATION_TOKEN),
    locationId: str(raw.GHL_LOCATION_ID),
    pipelineId: str(raw.GHL_PIPELINE_ID),
    pipelineStageId: str(raw.GHL_PIPELINE_STAGE_ID),
    quoteTag: str(raw.GHL_QUOTE_TAG),
    sourceTag: str(raw.GHL_SOURCE_TAG),
    testTag: str(raw.GHL_TEST_TAG) || DEFAULT_TEST_TAG,
    apiBaseUrl: str(raw.GHL_API_BASE_URL) || DEFAULT_API_BASE_URL,
    apiVersion: str(raw.GHL_API_VERSION) || DEFAULT_API_VERSION,
    requestTimeoutMs,
    opportunityNamePrefix: str(raw.GHL_OPPORTUNITY_NAME_PREFIX),
    logLevel,
  })
}

export function loadConfig() {
  return buildConfig(process.env)
}

// Returns the NAMES of required env vars that are absent. Never returns values.
export function missingRequiredKeys(config) {
  return REQUIRED.filter(([, prop]) => !config[prop]).map(([envName]) => envName)
}

export function isReady(config) {
  return Boolean(config?.syncEnabled) && missingRequiredKeys(config).length === 0
}

// Minimal level-gated structured logger. Emits single JSON lines. Callers must
// pass only non-sensitive fields (names, counts, status codes, trace ids).
export function createLogger(level = DEFAULT_LOG_LEVEL) {
  const active = LOG_LEVELS.includes(level) ? level : DEFAULT_LOG_LEVEL
  const threshold = LOG_LEVELS.indexOf(active)
  const emit = (lvl, fields) => {
    if (LOG_LEVELS.indexOf(lvl) > threshold) return
    const line = JSON.stringify({ ts: new Date().toISOString(), level: lvl, ...fields })
    if (lvl === 'error') console.error(line)
    else if (lvl === 'warn') console.warn(line)
    else console.log(line)
  }
  return {
    error: (fields) => emit('error', fields),
    warn: (fields) => emit('warn', fields),
    info: (fields) => emit('info', fields),
    debug: (fields) => emit('debug', fields),
  }
}
