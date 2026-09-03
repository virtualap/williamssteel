import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from './ui/Container'
import Logo from './ui/Logo'
import Icon from './ui/Icon'
import { cn } from '../lib/cn'

const NAV = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          aria-label="Williams Steel Works — home"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={cn(
                    'inline-block border-b-2 py-1 font-mono text-xs uppercase tracking-label transition-colors duration-200',
                    isActive(item.path)
                      ? 'border-weld text-weld'
                      : 'border-transparent text-ink hover:text-weld',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} strokeWidth={2} />
        </button>
      </Container>

      {open && (
        <nav className="border-t-2 border-ink bg-paper md:hidden" aria-label="Primary">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.path} className="border-b border-steel-200 last:border-0">
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 px-5 py-4 font-mono text-sm uppercase tracking-label',
                    isActive(item.path) ? 'text-weld' : 'text-ink',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-2 w-2',
                      isActive(item.path) ? 'bg-weld' : 'bg-steel-300',
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
