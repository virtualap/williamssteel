// Offline self-test for the GoHighLevel lead sync.
//
//   DRY_RUN=true node scripts/ghl-sync-selftest.mjs
//
// Zero dependencies. NO network calls. NO real credentials or CRM ids — every
// value below is obviously synthetic. Exercises the config gate, the pure
// mapper, and the orchestrator against a mock client.

import { buildConfig, missingRequiredKeys } from '../netlify/functions/lib/config.js'
import { mapLead } from '../netlify/functions/lib/leadMapper.js'
import { syncLead } from '../netlify/functions/lib/leadSync.js'

// Hard guarantee: this self-test performs no network I/O. Any accidental real
// request (e.g. a missed mock injection) fails loudly instead of going out.
const realFetch = globalThis.fetch
globalThis.fetch = () => {
  throw new Error('self-test attempted a network request')
}
process.on('exit', () => {
  globalThis.fetch = realFetch
})

console.log(`DRY_RUN=${process.env.DRY_RUN ?? '(unset)'} — no network, no credentials\n`)

let passed = 0
let failed = 0
function check(label, condition) {
  if (condition) {
    passed += 1
    console.log(`  ok   ${label}`)
  } else {
    failed += 1
    console.error(`  FAIL ${label}`)
  }
}

const SILENT = { error() {}, warn() {}, info() {}, debug() {} }

const VALID_SUBMISSION = {
  'form-name': 'contact-quote',
  'bot-field': '',
  name: '  Jane   Sample  ',
  email: 'jane@example.test',
  phone: '555-0100',
  company: 'Sample Fabricators',
  projectType: 'commercial',
  message: 'Structural steel quote request.\nTwo buildings.',
  file: 'https://forms.example/upload/should-not-be-used.pdf',
}

const FULL_ENV = {
  GHL_SYNC_ENABLED: 'true',
  GHL_PRIVATE_INTEGRATION_TOKEN: 'pit-FAKE-not-a-real-token',
  GHL_LOCATION_ID: 'loc_FAKE',
  GHL_PIPELINE_ID: 'pipe_FAKE',
  GHL_PIPELINE_STAGE_ID: 'stage_FAKE',
  GHL_QUOTE_TAG: 'website-quote-request',
  GHL_SOURCE_TAG: 'website',
  GHL_OPPORTUNITY_NAME_PREFIX: 'Website quote',
  LEAD_SYNC_LOG_LEVEL: 'error',
}
const FULL_CONFIG = buildConfig(FULL_ENV)

function mockClient({ openOpportunities = [] } = {}) {
  const calls = {
    upsertContact: 0,
    addContactTags: 0,
    searchOpenOpportunities: 0,
    createOpportunity: 0,
  }
  return {
    calls,
    lastContact: null,
    lastTags: null,
    lastOpportunity: null,
    async upsertContact(contact) {
      calls.upsertContact += 1
      this.lastContact = contact
      return { contactId: 'contact_FAKE', isNew: true, traceId: 'trace_upsert' }
    },
    async addContactTags(_contactId, tags) {
      calls.addContactTags += 1
      this.lastTags = tags
      return { added: tags, skipped: tags.length === 0, traceId: 'trace_tags' }
    },
    async searchOpenOpportunities() {
      calls.searchOpenOpportunities += 1
      return openOpportunities
    },
    async createOpportunity(opportunity) {
      calls.createOpportunity += 1
      this.lastOpportunity = opportunity
      return { opportunityId: 'opp_FAKE', traceId: 'trace_create' }
    },
  }
}

console.log('mapLead:')
{
  const r = mapLead(VALID_SUBMISSION, { locationId: 'loc_FAKE', opportunityNamePrefix: 'Website quote' })
  check('valid submission maps ok', r.ok === true)
  check('name whitespace collapsed', r.contact.name === 'Jane Sample')
  check('companyName preserved', r.contact.companyName === 'Sample Fabricators')
  check('locationId injected', r.contact.locationId === 'loc_FAKE')
  check('source is website label', r.contact.source === 'Williams Steel Works website')
  check('no tags property on contact payload', !('tags' in r.contact))
  check('contact has native fields only',
    Object.keys(r.contact).sort().join(',') === 'companyName,email,locationId,name,phone,source')
  check('opportunity limited to name+status',
    Object.keys(r.opportunity).sort().join(',') === 'name,status')
  check('opportunity status open', r.opportunity.status === 'open')
  check('opportunity name carries prefix + project type',
    r.opportunity.name.startsWith('Website quote') && r.opportunity.name.includes('commercial'))
  check('uploaded file value never mapped', !JSON.stringify(r).includes('should-not-be-used.pdf'))
  check('project message never mapped', !JSON.stringify(r).includes('Two buildings'))
}
check('wrong form-name -> skipped',
  mapLead({ ...VALID_SUBMISSION, 'form-name': 'newsletter' }).reason === 'form-name-mismatch')
