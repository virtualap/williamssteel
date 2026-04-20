import { useState } from 'react'
import { useForm } from 'react-hook-form'

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError(false)
    setSubmitSuccess(false)

    try {
      const formData = new FormData()

      // Add form fields
      Object.keys(data).forEach((key) => {
        if (key === 'files') {
          // Handle file uploads
          if (data.files && data.files.length > 0) {
            Array.from(data.files).forEach((file) => {
              formData.append('file', file)
            })
          }
        } else {
          formData.append(key, data[key])
        }
      })

      // Add Netlify form name
      formData.append('form-name', 'contact-quote')

      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSubmitSuccess(true)
        reset()
      } else {
        setSubmitError(true)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">
            Get in touch for a consultation or request a quote for your project
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-6">Get In Touch</h2>
            <p className="text-lg text-gray-700 mb-8">
              Have a project in mind? Contact us today to discuss your steel construction needs.
              We're here to help bring your vision to life.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-primary flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-secondary mb-1">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    (678) 849-4592
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Monday - Friday, 8:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-primary flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-secondary mb-1">Email</h3>
                  <a
                    href="mailto:info@williamssteelworks.net"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    info@williamssteelworks.net
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-primary flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-secondary mb-1">Request a Quote</h3>
                  <p className="text-gray-600">
                    Fill out the form with your project details and attach any relevant files or
                    drawings.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-secondary mb-3">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">By Appointment</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-secondary mb-6">Request a Quote</h2>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="font-semibold">Thank you for your message!</p>
                <p className="text-sm">We'll get back to you within 24 hours.</p>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-semibold">Oops! Something went wrong.</p>
                <p className="text-sm">Please try again or contact us directly by phone or email.</p>
              </div>
            )}

            {/* Netlify Form - Hidden for bot detection */}
            <form name="contact-quote" netlify="true" netlify-honeypot="bot-field" hidden>
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="tel" name="phone" />
              <input type="text" name="company" />
              <select name="projectType">
                <option value="">Select...</option>
              </select>
              <textarea name="message"></textarea>
              <input type="file" name="file" multiple />
            </form>

            {/* Actual Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Hidden field for Netlify */}
              <input type="hidden" name="form-name" value="contact-quote" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone is required' })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    {...register('company')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Type <span className="text-primary">*</span>
                </label>
                <select
                  {...register('projectType', { required: 'Please select a project type' })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.projectType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select project type...</option>
                  <option value="industrial">Industrial</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </select>
                {errors.projectType && (
                  <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Details <span className="text-primary">*</span>
                </label>
                <textarea
                  {...register('message', { required: 'Please provide project details' })}
                  rows="5"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Attach Files (Optional)
                </label>
                <input
                  type="file"
                  {...register('files')}
                  multiple
                  accept=".pdf,.doc,.docx,.dwg,.jpg,.jpeg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary-dark"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload drawings, blueprints, or reference images (PDF, DOC, DWG, JPG, PNG)
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
