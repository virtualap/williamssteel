// Netlify event function. Netlify invokes formSubmitted() only AFTER it has
// verified a form submission (spam / failed-honeypot submissions never reach
// here). Server-only. Runs after the browser already received its response, so
// it can neither block nor alter the form's success/error UX. Netlify Forms
// remains the system of record.

import { loadConfig, createLogger } from './lib/config.js'
import { syncLead } from './lib/leadSync.js'

export default {
  async formSubmitted(event) {
    const config = loadConfig()
    const logger = createLogger(config.logLevel)

    try {
      const data = (event && event.data) || {}
      const result = await syncLead(data, { config, logger })
      logger.info({ event: 'form_submitted', form: data['form-name'] ?? null, ...result })
    } catch (err) {
      // Never throw out of the handler: a throw marks the event function failed
      // and can trigger retries. The submission is safe in Netlify Forms.
      logger.error({ event: 'form_submitted', outcome: 'error', name: err?.name ?? 'Error' })
    }

    // Return value is ignored by the platform (void).
  },
}
