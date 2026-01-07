import { useState } from 'react'

function Gallery() {
  // Placeholder images - the client will provide actual project photos
  const galleryImages = [
    {
      id: 1,
      title: 'Industrial Steel Fabrication',
      category: 'Industrial',
      description: 'Custom steel fabrication for industrial facility',
      image: 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Industrial+Project+1',
    },
    {
      id: 2,
      title: 'Commercial Building Framework',
      category: 'Commercial',
      description: 'Structural steel installation for commercial building',
      image: 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Commercial+Project+1',
    },
    {
      id: 3,
      title: 'Welding Services',
      category: 'Industrial',
      description: 'Professional welding on industrial project',
      image: 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Welding+Project+1',
    },
    {
      id: 4,
      title: 'Residential Steel Work',
      category: 'Residential',
      description: 'Custom steel components for residential project',
      image: 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Residential+Project+1',
    },
    {
      id: 5,
      title: 'Government Facility',
      category: 'Government',
      description: 'Steel construction for government building',
      image: 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Government+Project+1',
    },
    {
      id: 6,
      title: 'Metal Fabrication',
      category: 'Commercial',
      description: 'Custom metal fabrication work',
      image: 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Fabrication+Project+1',
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

      {/* Note Section */}
      <section className="bg-gray-50 py-16">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-4">Your Project Could Be Next</h2>
          <p className="text-lg text-gray-700 mb-8">
            These images are placeholders. We'll showcase your actual completed projects once you provide
            high-quality photos of your best work. Quality project photography helps demonstrate your
            capabilities to potential clients.
          </p>
          <p className="text-gray-600 italic">
            Note: Replace placeholder images with actual project photos for the final website.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Gallery
