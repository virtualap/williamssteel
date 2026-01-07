import { Link } from 'react-router-dom'

function Services() {
  const services = [
    {
      title: 'Metal Fabrication',
      description: 'Custom metal fabrication services for all types of steel construction projects.',
      features: [
        'Structural steel fabrication',
        'Custom metal components',
        'Precision cutting and forming',
        'Quality material selection',
        'CAD/CAM design support',
        'Detailed project planning',
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: 'Welding Services',
      description: 'Professional welding services using certified welders and industry-standard techniques.',
      features: [
        'MIG, TIG, and Stick welding',
        'Certified welders',
        'Structural welding',
        'Pipe welding',
        'On-site welding services',
        'Quality inspection and testing',
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Installation',
      description: 'Expert installation services ensuring structural integrity and compliance with safety standards.',
      features: [
        'Professional installation teams',
        'Safety compliance',
        'Structural steel erection',
        'Equipment and crane services',
        'Project coordination',
        'Post-installation inspection',
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ]

  const projectTypes = [
    {
      type: 'Industrial',
      description: 'Heavy-duty steel construction for manufacturing facilities, warehouses, and industrial complexes.',
    },
    {
      type: 'Commercial',
      description: 'Steel frameworks and components for office buildings, retail spaces, and commercial developments.',
    },
    {
      type: 'Residential',
      description: 'Custom steel work for residential projects including structural support and decorative elements.',
    },
    {
      type: 'Government',
      description: 'Compliant steel construction services for government facilities and infrastructure projects.',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300">
            Comprehensive steel construction solutions for all your project needs
          </p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section-container">
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
            >
              <div className="lg:w-1/3">
                <div className="card text-center">
                  <div className="text-primary mx-auto mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-secondary">{service.title}</h3>
                </div>
              </div>
              <div className="lg:w-2/3">
                <h3 className="text-3xl font-bold text-secondary mb-4">{service.title}</h3>
                <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        className="w-6 h-6 text-primary flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Types Section */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <h2 className="section-title text-center mb-12">Project Types We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectTypes.map((project, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold text-secondary mb-3">{project.type}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-12">Why Choose Williams Steel Works?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-primary flex-shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-secondary mb-2">Comprehensive Solutions</h4>
                <p className="text-gray-600">
                  We handle all aspects of steel construction from fabrication to installation.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary flex-shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-secondary mb-2">Quality Workmanship</h4>
                <p className="text-gray-600">
                  Certified professionals committed to excellence in every project.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary flex-shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-secondary mb-2">Safety First</h4>
                <p className="text-gray-600">
                  Strict adherence to safety standards and regulations on every job.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary flex-shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-secondary mb-2">Experienced Team</h4>
                <p className="text-gray-600">
                  Industry expertise serving contractors and construction professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-xl mb-8">
            Get a detailed quote for your steel construction needs
          </p>
          <Link to="/contact" className="btn-secondary">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Services
