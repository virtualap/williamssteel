import { cn } from '../../lib/cn'

/**
 * Feature / capability list. The marker is a small bracketed square with a weld
 * core — a drafting checkbox, deliberately not a check-circle.
 */
function SpecList({ items = [], columns = 1, tone = 'light', className }) {
  const text = tone === 'dark' ? 'text-steel-200' : 'text-ink-soft'
  return (
    <ul
      className={cn(
        'grid gap-x-8 gap-y-3',
        columns === 2 && 'sm:grid-cols-2',
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center border-2 border-weld"
          >
            <span className="h-1.5 w-1.5 bg-weld" />
          </span>
          <span className={cn('leading-snug', text)}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default SpecList
