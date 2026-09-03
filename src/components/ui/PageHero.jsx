import Container from './Container'
import Eyebrow from './Eyebrow'
import { cn } from '../../lib/cn'

/**
 * Asymmetric, left-aligned inner-page hero on the blueprint grid.
 * `spec` is a short mono strapline (e.g. "FABRICATION / WELDING / INSTALLATION");
 * `subtitle` is a normal sentence.
 */
function PageHero({ index, eyebrow, title, spec, subtitle, children, className }) {
  return (
    <section className={cn('blueprint-grid text-paper', className)}>
      <Container className="py-16 sm:py-20 md:py-28">
        <div className="max-w-3xl">
          {eyebrow != null && (
            <Eyebrow index={index} tone="onDark">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-tightest sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <span aria-hidden="true" className="mt-6 block h-0.5 w-20 bg-weld" />
          {spec != null && (
            <p className="mt-6 font-mono text-xs uppercase tracking-label text-weld sm:text-sm">
              {spec}
            </p>
          )}
          {subtitle != null && (
            <p className="mt-5 max-w-prose text-base text-steel-200 sm:text-lg">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  )
}

export default PageHero
