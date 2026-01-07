# Quick Start Guide

## Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173 in your browser
```

## Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Deploy to Netlify

### Fastest Way (Drag & Drop)
1. Run `npm run build`
2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder onto the page
4. Done! 🎉

### Best Way (Git Integration)
1. Push code to GitHub/GitLab
2. Connect repository in Netlify
3. Automatic deployments on every push

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Important Files to Customize

Before going live, update these files:

1. **Contact Info** - Update in:
   - `src/components/Footer.jsx`
   - `src/pages/Contact.jsx`

2. **Gallery Images** - Replace placeholders in:
   - `src/pages/Gallery.jsx`

3. **Logo** - Add logo to `public/` folder and update:
   - `src/components/Header.jsx`

4. **Favicon** - Replace `public/vite.svg`

5. **SEO Meta Tags** - Update in:
   - `index.html`

## Project Structure

```
src/
├── components/     # Reusable components (Header, Footer, Layout)
├── pages/         # Page components (Home, Services, Gallery, Contact)
├── App.jsx        # Main app with routing
├── main.jsx       # React entry point
└── index.css      # Tailwind + custom styles
```

## Color Scheme

- **Primary Red**: `#DC2626`
- **Dark Gray/Black**: `#1F2937`
- **Text**: Tailwind gray scale

## Key Features Built-In

✅ Responsive mobile design
✅ Red & black color scheme
✅ Contact form with file upload
✅ Quote request functionality
✅ Project gallery with filtering
✅ SEO optimization
✅ Netlify Forms integration
✅ Fast Vite build system

## Need Help?

- **Full Documentation**: See [README.md](README.md)
- **Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **React Docs**: [https://react.dev](https://react.dev)
- **Tailwind CSS**: [https://tailwindcss.com](https://tailwindcss.com)
- **Netlify Docs**: [https://docs.netlify.com](https://docs.netlify.com)

---

**Built for Williams Steel Works LLC**
Developed by Text Media LLC