check('filled honeypot -> skipped',
  mapLead({ ...VALID_SUBMISSION, 'bot-field': 'i am a bot' }).reason === 'honeypot')
{
  const r = mapLead({ ...VALID_SUBMISSION, phone: '   ' })
  check('blank required field -> missing-fields', r.reason === 'missing-fields')
  check('missing field name reported', r.missingFields.includes('phone'))
}
{
  const r = mapLead({ ...VALID_SUBMISSION, company: '' })
  check('absent company omitted from contact', r.ok && !('companyName' in r.contact))
}

console.log('config gate:')
check('GHL_SYNC_ENABLED unset -> disabled', buildConfig({}).syncEnabled === false)
check('GHL_SYNC_ENABLED "TRUE" -> disabled (exact match only)',
  buildConfig({ GHL_SYNC_ENABLED: 'TRUE' }).syncEnabled === false)
check('GHL_SYNC_ENABLED "true" -> enabled',
  buildConfig({ GHL_SYNC_ENABLED: 'true' }).syncEnabled === true)
check('full config -> nothing missing', missingRequiredKeys(FULL_CONFIG).length === 0)
check('missing token reported by NAME only',
  missingRequiredKeys(buildConfig({ ...FULL_ENV, GHL_PRIVATE_INTEGRATION_TOKEN: '' }))
    .join(',') === 'GHL_PRIVATE_INTEGRATION_TOKEN')
check('missing GHL_SOURCE_TAG is a required-config failure',
  missingRequiredKeys(buildConfig({ ...FULL_ENV, GHL_SOURCE_TAG: '' })).includes('GHL_SOURCE_TAG'))
check('missing GHL_QUOTE_TAG is a required-config failure',
  missingRequiredKeys(buildConfig({ ...FULL_ENV, GHL_QUOTE_TAG: '' })).includes('GHL_QUOTE_TAG'))
check('api version defaults to v3', buildConfig({}).apiVersion === 'v3')
check('api base defaults to leadconnector', buildConfig({}).apiBaseUrl === 'https://services.leadconnectorhq.com')
check('timeout falls back on garbage', buildConfig({ GHL_REQUEST_TIMEOUT_MS: 'abc' }).requestTimeoutMs === 10000)
check('GHL_TEST_TAG default is test:do-not-contact', buildConfig({}).testTag === 'test:do-not-contact')

console.log('syncLead — no outbound on gate/config failure:')
{
  const client = mockClient()
  const r = await syncLead(VALID_SUBMISSION, { config: buildConfig({}), logger: SILENT, client })
  check('disabled -> skipped', r.outcome === 'skipped' && r.reason === 'sync-disabled')
  check('disabled -> zero outbound calls',
    client.calls.upsertContact === 0 && client.calls.addContactTags === 0 &&
    client.calls.searchOpenOpportunities === 0 && client.calls.createOpportunity === 0)
}
{
  const client = mockClient()
  const partial = buildConfig({ GHL_SYNC_ENABLED: 'true', GHL_LOCATION_ID: 'loc_FAKE' })
  const r = await syncLead(VALID_SUBMISSION, { config: partial, logger: SILENT, client })
  check('enabled + incomplete config -> fail closed', r.outcome === 'skipped' && r.reason === 'missing-config')
  check('incomplete config -> zero outbound calls', client.calls.upsertContact === 0)
  check('incomplete config -> reports missing NAMES', r.missing.includes('GHL_PRIVATE_INTEGRATION_TOKEN'))
}
{
  const client = mockClient()
  const noSource = buildConfig({ ...FULL_ENV, GHL_SOURCE_TAG: '' })
  const r = await syncLead(VALID_SUBMISSION, { config: noSource, logger: SILENT, client })
  check('missing GHL_SOURCE_TAG -> fail closed', r.outcome === 'skipped' && r.reason === 'missing-config')
  check('missing GHL_SOURCE_TAG -> zero outbound calls', client.calls.upsertContact === 0)
  check('missing GHL_SOURCE_TAG -> name in report', r.missing.includes('GHL_SOURCE_TAG'))
}
{
  const client = mockClient()
  const noQuote = buildConfig({ ...FULL_ENV, GHL_QUOTE_TAG: '' })
  const r = await syncLead(VALID_SUBMISSION, { config: noQuote, logger: SILENT, client })
  check('missing GHL_QUOTE_TAG -> fail closed', r.outcome === 'skipped' && r.reason === 'missing-config')
  check('missing GHL_QUOTE_TAG -> zero outbound calls', client.calls.upsertContact === 0)
  check('missing GHL_QUOTE_TAG -> name in report', r.missing.includes('GHL_QUOTE_TAG'))
}

