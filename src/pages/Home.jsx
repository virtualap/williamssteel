import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CTASection,
  Icon,
  PageHero,
  Section,
  SectionHeading,
  Stat,
} from '../components/ui'

const OVERVIEW = [
  {
    icon: 'fabrication',
    title: 'Metal Fabrication',
    body: 'Custom metal fabrication tailored to your project specifications and requirements.',
  },
  {
    icon: 'welding',
    title: 'Welding Services',
    body: 'Professional welding using industry-standard techniques and quality materials.',
  },
  {
    icon: 'installation',
    title: 'Installation',
    body: 'Expert installation ensuring structural integrity and compliance with safety standards.',
  },
]

const SECTORS = ['Industrial', 'Commercial', 'Residential', 'Government']

function Home() {
  return (
    <div>
      <PageHero
        index="01"
        eyebrow="Williams Steel Works LLC"
        title={
          <>
            Steel construction,
            <br className="hidden sm:block" /> start to finish.
          </>
        }
        spec="Fabrication / Welding / Installation"
        subtitle="All aspects of steel construction for industrial, commercial, residential, and government projects — quality results from initial fabrication through final installation."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button as={Link} to="/contact" variant="primary" size="lg" withArrow>
            Request a quote
          </Button>
          <Button as={Link} to="/services" variant="onDark" size="lg">
            Our services
          </Button>
        </div>
      </PageHero>

      {/* Capability statement */}
      <Section tone="paper">
        <SectionHeading
          index="01"
          eyebrow="Capability"
          title="Professional steel construction services"
          intro="We provide all aspects of steel construction for industrial, commercial, residential, and government projects. Our comprehensive services deliver quality results from initial fabrication through final installation."
        />
      </Section>

      {/* Services overview */}
      <Section tone="dim">
        <SectionHeading index="02" eyebrow="Services" title="What we offer" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {OVERVIEW.map((item) => (
            <Card
              key={item.title}
              as={Link}
              to="/services"
              interactive
              accent
              className="flex flex-col"
            >
              <span className="mb-5 inline-flex h-14 w-14 items-center justify-center border-2 border-ink text-weld">
                <Icon name={item.icon} className="h-7 w-7" />
              </span>
              <h3 className="font-display text-xl font-extrabold tracking-tightest text-ink">
                {item.title}
              </h3>
              <p className="mt-2 flex-grow text-ink-soft">{item.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-weld">
                See services <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Spec band */}
      <Section tone="dark">
        <SectionHeading
          index="03"
          eyebrow="At a glance"
          title="Built to spec"
          tone="dark"
        />
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Stat tone="dark" value="3" unit="core" label="Fabrication / welding / install" />
          <Stat tone="dark" value="4" unit="sectors" label="Industrial to government" />
          <Stat tone="dark" value="24" unit="hr" label="Quote response target" />
          <Stat tone="dark" value="MIG / TIG / Stick" label="Weld processes" />
        </div>
      </Section>

      {/* Sectors */}
      <Section tone="paper">
        <SectionHeading
          index="04"
          eyebrow="Sectors"
          title="Trusted by industry professionals"
          intro="We work with general contractors, construction managers, and procurement officers to deliver steel construction solutions for projects of every size."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SECTORS.map((sector, i) => (
            <div
              key={sector}
              className="flex items-center gap-3 border-2 border-ink p-5"
            >
              <span className="font-mono text-xs text-weld">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-label text-ink">
                {sector}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Start a project"
        title="Ready to start your project?"
        body="Contact us today for a consultation and quote."
        actionLabel="Get in touch"
        actionTo="/contact"
      />
    </div>
  )
}

export default Home
