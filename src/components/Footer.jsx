import { Link } from 'react-router-dom'
import Container from './ui/Container'
import Logo from './ui/Logo'
import Icon from './ui/Icon'

const YEAR = new Date().getFullYear()

const SITEMAP = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
]

function ColTitle({ children }) {
  return (
    <h2 className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-steel-300">
      {children}
    </h2>
  )
}

function Footer() {
  return (
    <footer className="border-t-2 border-weld bg-ink text-paper">
      <Container className="py-14 md:py-16">
        {/* Title-block grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="paper" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-200">
              Steel construction from initial fabrication through final installation — for
              industrial, commercial, residential, and government projects.
            </p>
          </div>

          <div className="md:col-span-3">
            <ColTitle>Sitemap</ColTitle>
            <ul className="mt-4 space-y-2">
              {SITEMAP.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-steel-200 transition-colors duration-200 hover:text-weld"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <ColTitle>Contact</ColTitle>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+16788494592"
                  className="inline-flex items-center gap-2 text-steel-200 transition-colors duration-200 hover:text-weld"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  (678) 849-4592
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@williamssteelworks.net"
                  className="inline-flex items-center gap-2 text-steel-200 transition-colors duration-200 hover:text-weld"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  info@williamssteelworks.net
                </a>
              </li>
              <li className="pt-1 font-mono text-xs uppercase tracking-label text-steel-300">
                Mon&ndash;Fri&nbsp;&nbsp;08:00&ndash;17:00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-steel-700 pt-6 font-mono text-[0.7rem] uppercase tracking-label text-steel-300 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {YEAR} Williams Steel Works LLC &mdash; All rights reserved</span>
          <span>Fabrication / Welding / Installation</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
