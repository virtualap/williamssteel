import { useState } from 'react'
import { Card, CTASection, Icon, PageHero, Section } from '../components/ui'
import { cn } from '../lib/cn'

// Project gallery images - professional stock photos
const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Industrial Steel Fabrication',
    category: 'Industrial',
    description:
      'Custom steel fabrication and beam assembly for industrial manufacturing facility',
    image:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Commercial Building Framework',
    category: 'Commercial',
    description:
      'Structural steel framework installation for multi-story commercial building',
    image:
      'https://images.unsplash.com/photo-1590644365607-1c5a8235a5a0?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Precision Welding',
    category: 'Industrial',
    description:
      'Professional MIG welding services for heavy-duty industrial applications',
    image:
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Structural Steel Installation',
    category: 'Commercial',
    description:
      'Large-scale structural steel erection for commercial development project',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    title: 'Residential Steel Framing',
    category: 'Residential',
    description:
      'Custom steel framing and support structures for modern residential construction',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    title: 'Government Infrastructure',
    category: 'Government',
    description:
      'Steel construction and fabrication for public infrastructure project',
    image:
      'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=800&h=600&fit=crop',
  },
  {
    id: 7,
    title: 'Metal Fabrication Workshop',
    category: 'Industrial',
    description:
      'Precision metal cutting and fabrication in our professional workshop',
    image:
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&h=600&fit=crop',
  },
  {
    id: 8,
    title: 'Steel Beam Assembly',
    category: 'Commercial',
    description:
      'Heavy steel beam installation for warehouse and distribution center',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop',
  },
  {
    id: 9,
    title: 'TIG Welding Services',
    category: 'Industrial',
    description:
      'High-precision TIG welding for specialized industrial components',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  },
]

const CATEGORIES = ['All', 'Industrial', 'Commercial', 'Residential', 'Government']

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)

  const filteredImages =
    selectedCategory === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === selectedCategory)

  return (
    <div>
      <PageHero
        index="03"
        eyebrow="Selected work"
        title="Project gallery"
        subtitle="A portfolio of completed steel construction projects across every sector we serve."
      />

      <Section tone="paper">
        {/* Category filter */}
        <div
          className="flex flex-wrap gap-3"
          role="group"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={active}
                className={cn(
                  'border-2 px-5 py-2 font-mono text-xs uppercase tracking-label transition-colors duration-200',
                  active
                    ? 'border-ink bg-ink text-paper'
                    : 'border-steel-300 text-ink-soft hover:border-ink hover:text-ink',
                )}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Gallery grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              as="button"
              type="button"
              interactive
              padding="none"
              onClick={() => setSelectedImage(image)}
              className="group w-full text-left"
            >
              <div className="relative overflow-hidden border-b-2 border-ink">
                <img
                  src={image.image}
                  alt={image.title}
                  loading="lazy"
                  className="h-60 w-full object-cover grayscale-[35%] transition duration-300 ease-snap group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/40">
                  <span className="flex h-11 w-11 items-center justify-center border-2 border-paper text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Icon name="search" className="h-5 w-5" strokeWidth={2} />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block bg-weld px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-label text-paper">
                  {image.category}
                </span>
                <h3 className="mt-3 font-display text-lg font-extrabold tracking-tightest text-ink">
                  {image.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{image.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <p className="mt-12 text-center font-mono text-sm uppercase tracking-label text-steel-500">
            No projects found in this category.
          </p>
        )}
      </Section>

      {/* Detail modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border-2 border-ink bg-paper"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative border-b-2 border-ink">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center border-2 border-paper bg-ink/70 text-paper transition-colors hover:bg-ink"
                aria-label="Close"
              >
                <Icon name="close" className="h-5 w-5" strokeWidth={2} />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="inline-block bg-weld px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-label text-paper">
                {selectedImage.category}
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tightest text-ink">
                {selectedImage.title}
              </h3>
              <p className="mt-2 text-ink-soft">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <CTASection
        eyebrow="Your project"
        title="Your project could be next"
        body="Ready to start your steel construction project? Contact us for a free consultation and quote."
        actionLabel="Request a quote"
        actionTo="/contact"
      />
    </div>
  )
}

export default Gallery
