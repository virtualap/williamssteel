# GoHighLevel website lead sync

Server-only, event-driven sync from the verified Netlify `contact-quote` form to
GoHighLevel (HighLevel) CRM. Version 1.

## Data flow

```
Browser contact form  ──POST FormData /──►  Netlify Forms (system of record)
                                                  │  verifies submission
                                                  ▼
                    netlify/functions/form-submitted.js  ── formSubmitted(event) ──►
                                                  │
                                                  ▼
      lib/config.js ──► lib/leadMapper.js ──► lib/leadSync.js ──► lib/ghlClient.js
                                                  │
                                                  ▼
        1. POST /contacts/upsert            (create or update the contact)
        2. POST /contacts/{id}/tags         (add source + quote tags)
        3. GET  /opportunities/search       (any OPEN opp for this contact?)
        4. POST /opportunities/             (create only if none found)
                                                  │
                                                  ▼
                    Native GoHighLevel workflow: staff assignment + follow-up
```

The function runs **after** Netlify has verified the submission and **after** the
browser already received its response. It cannot block or change the form's
success/error UX. If the sync fails for any reason, the submission is still in
Netlify Forms and can be replayed by hand.

## Files

| File | Responsibility |
| --- | --- |
| `netlify/functions/form-submitted.js` | Netlify event function. Loads config, runs the sync, logs a summary. Never throws. |
| `netlify/functions/lib/config.js` | The only module that reads `process.env`. Builds an immutable config, gate + fail-closed helpers, a level-gated logger. |
| `netlify/functions/lib/leadMapper.js` | Pure. Verified `event.data` → CRM contact + opportunity payloads. No I/O. |
| `netlify/functions/lib/ghlClient.js` | Narrow GoHighLevel v3 REST client (native `fetch`, `AbortController`, timeout). |
| `netlify/functions/lib/leadSync.js` | Orchestration: gate → map → upsert → tag → duplicate-safe opportunity. Returns a structured summary; never throws. |
| `scripts/ghl-sync-selftest.mjs` | Offline, zero-dependency self-test. No network, no real credentials. |

`netlify/functions/lib/` is shared code, not deployed as functions (only
`netlify/functions/*.js` top-level files, or `name/name.js`, are functions).

## Environment variables

Set real values only in **Netlify → Site configuration → Environment variables**
(Functions runtime). Never commit real values. See `.env.example` for the blank
template.

| Variable | Required when enabled | Default | Notes |
| --- | --- | --- | --- |
| `GHL_SYNC_ENABLED` | — | `false` | Outbound calls happen only when the value is exactly `true`. |
| `GHL_PRIVATE_INTEGRATION_TOKEN` | yes | — | Secret. Sent as `Authorization: Bearer <token>`. |
| `GHL_LOCATION_ID` | yes | — | Location / sub-account id. |
| `GHL_PIPELINE_ID` | yes | — | Pipeline for website quote opportunities. |
| `GHL_PIPELINE_STAGE_ID` | yes | — | Stage new opportunities are created in. |
| `GHL_SOURCE_TAG` | yes | — | Attribution tag added after upsert. Missing → fail closed. |
| `GHL_QUOTE_TAG` | yes | — | Attribution tag added after upsert. Missing → fail closed. |
| `GHL_TEST_TAG` | no | `test:do-not-contact` | Non-secret. **Never** applied to customer leads — only for the controlled test procedure and the native-workflow exclusion rule. |
| `GHL_API_BASE_URL` | no | `https://services.leadconnectorhq.com` | |
| `GHL_API_VERSION` | no | `v3` | Sent as the `Version` header. |
| `GHL_REQUEST_TIMEOUT_MS` | no | `10000` | Per-request timeout via `AbortController`. |
| `GHL_OPPORTUNITY_NAME_PREFIX` | no | *(empty)* | Prefix for the opportunity name. |
| `LEAD_SYNC_LOG_LEVEL` | no | `info` | `error` \| `warn` \| `info` \| `debug`. |

### Enable / disable and fail-closed behavior

* **`GHL_SYNC_ENABLED` not exactly `true`** → the function exits immediately, no
  outbound call, logs `{ outcome: "skipped", reason: "sync-disabled" }`.
