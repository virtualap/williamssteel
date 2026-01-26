import { useState } from 'react'
import { Link } from 'react-router-dom'

function Gallery() {
  // Project gallery images - professional stock photos
  const galleryImages = [
    {
      id: 1,
      title: 'Industrial Steel Fabrication',
      category: 'Industrial',
      description: 'Custom steel fabrication and beam assembly for industrial manufacturing facility',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      title: 'Commercial Building Framework',
      category: 'Commercial',
      description: 'Structural steel framework installation for multi-story commercial building',
      image: 'https://images.unsplash.com/photo-1590644365607-1c5a8235a5a0?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      title: 'Precision Welding',
      category: 'Industrial',
      description: 'Professional MIG welding services for heavy-duty industrial applications',
      image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      title: 'Structural Steel Installation',
      category: 'Commercial',
      description: 'Large-scale structural steel erection for commercial development project',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      title: 'Residential Steel Framing',
      category: 'Residential',
      description: 'Custom steel framing and support structures for modern residential construction',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      title: 'Government Infrastructure',
      category: 'Government',
      description: 'Steel construction and fabrication for public infrastructure project',
      image: 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=800&h=600&fit=crop',
    },
    {
      id: 7,
      title: 'Metal Fabrication Workshop',
      category: 'Industrial',
      description: 'Precision metal cutting and fabrication in our professional workshop',
      image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&h=600&fit=crop',
    },
    {
      id: 8,
      title: 'Steel Beam Assembly',
      category: 'Commercial',
      description: 'Heavy steel beam installation for warehouse and distribution center',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop',
    },
    {
      id: 9,
      title: 'TIG Welding Services',
      category: 'Industrial',
      description: 'High-precision TIG welding for specialized industrial components',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    },
  ]

  const categories = ['All', 'Industrial', 'Commercial', 'Residential', 'Government']
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Gallery</h1>
          <p className="text-xl text-gray-300">
            Browse our portfolio of completed steel construction projects
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-container">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="card cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
              <span className="inline-block px-3 py-1 bg-primary text-white text-sm rounded-full mb-2">
                {image.category}
              </span>
              <h3 className="text-xl font-bold text-secondary mb-2">{image.title}</h3>
              <p className="text-gray-600">{image.description}</p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No projects found in this category.</p>
          </div>
        )}
      </section>

      {/* Modal for Image Detail */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-primary text-white text-sm rounded-full mb-3">
                {selectedImage.category}
              </span>
              <h3 className="text-2xl font-bold text-secondary mb-3">{selectedImage.title}</h3>
              <p className="text-gray-600">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Project Could Be Next</h2>
          <p className="text-xl mb-8">
            Ready to start your steel construction project? Contact us today for a free consultation and quote.
          </p>
          <Link to="/contact" className="btn-secondary inline-block">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Gallery
