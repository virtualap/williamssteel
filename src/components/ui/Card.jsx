import { cn } from '../../lib/cn'

const PADDING = {
  none: '',
  md: 'p-6 sm:p-7',
  lg: 'p-6 sm:p-8',
}

/**
 * Bordered plate. Static by default. `interactive` adds a hard offset-shadow
 * shift on hover/focus-within (used for links/buttons inside the card).
 * `accent` draws a weld keyline along the top edge; `clip` cuts the top-right corner.
 */
function Card({
  as: Comp = 'div',
  interactive = false,
  accent = false,
  clip = false,
  padding = 'md',
  className,
  children,
  ...rest
}) {
  return (
    <Comp
      className={cn(
        'relative border-2 border-ink bg-paper',
        PADDING[padding] ?? PADDING.md,
        clip && 'edge-clip',
        interactive &&
          'transition-all duration-200 ease-snap hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-hard',
        className,
      )}
      {...rest}
    >
      {accent && (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-weld" />
      )}
      {children}
    </Comp>
  )
}

export default Card
