import { Link } from 'react-router-dom'
import Container from './Container'
import Eyebrow from './Eyebrow'
import Button from './Button'

/**
 * Recurring end-of-page call to action. One consistent treatment site-wide:
 * ink band, weld eyebrow, condensed heading, light chip button.
 */
function CTASection({
  eyebrow = 'Next step',
  title,
  body,
  actionLabel = 'Request a quote',
  actionTo = '/contact',
}) {
  return (
    <section className="bg-ink text-paper">
      <Container className="py-16 md:py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="onDark">{eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tightest sm:text-4xl md:text-[2.75rem]">
              {title}
            </h2>
            {body != null && (
              <p className="mt-4 max-w-prose text-steel-200 sm:text-lg">{body}</p>
            )}
          </div>
          <Button
            as={Link}
            to={actionTo}
            variant="solidLight"
            size="lg"
            withArrow
            className="shrink-0 self-start md:self-auto"
          >
            {actionLabel}
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default CTASection
