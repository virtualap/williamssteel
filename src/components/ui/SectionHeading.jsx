import Eyebrow from './Eyebrow'
import { cn } from '../../lib/cn'

/**
 * Numbered eyebrow + condensed title + weld keyline + optional intro.
 * Colour-agnostic: pass tone="dark" on blueprint/ink backgrounds.
 */
function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'light',
  as: Heading = 'h2',
  id,
  className,
}) {
  const dark = tone === 'dark'
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex max-w-prose flex-col gap-4',
        centered && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow != null && (
        <Eyebrow index={index} tone={dark ? 'onDark' : 'weld'}>
          {eyebrow}
        </Eyebrow>
      )}
      <Heading
        id={id}
        className={cn(
          'font-display text-3xl font-extrabold leading-[1.06] tracking-tightest sm:text-4xl md:text-[2.75rem]',
          dark ? 'text-paper' : 'text-ink',
        )}
      >
        {title}
      </Heading>
      <span
        aria-hidden="true"
        className={cn('h-0.5 w-16 bg-weld', centered && 'self-center')}
      />
      {intro != null && (
        <p
          className={cn(
            'text-base leading-relaxed sm:text-lg',
            dark ? 'text-steel-200' : 'text-ink-soft',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
