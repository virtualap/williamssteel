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
  const forbidden = ['leadSync', 'ghlClient', 'leadMapper', 'loadConfig', 'GHL_SYNC_ENABLED', 'fetch(']
  for (const token of forbidden) {
    check(`code (excluding comments) does not reference "${token}"`, !code.includes(token))
  }
  check('code imports only the webhook secret helper from lib/config.js',
    code.includes("import { loadWebhookSecret } from './lib/config.js'") &&
    !/from ['"]\.\/lib\/(leadSync|ghlClient|leadMapper)\.js['"]/.test(code))
}

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
