import {
  Card,
  CTASection,
  Icon,
  PageHero,
  Section,
  SectionHeading,
  SpecList,
} from '../components/ui'

const SERVICES = [
  {
    icon: 'fabrication',
    title: 'Metal Fabrication',
    description:
      'Custom metal fabrication services for all types of steel construction projects.',
    features: [
      'Structural steel fabrication',
      'Custom metal components',
      'Precision cutting and forming',
      'Quality material selection',
      'CAD/CAM design support',
      'Detailed project planning',
    ],
  },
  {
    icon: 'welding',
    title: 'Welding Services',
    description:
      'Professional welding services using certified welders and industry-standard techniques.',
    features: [
      'MIG, TIG, and Stick welding',
      'Certified welders',
      'Structural welding',
      'Pipe welding',
      'On-site welding services',
      'Quality inspection and testing',
    ],
  },
  {
    icon: 'installation',
    title: 'Installation',
    description:
      'Expert installation services ensuring structural integrity and compliance with safety standards.',
    features: [
      'Professional installation teams',
      'Safety compliance',
      'Structural steel erection',
      'Equipment and crane services',
      'Project coordination',
      'Post-installation inspection',
    ],
  },
]

const PROJECT_TYPES = [
  {
    type: 'Industrial',
    description:
      'Heavy-duty steel construction for manufacturing facilities, warehouses, and industrial complexes.',
  },
  {
    type: 'Commercial',
    description:
      'Steel frameworks and components for office buildings, retail spaces, and commercial developments.',
  },
  {
    type: 'Residential',
    description:
      'Custom steel work for residential projects including structural support and decorative elements.',
  },
  {
    type: 'Government',
    description:
      'Compliant steel construction services for government facilities and infrastructure projects.',
  },
]

const WHY = [
  {
    title: 'Comprehensive Solutions',
    body: 'We handle all aspects of steel construction from fabrication to installation.',
  },
  {
    title: 'Quality Workmanship',
    body: 'Certified professionals committed to excellence in every project.',
  },
  {
    title: 'Safety First',
    body: 'Strict adherence to safety standards and regulations on every job.',
  },
  {
    title: 'Experienced Team',
    body: 'Industry expertise serving contractors and construction professionals.',
  },
]

function Services() {
  return (
    <div>
      <PageHero
        index="02"
        eyebrow="Services"
        title="Our services"
        spec="Fabrication / Welding / Installation"
        subtitle="Comprehensive steel construction solutions for all your project needs."
      />

      {/* Service detail */}
      <Section tone="paper">
        <SectionHeading index="01" eyebrow="Scope" title="What we do" />
        <div className="mt-12 space-y-16">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col gap-8 lg:items-start ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className="lg:w-1/3">
                <Card accent clip className="text-center">
                  <span className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center border-2 border-ink text-weld">
                    <Icon name={service.icon} className="h-8 w-8" />
                  </span>
                  <h3 className="font-display text-xl font-extrabold tracking-tightest text-ink">
                    {service.title}
                  </h3>
                </Card>
              </div>
              <div className="lg:w-2/3">
                <h3 className="font-display text-2xl font-extrabold tracking-tightest text-ink sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-prose text-ink-soft sm:text-lg">
                  {service.description}
                </p>
                <SpecList items={service.features} columns={2} className="mt-6" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Project types */}
      <Section tone="dim">
        <SectionHeading
          index="02"
          eyebrow="Sectors"
          title="Project types we serve"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECT_TYPES.map((project, i) => (
            <Card key={project.type} accent>
              <span className="font-mono text-xs text-weld">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-lg font-extrabold tracking-tightest text-ink">
                {project.type}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{project.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section tone="paper">
        <SectionHeading
          index="03"
          eyebrow="Why us"
          title="Why choose Williams Steel Works?"
        />
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {WHY.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-weld text-weld"
              >
                <Icon name="check" className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <h4 className="font-display text-lg font-extrabold tracking-tightest text-ink">
                  {item.title}
                </h4>
                <p className="mt-1 text-ink-soft">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Next step"
        title="Ready to discuss your project?"
        body="Get a detailed quote for your steel construction needs."
        actionLabel="Request a quote"
        actionTo="/contact"
      />
    </div>
  )
}

export default Services
