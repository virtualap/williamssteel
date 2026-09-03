import { cn } from '../../lib/cn'

// One stroke style for the whole site: 24px grid, round caps, currentColor.
const PATHS = {
  fabrication: ['M4 8V4h4', 'M20 8V4h-4', 'M4 16v4h4', 'M20 16v4h-4', 'M9 12h6', 'M12 9v6'],
  welding: [
    'M12 3v3.5',
    'M12 17.5V21',
    'M3 12h3.5',
    'M17.5 12H21',
    'M6 6l2.4 2.4',
    'M18 6l-2.4 2.4',
    'M6 18l2.4-2.4',
    'M18 18l-2.4-2.4',
    'M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  ],
  installation: ['M3 21h18', 'M6 21V8l6-4 6 4v13', 'M10 21v-5h4v5'],
  arrowRight: ['M5 12h14', 'M13 6l6 6-6 6'],
  check: ['M4 12l5 5L20 6'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7.5V12l3 2'],
  phone: [
    'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  ],
  mail: [
    'M3 8l7.89 5.26a2 2 0 002.22 0L21 8',
    'M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  ],
  document: [
    'M9 12h6',
    'M9 16h6',
    'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  ],
  search: ['M21 21l-6-6', 'M4 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0z'],
}

function Icon({ name, className, strokeWidth = 1.75, ...rest }) {
  const paths = PATHS[name] || []
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('h-6 w-6 shrink-0', className)}
      {...rest}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export default Icon
