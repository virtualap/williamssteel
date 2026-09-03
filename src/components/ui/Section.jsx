import Container from './Container'
import { cn } from '../../lib/cn'

const TONES = {
  paper: 'bg-paper text-ink',
  dim: 'bg-paper-dim text-ink',
  dark: 'blueprint-grid text-paper',
  weld: 'bg-weld text-ink',
}

/**
 * Vertical rhythm + surface tone. Wraps children in a <Container> unless
 * `container={false}` (for full-bleed content that manages its own width).
 */
function Section({
  tone = 'paper',
  container = true,
  className,
  containerClassName,
  children,
  id,
  ...rest
}) {
  const body = container ? (
    <Container className={containerClassName}>{children}</Container>
  ) : (
    children
  )

  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', TONES[tone] || TONES.paper, className)}
      {...rest}
    >
      {body}
    </section>
  )
}

export default Section