console.log('syncLead — happy path + tag determinism:')
{
  const client = mockClient()
  const r = await syncLead(VALID_SUBMISSION, { config: FULL_CONFIG, logger: SILENT, client })
  check('happy path -> ok', r.outcome === 'ok')
  check('happy path -> opportunity created', r.opportunity === 'created')
  check('upsert called once', client.calls.upsertContact === 1)
  check('Contact Upsert payload has NO tags property', !('tags' in client.lastContact))
  check('tags called once', client.calls.addContactTags === 1)
  check('Add Tags receives configured source + quote', client.lastTags.join(',') === 'website,website-quote-request')
  check('Add Tags array is de-duplicated', new Set(client.lastTags).size === client.lastTags.length)
  check('GHL_TEST_TAG not applied to customer lead', !client.lastTags.includes('test:do-not-contact'))
  check('search called once', client.calls.searchOpenOpportunities === 1)
  check('create called once', client.calls.createOpportunity === 1)
  check('created opportunity name is prefixed', client.lastOpportunity.name.startsWith('Website quote'))
}
{
  const client = mockClient()
  const sameTag = buildConfig({ ...FULL_ENV, GHL_SOURCE_TAG: 'website', GHL_QUOTE_TAG: 'website' })
  await syncLead(VALID_SUBMISSION, { config: sameTag, logger: SILENT, client })
  check('identical source/quote tags collapse to one entry', client.lastTags.length === 1)
}

console.log('syncLead — website-quote opportunity scope:')
{
  const client = mockClient({
    openOpportunities: [{ id: 'opp_UNRELATED', status: 'open', name: 'Trade show follow-up' }],
  })
  const r = await syncLead(VALID_SUBMISSION, { config: FULL_CONFIG, logger: SILENT, client })
  check('unrelated open opp (no prefix) does NOT suppress creation', r.opportunity === 'created')
  check('unrelated open opp -> create still called', client.calls.createOpportunity === 1)
}
{
  const client = mockClient({
    openOpportunities: [{ id: 'opp_WQ', status: 'open', name: 'Website quote industrial — Jane Sample' }],
  })
  const r = await syncLead(VALID_SUBMISSION, { config: FULL_CONFIG, logger: SILENT, client })
  check('matching prefixed open opp suppresses a duplicate', r.opportunity === 'existing')
  check('matching prefixed open opp -> no create call', client.calls.createOpportunity === 0)
}
{
  const client = mockClient({
    openOpportunities: [
      { id: 'opp_UNRELATED', status: 'open', name: 'Trade show follow-up' },
      { id: 'opp_WQ', status: 'open', name: 'Website quote commercial — Jane Sample' },
    ],
  })
  const r = await syncLead(VALID_SUBMISSION, { config: FULL_CONFIG, logger: SILENT, client })
  check('mixed set with one prefixed match -> suppressed', r.opportunity === 'existing' && client.calls.createOpportunity === 0)
}
{
  const client = mockClient()
  const r = await syncLead(
    { ...VALID_SUBMISSION, 'bot-field': 'bot' },
    { config: FULL_CONFIG, logger: SILENT, client },
  )
  check('honeypot at sync layer -> skipped', r.outcome === 'skipped' && r.reason === 'honeypot')
  check('honeypot -> zero outbound calls', client.calls.upsertContact === 0)
}

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
