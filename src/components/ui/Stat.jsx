import { cn } from '../../lib/cn'

/**
 * Spec-sheet figure: big condensed value on a weld tick, mono caption.
 * Values should come from real facts, not invented metrics.
 */
function Stat({ value, unit, label, tone = 'light', className }) {
  const dark = tone === 'dark'
  return (
    <div className={cn('border-l-2 border-weld pl-4', className)}>
      <div
        className={cn(
          'font-display text-3xl font-extrabold leading-none tracking-tightest sm:text-4xl',
          dark ? 'text-paper' : 'text-ink',
        )}
      >
        {value}
        {unit != null && (
          <span
            className={cn(
              'ml-1.5 align-baseline text-base font-semibold',
              dark ? 'text-steel-200' : 'text-steel-500',
            )}
          >
            {unit}
          </span>
        )}
      </div>
      <div
        className={cn(
          'mt-2 font-mono text-[0.7rem] uppercase tracking-label',
          dark ? 'text-steel-200' : 'text-steel-500',
        )}
      >
        {label}
      </div>
    </div>
  )
}

export default Stat
