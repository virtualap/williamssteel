import { cn } from '../../lib/cn'

const SIZES = {
  sm: 'text-base sm:text-lg',
  md: 'text-lg sm:text-2xl',
}

/**
 * The wordmark lockup — one definition, used by Header and Footer.
 * The weld square is decorative; the company name is real text.
 */
function Logo({ tone = 'ink', size = 'md', className }) {
  const color = tone === 'paper' ? 'text-paper' : 'text-ink'
  return (
    <span
      className={cn('inline-flex items-center gap-2 font-display leading-none', className)}
    >
      <span className={cn('font-black tracking-tightest', SIZES[size] || SIZES.md, color)}>
        WILLIAMS
      </span>
      <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 bg-weld" />
      <span className={cn('font-black tracking-tightest', SIZES[size] || SIZES.md, color)}>
        STEEL WORKS
      </span>
    </span>
  )
}

export default Logo
