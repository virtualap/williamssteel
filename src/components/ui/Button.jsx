import { cn } from '../../lib/cn'

const BASE =
  'group inline-flex items-center justify-center gap-2.5 border-2 font-mono text-xs font-medium uppercase tracking-label transition-colors duration-200 ease-snap disabled:pointer-events-none disabled:opacity-50'

const SIZES = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-7 py-3.5 text-[0.8rem] sm:px-8 sm:py-4',
}

const VARIANTS = {
  // Solid torch-orange — the one loud call to action
  primary: 'border-weld bg-weld text-paper hover:border-weld-dark hover:bg-weld-dark',
  // Ghost on light backgrounds — fills to ink on hover
  outline: 'border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
  // Ghost on dark backgrounds
  onDark: 'border-paper bg-transparent text-paper hover:bg-paper hover:text-ink',
  // Solid light chip on dark backgrounds — flips to weld on hover
  solidLight:
    'border-paper bg-paper text-ink hover:border-weld hover:bg-weld hover:text-paper',
}

/**
 * Renders a <button> by default; pass `as={Link}` (+ `to`) or `as="a"` (+ `href`).
 * Focus ring comes from the global :focus-visible rule.
 */
function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
  ...rest
}) {
  return (
    <Comp
      className={cn(BASE, SIZES[size] || SIZES.md, VARIANTS[variant] || VARIANTS.primary, className)}
      {...rest}
    >
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className="translate-x-0 transition-transform duration-200 ease-snap group-hover:translate-x-1"
        >
          &rarr;
        </span>
      )}
    </Comp>
  )
}

export default Button
