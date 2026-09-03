import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

// Shared control chrome: sharp 2px border, weld focus edge, danger on invalid.
const control = (invalid) =>
  cn(
    'w-full border-2 bg-paper px-4 py-3 font-sans text-base text-ink transition-colors duration-150',
    'placeholder:text-steel-400 focus:outline-none focus:border-weld',
    invalid ? 'border-danger' : 'border-ink',
  )

export function Field({ className, children }) {
  return <div className={cn('flex flex-col', className)}>{children}</div>
}

export function Label({ children, required, htmlFor, className }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'mb-2 block font-mono text-[0.7rem] font-medium uppercase tracking-label text-steel-600',
        className,
      )}
    >
      {children}
      {required && (
        <span className="ml-1 text-weld" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}

export const Input = forwardRef(function Input({ invalid, className, ...rest }, ref) {
  return <input ref={ref} className={cn(control(invalid), className)} {...rest} />
})

export const Textarea = forwardRef(function Textarea(
  { invalid, className, ...rest },
  ref,
) {
  return (
    <textarea ref={ref} className={cn(control(invalid), 'resize-y', className)} {...rest} />
  )
})

export const Select = forwardRef(function Select(
  { invalid, className, children, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(control(invalid), 'appearance-none pr-11', className)}
        {...rest}
      >
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink"
      >
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
          <path
            d="M1 1l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )
})

export function FieldError({ children }) {
  if (!children) return null
  return <p className="mt-1.5 font-mono text-xs text-danger">{children}</p>
}
