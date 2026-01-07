import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-20">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary">Williams</span> Steel Works LLC
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Specializing in all forms of steel construction services, fabrication, welding and installation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Request a Quote
            </Link>
            <Link to="/services" className="btn-secondary border-2 border-white">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Professional Steel Construction Services</h2>
          <p className="text-lg text-gray-700 mb-8">
            We provide all aspects of steel construction for industrial, commercial, residential, and government projects.
            Our comprehensive services ensure quality results from initial fabrication through final installation.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <h2 className="section-title text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Metal Fabrication */}
            <div className="card text-center">
              <div className="text-primary mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-secondary">Metal Fabrication</h3>
              <p className="text-gray-600">
                Custom metal fabrication services tailored to your project specifications and requirements.
              </p>
            </div>

            {/* Welding */}
            <div className="card text-center">
              <div className="text-primary mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-secondary">Welding Services</h3>
              <p className="text-gray-600">
                Professional welding services using industry-standard techniques and quality materials.
              </p>
            </div>

            {/* Installation */}
            <div className="card text-center">
              <div className="text-primary mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-secondary">Installation</h3>
              <p className="text-gray-600">
                Expert installation services ensuring structural integrity and compliance with all safety standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Trusted by Industry Professionals</h2>
          <p className="text-lg text-gray-700 mb-8">
            We work with general contractors, construction managers, and procurement officers to deliver
            exceptional steel construction solutions for projects of all sizes.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Industrial Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Commercial Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Residential Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Government Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8">
            Contact us today for a consultation and quote
          </p>
          <Link to="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
