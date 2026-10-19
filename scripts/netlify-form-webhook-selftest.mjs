// Offline self-test for the Netlify Forms webhook receiver.
//
//   node scripts/netlify-form-webhook-selftest.mjs
//
// Zero dependencies. NO network calls. NO real secrets — every value below is
// obviously synthetic. Exercises only the pure request-validation and
// sanitization helpers exported from netlify-form-webhook.mjs; it does not
// construct a live Request/Response or contact Netlify/GoHighLevel.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  config,
  sortedKeys,
  buildShapeRecord,
  secretsMatch,
  parseJsonBody,
  extractFormData,
  processSubmission,
} from '../netlify/functions/netlify-form-webhook.mjs'

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

console.log('Function config (routing/method):')
check('config.method restricts to POST only', JSON.stringify(config.method) === '["POST"]')
check('config.path is left unset (keeps the conventional /.netlify/functions/ route)',
  !('path' in config))

console.log('\nsortedKeys — defensive, never throws:')
check('object -> sorted key names', sortedKeys({ b: 1, a: 2 }).join(',') === 'a,b')
check('array -> []', sortedKeys([1, 2, 3]).length === 0)
check('null -> []', sortedKeys(null).length === 0)
check('undefined -> []', sortedKeys(undefined).length === 0)
check('scalar (string) -> []', sortedKeys('nope').length === 0)
check('scalar (number) -> []', sortedKeys(42).length === 0)

console.log('\nbuildShapeRecord — valid shape extraction (keys/types only):')
{
  const body = {
    payload: { name: 'SHOULD_NOT_APPEAR', email: 'nobody@example.test' },
    data: { message: 'ALSO_SHOULD_NOT_APPEAR' },
    submission: { id: 'SUB_ID_SHOULD_NOT_APPEAR' },
    form: { name: 'contact-quote' },
    extraTopLevel: true,
  }
  const shape = buildShapeRecord(body)
  check('event label present', shape.event === 'netlify_form_webhook_shape')
  check('topLevelKeys sorted', shape.topLevelKeys.join(',') === 'data,extraTopLevel,form,payload,submission')
  check('payloadKeys sorted', shape.payloadKeys.join(',') === 'email,name')
  check('dataKeys sorted', shape.dataKeys.join(',') === 'message')
  check('submissionKeys sorted', shape.submissionKeys.join(',') === 'id')
  check('formKeys sorted', shape.formKeys.join(',') === 'name')
  check('typeofPayload is object', shape.typeofPayload === 'object')
  check('typeofData is object', shape.typeofData === 'object')
  check('typeofSubmission is object', shape.typeofSubmission === 'object')
  check('typeofForm is object', shape.typeofForm === 'object')
  const serialized = JSON.stringify(shape)
  check('no field VALUE leaks into the shape record', !serialized.includes('SHOULD_NOT_APPEAR'))
  check('no email value leaks into the shape record', !serialized.includes('nobody@example.test'))
  check('no submission id value leaks into the shape record', !serialized.includes('SUB_ID_SHOULD_NOT_APPEAR'))
}

console.log('\nbuildShapeRecord — scalar / array / null / missing nested objects never throw or leak:')
for (const [label, input] of [
  ['null body', null],
  ['undefined body', undefined],
  ['string body', 'just a string, not JSON at all'],
  ['number body', 12345],
  ['array body', [1, 2, 3]],
  ['empty object body (missing nested keys)', {}],
]) {
  let shape
  let threw = false
  try {
    shape = buildShapeRecord(input)
  } catch {
    threw = true
  }
  check(`${label} -> does not throw`, threw === false)
  if (!threw) {
    check(`${label} -> nested key arrays are empty`,
      shape.payloadKeys.length === 0 && shape.dataKeys.length === 0 &&
      shape.submissionKeys.length === 0 && shape.formKeys.length === 0)
    check(`${label} -> topLevelKeys is empty unless a plain object`,
      shape.topLevelKeys.length === (input && typeof input === 'object' && !Array.isArray(input) ? Object.keys(input).length : 0))
  }
}

console.log('\nsecretsMatch — wrong/missing secret rejected, timing-safe on equal length:')
const CONFIGURED = 'test-secret-fixture-not-real-0123456789'
check('correct secret matches', secretsMatch(CONFIGURED, CONFIGURED) === true)
check('wrong secret (same length) rejected', secretsMatch('x'.repeat(CONFIGURED.length), CONFIGURED) === false)
check('wrong secret (different length) rejected', secretsMatch('short', CONFIGURED) === false)
check('empty supplied secret rejected', secretsMatch('', CONFIGURED) === false)
check('missing supplied secret (undefined) rejected', secretsMatch(undefined, CONFIGURED) === false)
check('missing configured secret rejected', secretsMatch(CONFIGURED, '') === false)
check('both empty rejected', secretsMatch('', '') === false)
check('non-string inputs rejected without throwing', secretsMatch(null, CONFIGURED) === false && secretsMatch(CONFIGURED, null) === false)

console.log('\nparseJsonBody — malformed / missing / non-object JSON rejected:')
check('valid JSON object accepted', parseJsonBody('{"a":1}').ok === true)
check('valid JSON object body preserved for the caller', parseJsonBody('{"a":1}').body.a === 1)
check('empty string rejected', parseJsonBody('').ok === false)
check('whitespace-only string rejected', parseJsonBody('   \n\t  ').ok === false)
check('malformed JSON rejected', parseJsonBody('{not valid json').ok === false)
check('truncated JSON rejected', parseJsonBody('{"a":').ok === false)
check('JSON array (non-object) rejected', parseJsonBody('[1,2,3]').ok === false)
check('JSON string scalar (non-object) rejected', parseJsonBody('"just a string"').ok === false)
check('JSON number scalar (non-object) rejected', parseJsonBody('42').ok === false)
check('JSON null (non-object) rejected', parseJsonBody('null').ok === false)
check('non-string input rejected without throwing', parseJsonBody(undefined).ok === false)