* **Enabled but any required variable is absent** → fail closed: no outbound
  call, logs `{ outcome: "skipped", reason: "missing-config", missing: [NAMES] }`.
  Values are never logged. The required set is: `GHL_PRIVATE_INTEGRATION_TOKEN`,
  `GHL_LOCATION_ID`, `GHL_PIPELINE_ID`, `GHL_PIPELINE_STAGE_ID`, `GHL_SOURCE_TAG`,
  `GHL_QUOTE_TAG`.
* **Rollback** is a single env var: set `GHL_SYNC_ENABLED=false`. No code
  redeploy needed. Netlify Forms keeps recording.

## Field mapping (v1)

Wire fields consumed from `event.data`: `form-name`, `bot-field`, `name`,
`email`, `phone`, `company`, `projectType`, `message`. The `file` field is read
by name (`file`, not the React `files` key) and **ignored** — file content and
file URLs are not sent to GoHighLevel in v1. Netlify Forms remains the inbound
attachment record.

**Contact** (`POST /contacts/upsert`): `name`, `email`, `phone`, `companyName`
(only when `company` is non-empty), `locationId`, `source` = `Williams Steel
Works website`. No first/last-name split, no country prefix, no derived values.
A `tags` property is **never** sent here (it would overwrite existing tags).

**Tags** (`POST /contacts/{id}/tags`, after upsert): a de-duplicated array of
exactly `GHL_SOURCE_TAG` and `GHL_QUOTE_TAG`. Always a dedicated request, never a
Contact Upsert property. `GHL_TEST_TAG` is never included for customer leads.

**Opportunity** (`POST /opportunities/`): `name` (`<prefix> <projectType> —
<name>`), `status` = `open`, plus `locationId` / `pipelineId` /
`pipelineStageId` / `contactId`. The current v3 Create Opportunity API documents
**no description or notes field**, so the free-text `message` is not forwarded to
the opportunity. No `monetaryValue` is invented.

**Required before any CRM call**: trimmed non-empty `name`, `email`, `phone`,
`projectType`, `message`. A blank required field → `{ reason:
"missing-fields", missingFields: [...] }`, no outbound call. A non-empty
`bot-field` → defensive no-op. `form-name` other than `contact-quote` → no-op.

## Opportunity de-duplication policy

Deterministic, no dependency on an idempotency key (none is documented for a
project-appropriate stable key). An existing opportunity suppresses creation
**only** when all three hold:

1. it belongs to the configured pipeline (the search endpoint enforces this);
2. its status is `open`;
3. its `name` begins with the configured `GHL_OPPORTUNITY_NAME_PREFIX`.

> Search `open` opportunities for this contact in the configured pipeline
> (`GET /opportunities/search?locationId=…&pipelineId=…&contactId=…&status=open`),
> then keep only those whose `name` starts with `GHL_OPPORTUNITY_NAME_PREFIX`.
> Create a new website-quote opportunity **only** when that filtered set is empty.

An unrelated open opportunity for the same contact (e.g. `Trade show follow-up`)
does **not** suppress creation of the website-quote opportunity.

**Limits:**

* For prefix scoping to be effective, set `GHL_OPPORTUNITY_NAME_PREFIX`. If it is
  empty, every open opportunity in the pipeline counts as applicable (the pre-
  correction behavior).
* Two submissions within the same short window can both see "no applicable open
  opportunity" and both create one (race). Acceptable for v1 volume.
* If a prior website-quote opportunity was moved to `won` / `lost` /
  `abandoned`, a new submission **will** create a fresh one. Usually desired for
  a genuinely new quote request.
* Dedup is per pipeline. An applicable opportunity in a different pipeline does
  not suppress creation here.
* No opportunity fields are updated on a repeat submission; the existing
  applicable opportunity is left as-is and only the contact is upserted +
  re-tagged.

## API contracts used (current official HighLevel v3 docs)

All requests: `https://services.leadconnectorhq.com`, headers
`Authorization: Bearer <token>`, `Accept: application/json`, `Version: v3`, and
`Content-Type: application/json` on requests with a body.

