import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Card,
  Field,
  FieldError,
  Icon,
  Input,
  Label,
  PageHero,
  Section,
  Select,
  Textarea,
  Button,
} from '../components/ui'

const CONTACT_DETAILS = [
  {
    icon: 'phone',
    label: 'Phone',
    value: '(678) 849-4592',
    href: 'tel:+16788494592',
    note: 'Monday – Friday, 8:00 AM – 5:00 PM',
  },
  {
    icon: 'mail',
    label: 'Email',
    value: 'info@williamssteelworks.net',
    href: 'mailto:info@williamssteelworks.net',
    note: "We'll respond within 24 hours",
  },
  {
    icon: 'document',
    label: 'Request a quote',
    value: 'Attach drawings & files',
    note: 'Fill out the form with your project details and attach any relevant files or drawings.',
  },
]

const HOURS = [
  ['Monday – Friday', '8:00 AM – 5:00 PM'],
  ['Saturday', 'By Appointment'],
  ['Sunday', 'Closed'],
]

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

  const fileClasses =
    'w-full border-2 border-ink bg-paper px-4 py-2.5 text-sm text-ink-soft file:mr-4 file:cursor-pointer file:border-0 file:bg-weld file:px-4 file:py-2 file:font-mono file:text-xs file:uppercase file:tracking-label file:text-paper hover:file:bg-weld-dark focus:outline-none focus:border-weld'

  return (
    <div>
      <PageHero
        index="04"
        eyebrow="Get in touch"
        title="Contact us"
        subtitle="Get in touch for a consultation or request a quote for your project."
      />

      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact information */}
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tightest text-ink sm:text-3xl">
              Get in touch
            </h2>
            <p className="mt-4 max-w-prose text-ink-soft sm:text-lg">
              Have a project in mind? Contact us today to discuss your steel construction
              needs. We're here to help bring your vision to life.
            </p>

            <div className="mt-8 space-y-6">
              {CONTACT_DETAILS.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink text-weld">
                    <Icon name={detail.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-mono text-[0.7rem] uppercase tracking-label text-steel-600">
                      {detail.label}
                    </h3>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="font-display text-lg font-bold tracking-tightest text-ink transition-colors hover:text-weld"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="font-display text-lg font-bold tracking-tightest text-ink">
                        {detail.value}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-steel-500">{detail.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business hours */}
            <Card accent className="mt-8">
              <h3 className="font-mono text-[0.7rem] uppercase tracking-label text-steel-600">
                Business hours
              </h3>
              <dl className="mt-4 space-y-2 text-sm">
                {HOURS.map(([day, time]) => (
                  <div
                    key={day}
                    className="flex justify-between border-b border-steel-200 pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-ink-soft">{day}</dt>
                    <dd className="font-mono text-ink">{time}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>

          {/* Contact form */}
          <Card accent clip padding="lg">
            <h2 className="font-display text-xl font-extrabold tracking-tightest text-ink sm:text-2xl">
              Request a quote
            </h2>

            {submitSuccess && (
              <div className="mt-6 border-2 border-success bg-success-surface p-4">
                <p className="font-mono text-xs uppercase tracking-label text-success">
                  Thank you for your message
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            {submitError && (
              <div className="mt-6 border-2 border-danger bg-danger-surface p-4">
                <p className="font-mono text-xs uppercase tracking-label text-danger">
                  Something went wrong
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  Please try again or contact us directly by phone or email.
                </p>
              </div>
            )}

            {/* Netlify form - hidden, for bot detection */}
            <form name="contact-quote" data-netlify="true" netlify-honeypot="bot-field" hidden>
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

            {/* Actual form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <input type="hidden" name="form-name" value="contact-quote" />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <Label htmlFor="name" required>
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    invalid={!!errors.name}
                    aria-invalid={!!errors.name}
                    {...register('name', { required: 'Name is required' })}
                  />
                  <FieldError>{errors.name?.message}</FieldError>
                </Field>

                <Field>
                  <Label htmlFor="email" required>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    invalid={!!errors.email}
                    aria-invalid={!!errors.email}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <Label htmlFor="phone" required>
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    invalid={!!errors.phone}
                    aria-invalid={!!errors.phone}
                    {...register('phone', { required: 'Phone is required' })}
                  />
                  <FieldError>{errors.phone?.message}</FieldError>
                </Field>

                <Field>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" type="text" {...register('company')} />
                </Field>
              </div>

              <Field>
                <Label htmlFor="projectType" required>
                  Project type
                </Label>
                <Select
                  id="projectType"
                  invalid={!!errors.projectType}
                  aria-invalid={!!errors.projectType}
                  {...register('projectType', {
                    required: 'Please select a project type',
                  })}
                >
                  <option value="">Select project type...</option>
                  <option value="industrial">Industrial</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </Select>
                <FieldError>{errors.projectType?.message}</FieldError>
              </Field>

              <Field>
                <Label htmlFor="message" required>
                  Project details
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  invalid={!!errors.message}
                  aria-invalid={!!errors.message}
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                  {...register('message', {
                    required: 'Please provide project details',
                  })}
                />
                <FieldError>{errors.message?.message}</FieldError>
              </Field>

              <Field>
                <Label htmlFor="files">Attach files (optional)</Label>
                <input
                  id="files"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.dwg,.jpg,.jpeg,.png"
                  className={fileClasses}
                  {...register('files')}
                />
                <p className="mt-1.5 text-xs text-steel-500">
                  Upload drawings, blueprints, or reference images (PDF, DOC, DWG, JPG, PNG)
                </p>
              </Field>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                withArrow={!isSubmitting}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending…' : 'Submit quote request'}
              </Button>
            </form>
          </Card>
        </div>
      </Section>
    </div>
  )
}

export default Contact
