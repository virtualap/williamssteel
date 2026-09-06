// Pure field mapper for the verified `contact-quote` submission.
// No I/O, no process.env, no network. Given the same inputs it always returns
// the same result.

const FORM_NAME = 'contact-quote'
const REQUIRED_FIELDS = ['name', 'email', 'phone', 'projectType', 'message']
const CONTACT_SOURCE = 'Williams Steel Works website'

// Collapse internal runs of whitespace and trim. Used for single-line values.
function oneLine(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

// Trim only; preserves author line breaks (message body).
function trimmed(value) {
  return String(value ?? '').trim()
}

/**
 * @param {Record<string,string>} data  Netlify formSubmitted `event.data`.
 * @param {{locationId?: string, opportunityNamePrefix?: string}} options
 *   Values sourced from config so this module stays pure.
 */
export function mapLead(data = {}, options = {}) {
  // Primary guard: Netlify's formSubmitted event payload documents only
  // `event.data` (field name -> string). No verified form identifier is
  // exposed, so the hidden `form-name` field is the identifier, kept as
  // defense in depth even though Netlify only fires this event for the
  // verified form.
  if (trimmed(data['form-name']) !== FORM_NAME) {
    return { ok: false, outcome: 'skipped', reason: 'form-name-mismatch' }
  }

  // Netlify withholds spam/failed-honeypot submissions from this event; a
  // non-empty honeypot here is still treated as a defensive no-op.
  if (trimmed(data['bot-field']) !== '') {
    return { ok: false, outcome: 'skipped', reason: 'honeypot' }
  }

  const fields = {
    name: oneLine(data.name),
    email: oneLine(data.email),
    phone: oneLine(data.phone),
    projectType: oneLine(data.projectType),
    message: trimmed(data.message),
  }
  const company = oneLine(data.company)

  const missingFields = REQUIRED_FIELDS.filter((field) => fields[field] === '')
  if (missingFields.length > 0) {
    return { ok: false, outcome: 'skipped', reason: 'missing-fields', missingFields }
  }

  // Native GoHighLevel contact fields only. No first/last split, no country
  // prefix, no derived values. `tags` is deliberately absent here: v3 contact
  // upsert overwrites all existing tags, so tags are added separately.
  const contact = {
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    source: CONTACT_SOURCE,
  }
  if (company) contact.companyName = company
  if (trimmed(options.locationId)) contact.locationId = trimmed(options.locationId)

  // The v3 Create Opportunity API documents no description / notes field, so
  // the project type is carried in the opportunity name and the free-text
  // message is not forwarded (Netlify Forms remains the full record).
  const prefix = trimmed(options.opportunityNamePrefix)
  const opportunityName = `${prefix ? `${prefix} ` : ''}${fields.projectType} — ${fields.name}`.trim()

  return {
    ok: true,
    outcome: 'mapped',
    contact,
    opportunity: {
      name: opportunityName,
      status: 'open',
    },
  }
}
