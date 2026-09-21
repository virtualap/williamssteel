export default {
  async deploySucceeded(event) {
    console.info(JSON.stringify({
      event: 'event_subscription_probe',
      handler: 'deploySucceeded',
      hasDeploy: Boolean(event?.deploy),
      hasSite: Boolean(event?.site),
      deployContextType: typeof event?.deploy?.context,
      deployBranchType: typeof event?.deploy?.branch,
    }))
  },
}
