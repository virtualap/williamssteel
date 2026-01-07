import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">Williams</span> Steel Works
            </h3>
            <p className="text-gray-300">
              Specializing in all forms of steel construction services, fabrication, welding and installation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="tel:+1234567890" className="hover:text-primary transition-colors duration-300">
                  Phone: (123) 456-7890
                </a>
              </li>
              <li>
                <a href="mailto:info@williamssteelworks.com" className="hover:text-primary transition-colors duration-300">
                  Email: info@williamssteelworks.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Williams Steel Works LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