console.log('\nStatic source check — no sync path or network call is reachable from this phase:')
{
  const modulePath = fileURLToPath(new URL('../netlify/functions/netlify-form-webhook.mjs', import.meta.url))
  const source = readFileSync(modulePath, 'utf8')
  // Strip comments so explanatory prose (which may legitimately mention these
  // names to document their ABSENCE) can't produce a false positive — this
  // checks actual code, not comment text.
  const code = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
  const forbidden = ['ghlClient', 'leadMapper', 'GHL_SYNC_ENABLED', 'fetch(', 'process.env']
  for (const token of forbidden) {
    check(`code (excluding comments) does not reference "${token}"`, !code.includes(token))
  }
  // Rejection diagnostics: fixed markers only, one per guard.
  const reasons = ['method-not-allowed', 'secret-unconfigured', 'secret-mismatch', 'invalid-json']
  for (const reason of reasons) {
    check(`rejection reason "${reason}" is a fixed marker`,
      code.includes(`logRejected('${reason}')`))
  }
  check('logRejected emits only event/outcome/reason',
    code.includes("console.info(JSON.stringify({ event: 'netlify_form_webhook', outcome: 'rejected', reason }))"))
  check('exactly one console.info in logRejected plus shape and accepted records',
    (code.match(/console\.info\(/g) || []).length === 3)
  check('rejection markers appear before their 405/503/401/400 responses',
    /logRejected\('method-not-allowed'\)\s*return plainText\(405/.test(code) &&
    /logRejected\('secret-unconfigured'\)\s*return plainText\(503/.test(code) &&
    /logRejected\('secret-mismatch'\)\s*return plainText\(401/.test(code) &&
    (code.match(/logRejected\('invalid-json'\)\s*return plainText\(400/g) || []).length === 2)
  check('accepted marker carries only outcome/sync/reason',
    code.includes("outcome: 'accepted'") && code.includes('sync: result.outcome') &&
    code.includes('reason: result.reason ?? null'))
  check('handler returns 204 after the sync step regardless of its result',
    /processSubmission\(parsed\.body\)[\s\S]*return noContent\(\)\s*\}\s*$/.test(code))
  check('shape marker event is preserved', code.includes("event: 'netlify_form_webhook_shape'"))
  const consoleLines = code.split('\n').filter((l) => l.includes('console.'))
  const unsafeLogTokens = ['request.url', 'request.headers', 'searchParams', 'suppliedSecret',
    'configuredSecret', 'rawText', 'error', 'err.', 'stack', 'message']
  for (const token of unsafeLogTokens) {
    check(`no console call references "${token}"`, !consoleLines.some((l) => l.includes(token)))
  }
  check('body is only logged through the key-only buildShapeRecord',
    consoleLines.filter((l) => l.includes('parsed')).every((l) => l.includes('buildShapeRecord(parsed.body)')))
  check('code imports config helpers and syncLead only (no direct client/mapper)',
    code.includes("import { loadWebhookSecret, loadConfig, createLogger } from './lib/config.js'") &&
    code.includes("import { syncLead } from './lib/leadSync.js'") &&
    !/from ['"]\.\/lib\/(ghlClient|leadMapper)\.js['"]/.test(code))
}

console.log('\nextractFormData — locates the form fields defensively:')
check('body.data object is used', extractFormData({ data: { a: '1' } }).a === '1')
check('payload.data is the fallback', extractFormData({ payload: { data: { b: '2' } } }).b === '2')
check('form-name is supplied from top-level form_name',
  extractFormData({ form_name: 'contact-quote', data: { name: 'x' } })['form-name'] === 'contact-quote')
check('form_name overrides any in-data form-name',
  extractFormData({ form_name: 'contact-quote', data: { 'form-name': 'other' } })['form-name'] === 'contact-quote')
check('no form_name -> no form-name injected',
  !('form-name' in extractFormData({ data: { name: 'x' } })))
check('array data ignored', Object.keys(extractFormData({ data: [1] })).length === 0)
check('missing data -> {}', Object.keys(extractFormData({})).length === 0)
check('null body -> {}', Object.keys(extractFormData(null)).length === 0)

console.log('\nprocessSubmission — injected fakes only, no config or network:')
{
  const calls = []
  const fakeCfg = () => ({ logLevel: 'info' })
  const fakeLogger = () => ({})
  const body = { data: { 'form-name': 'contact-quote', name: 'Synthetic Person' } }

  const ok = await processSubmission(body, {
    loadConfig: fakeCfg,
    createLogger: fakeLogger,
    syncLead: async (data) => { calls.push(data); return { outcome: 'skipped', reason: 'sync-disabled' } },
  })
  check('syncLead receives the extracted form fields', calls.length === 1 && calls[0]['form-name'] === 'contact-quote')
  check('result is passed through as outcome/reason only',
    ok.outcome === 'skipped' && ok.reason === 'sync-disabled' && Object.keys(ok).length === 2)

  const threw = await processSubmission(body, {
    loadConfig: fakeCfg,
    createLogger: fakeLogger,
    syncLead: async () => { throw new Error('SECRET_LEAK_CHECK') },
  })
  check('a throwing sync never propagates', threw.outcome === 'error' && threw.reason === 'sync-threw')
  check('thrown error text is not returned', !JSON.stringify(threw).includes('SECRET_LEAK_CHECK'))

  const cfgThrew = await processSubmission(body, {
    loadConfig: () => { throw new Error('boom') },
  })
  check('a throwing config load never propagates', cfgThrew.outcome === 'error')
}

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
