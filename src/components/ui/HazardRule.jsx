import { cn } from '../../lib/cn'

/** Thin caution-tape divider. Use sparingly — one per page at most. */
function HazardRule({ className }) {
  return <div aria-hidden="true" className={cn('h-2 w-full hazard-rule', className)} />
}

export default HazardRule
