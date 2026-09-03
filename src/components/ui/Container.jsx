import { cn } from '../../lib/cn'

/**
 * Horizontal layout primitive: max-width + responsive gutters only.
 * Vertical rhythm belongs to <Section>, so Header/Footer can reuse this
 * without inheriting section padding.
 */
function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Container
