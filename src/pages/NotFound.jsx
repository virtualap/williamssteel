import { Link } from 'react-router-dom'
import { Button, PageHero, Section } from '../components/ui'

function NotFound() {
  return (
    <div>
      <PageHero
        eyebrow="Error 404"
        title="Page not found"
        subtitle="The page you're looking for doesn't exist or may have been moved. Check the address, or head back to a known page."
      />

      <Section tone="paper">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button as={Link} to="/" variant="primary" size="lg" withArrow>
            Back to home
          </Button>
          <Button as={Link} to="/contact" variant="outline" size="lg">
            Contact us
          </Button>
        </div>
      </Section>
    </div>
  )
}

export default NotFound
