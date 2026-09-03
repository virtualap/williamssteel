import { cn } from '../../lib/cn'

const TONES = {
  weld: 'text-weld',
  muted: 'text-steel-500',
  onDark: 'text-paper/60',
}

/**
 * Mono uppercase kicker with an optional drafting-style index (01, 02, ...).
 */
function Eyebrow({ index, children, tone = 'weld', className, as: Tag = 'p' }) {
  return (
    <Tag
      className={cn(
        'font-mono text-[0.7rem] font-medium uppercase tracking-eyebrow',
        TONES[tone] || TONES.weld,
        className,
      )}
    >
      {index != null ? `${String(index).padStart(2, '0')} — ` : null}
      {children}
    </Tag>
  )
}

export default Eyebrow
