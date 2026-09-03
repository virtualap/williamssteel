import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border-2 focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-label"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