| Operation | Method + path | Notes |
| --- | --- | --- |
| Upsert contact | `POST /contacts/upsert` | `locationId` required. Response: `contact.id`, `new`, `traceId`. Docs warn `tags` here overwrites all existing tags — not sent. |
| Add tags | `POST /contacts/{contactId}/tags` | Body `{ "tags": [...] }`. Additive. |
| Search opportunities | `GET /opportunities/search` | Params `locationId` (required), `pipelineId`, `contactId`, `status=open`, `limit`. Response: `opportunities[]`. |
| Create opportunity | `POST /opportunities/` | Required `pipelineId`, `locationId`, `name`, `status`, `contactId`; optional `pipelineStageId`. No description/notes field. |

Reference docs:

* Netlify event functions — <https://docs.netlify.com/build/functions/trigger-on-events/>
* Upsert Contact — <https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/index.html>
* Add Tags — <https://marketplace.gohighlevel.com/docs/ghl/contacts/add-tags/index.html>
* Search Opportunity — <https://marketplace.gohighlevel.com/docs/ghl/opportunities/search-opportunity/index.html>
* Create Opportunity — <https://marketplace.gohighlevel.com/docs/ghl/opportunities/create-opportunity/index.html>
* Private Integration Token — <https://marketplace.gohighlevel.com/docs/Authorization/PrivateIntegrationsToken/>

### Private Integration scopes

The token is created in the GoHighLevel UI; the operator selects scopes there.
The capability needed is: **write contacts**, **read + write opportunities**
(contact upsert, add tags, search opportunities, create opportunity). The four
endpoint reference pages above do not enumerate exact scope identifier strings;
select the contact and opportunity read/write scopes offered when minting the
Private Integration and confirm against the authorization doc. If a call returns
`401`/`403`, the token is missing a scope.

## Controlled test plan

Keep `GHL_SYNC_ENABLED=false` in the production context throughout. Netlify Forms
captures every submission regardless.

1. **Offline:** `DRY_RUN=true node scripts/ghl-sync-selftest.mjs`. Verifies the
   config gate, fail-closed on any missing required var (including
   `GHL_SOURCE_TAG` / `GHL_QUOTE_TAG`), mapper rules, de-duplicated attribution
   tags, and the prefix-scoped opportunity dedupe — with a mock client and
   `fetch` stubbed to throw. No network, no credentials.
2. **Sandbox sub-account:** point `GHL_LOCATION_ID` / pipeline / stage at a
   throwaway location with **no staff assigned and no active workflows**. Use a
   token scoped to that location. Set `GHL_TEST_TAG` (default
   `test:do-not-contact`) and configure the native workflow to exclude any
   contact carrying that tag. Confirm: contact upsert idempotency (same email
   twice → one contact), attribution tags added, opportunity dedupe (second
   submission with a matching prefixed open opportunity → no second opportunity;
   an unrelated open opportunity → a website-quote opportunity is still created).
3. **Netlify Deploy Preview / branch context only:** set `GHL_SYNC_ENABLED=true`
   scoped to Deploy Previews or one branch; production stays `false`. Submit
   through the deployed form and confirm the function log shows the correct
   act/skip path.
4. **Production cutover:** in the real location, first set the native staff
   assignment / follow-up workflow to inactive and point Netlify Forms
   notifications at an internal inbox. Flip `GHL_SYNC_ENABLED=true` for
   production. Submit one internal test lead. Verify contact + tags +
   opportunity. Then activate the workflow.

Never wire customer-facing autoresponders or SMS in a test location. Use email
addresses you control.

## Logs and manual replay

The function emits single-line JSON logs (Netlify → Functions → `form-submitted`)
with fields such as `event`, `step`, `outcome`, `reason`, `isNew`, `count`,
`status`, `traceId`. No tokens, PII, or payload contents are logged. `traceId`
values correlate to GoHighLevel API traces for support.

To replay a missed lead: open the submission in Netlify Forms, then create /
update the contact and opportunity in GoHighLevel by hand, or re-run the sync
logic locally against the exported field values with `GHL_SYNC_ENABLED=true` and
a scoped token.

## What v1 does not do

* No file content or file URLs to GoHighLevel.
* No `message` text on the opportunity (no documented field).
* No first/last-name split, country prefix, monetary value, consent capture, or
  message classification.
* No update of an existing open opportunity on a repeat submission.
* No opportunity upsert / idempotency-key call.
