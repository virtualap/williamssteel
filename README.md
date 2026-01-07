# Williams Steel Works LLC Website

A modern, professional website for Williams Steel Works LLC - specializing in steel construction services, fabrication, welding, and installation.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Professional Branding**: Red and black color scheme matching company identity
- **Service Showcase**: Detailed pages highlighting metal fabrication, welding, and installation services
- **Project Gallery**: Portfolio section for showcasing completed projects (placeholder images included)
- **Contact & Quote System**: Full-featured contact form with file upload capability for project drawings and blueprints
- **SEO Optimized**: Meta tags and semantic HTML for search engine visibility
- **Netlify Ready**: Pre-configured for easy deployment to Netlify

## Pages

1. **Home** - Company overview, services overview, and call-to-action
2. **Services** - Detailed service descriptions for metal fabrication, welding, and installation
3. **Gallery** - Project portfolio with category filtering (Industrial, Commercial, Residential, Government)
4. **Contact** - Quote request form with file upload, contact information, and business hours

## Technology Stack

- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form validation and handling
- **Netlify Forms** - Form submission with file upload support

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Deployment to Netlify

### Option 1: Deploy from Git (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://www.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### Option 2: Manual Deploy

1. Build the project: `npm run build`
2. Log in to [Netlify](https://www.netlify.com)
3. Drag and drop the `dist` folder to Netlify

### Configure Netlify Forms

The contact form is configured to work with Netlify Forms. After deployment:

1. Go to your site's Netlify dashboard
2. Navigate to "Forms" in the sidebar
3. You'll see the "contact-quote" form listed
4. Configure notifications to receive emails when forms are submitted

### Custom Domain Setup

To use your domain `williamssteelworks.com`:

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter `williamssteelworks.com`
4. Follow the instructions to update your DNS settings at your domain registrar
5. Add both `williamssteelworks.com` and `www.williamssteelworks.com`

## Customization Needed

Before going live, you should:

1. **Replace Gallery Images**: The gallery uses placeholder images. Replace them with actual project photos in [src/pages/Gallery.jsx](src/pages/Gallery.jsx)

2. **Update Contact Information**: Update phone number and email in:
   - [src/components/Footer.jsx](src/components/Footer.jsx)
   - [src/pages/Contact.jsx](src/pages/Contact.jsx)

3. **Add Logo**: If you have a logo file:
   - Add it to the `public` folder
   - Update the header in [src/components/Header.jsx](src/components/Header.jsx)

4. **Add Favicon**: Replace `public/vite.svg` with your company favicon

5. **Configure SEO**: Update meta descriptions in [index.html](index.html) for better search engine optimization

6. **Form Notifications**: Set up email notifications in Netlify to receive form submissions

## File Structure

```
williams-steel-works/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── Gallery.jsx
│   │   └── Contact.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
├── netlify.toml        # Netlify configuration
└── package.json        # Dependencies
```

## Color Scheme

- **Primary Red**: `#DC2626` (Red-600)
- **Primary Red Dark**: `#991B1B` (Red-800)
- **Secondary Dark**: `#1F2937` (Gray-800)
- **Secondary Darker**: `#111827` (Gray-900)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Williams Steel Works LLC. All rights reserved.

## Support

For website issues or questions, contact your web developer or Text Media LLC.
