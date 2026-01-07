# Design Reference - Williams Steel Works Website

## Color Palette

### Primary Colors

**Red (Primary Brand Color)**
- Default: `#DC2626` (Red-600) - Main buttons, accents, icons
- Dark: `#991B1B` (Red-800) - Hover states, emphasis
- Light: `#EF4444` (Red-500) - Lighter accents

**Dark/Black (Secondary Color)**
- Default: `#1F2937` (Gray-800) - Header, footer, dark backgrounds
- Darker: `#111827` (Gray-900) - Footer, deep sections
- Lighter: `#374151` (Gray-700) - Hover states

### Supporting Colors

**Backgrounds**
- White: `#FFFFFF` - Main content areas
- Light Gray: `#F9FAFB` (Gray-50) - Alternate sections
- Medium Gray: `#E5E7EB` (Gray-200) - Borders, dividers

**Text Colors**
- Primary Text: `#1F2937` (Gray-800) - Headings, important text
- Secondary Text: `#4B5563` (Gray-600) - Body text
- Tertiary Text: `#6B7280` (Gray-500) - Captions, metadata
- Light Text: `#9CA3AF` (Gray-400) - Disabled, placeholders

## Typography

### Font Family
- **System Font Stack**:
  - `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
  - Professional, fast loading, native appearance

### Font Sizes
- **Hero Title**: 3.75rem (60px) on desktop, 2.25rem (36px) on mobile
- **Page Title (H1)**: 3rem (48px) on desktop, 2.25rem (36px) on mobile
- **Section Title (H2)**: 2.25rem (36px) on desktop, 1.875rem (30px) on mobile
- **Subsection (H3)**: 1.5rem (24px)
- **Card Title**: 1.25rem (20px)
- **Body Text**: 1rem (16px)
- **Small Text**: 0.875rem (14px)

### Font Weights
- **Bold**: 700 - Headlines, important text
- **Semibold**: 600 - Subheadings, buttons
- **Medium**: 500 - Navigation
- **Regular**: 400 - Body text

## Layout Components

### Container Widths
- **Max Width**: 1280px (max-w-7xl)
- **Padding**:
  - Mobile: 1rem (16px)
  - Tablet: 1.5rem (24px)
  - Desktop: 2rem (32px)

### Spacing System
- **Section Padding**: 4rem (64px) vertical
- **Card Padding**: 1.5rem (24px)
- **Element Gaps**: 0.5rem, 1rem, 1.5rem, 2rem

### Border Radius
- **Buttons**: 0.5rem (8px)
- **Cards**: 0.5rem (8px)
- **Images**: 0.5rem (8px)
- **Pills/Tags**: 9999px (fully rounded)

## Components

### Buttons

**Primary Button** (`.btn-primary`)
- Background: Red `#DC2626`
- Hover: Dark Red `#991B1B`
- Text: White
- Padding: 0.75rem 1.5rem (12px 24px)
- Border Radius: 0.5rem (8px)
- Font Weight: 600 (Semibold)

**Secondary Button** (`.btn-secondary`)
- Background: Dark `#1F2937`
- Hover: Lighter Dark `#374151`
- Text: White
- Same sizing as primary

### Cards

**Standard Card** (`.card`)
- Background: White
- Shadow: 0 10px 15px rgba(0,0,0,0.1)
- Hover Shadow: 0 20px 25px rgba(0,0,0,0.15)
- Border Radius: 0.5rem (8px)
- Padding: 1.5rem (24px)
- Transition: shadow 300ms

### Navigation

**Header**
- Background: Dark `#1F2937`
- Height: 5rem (80px)
- Position: Sticky top
- Shadow: 0 2px 4px rgba(0,0,0,0.1)

**Navigation Links**
- Default: White
- Hover: Red `#DC2626`
- Active: Red `#DC2626`
- Transition: color 300ms

**Mobile Menu**
- Hamburger icon: 1.5rem (24px)
- Dropdown background: Dark `#1F2937`
- Appears below 768px width

### Footer

- Background: Dark `#1F2937`
- Text: White / Gray-300
- Links Hover: Red `#DC2626`
- Three-column grid on desktop
- Stacked on mobile

## Page Sections

### Hero Section
- Background: Gradient from `#1F2937` to `#111827`
- Text: White
- Padding: 5rem vertical (80px)
- Center aligned

### Content Sections
- Alternating white and gray-50 backgrounds
- Padding: 4rem vertical (64px)
- Max width: 1280px centered

### Form Sections
- White background card
- Input borders: Gray-300
- Focus state: Red-600 ring
- Error state: Red-500 border

## Icons

### Icon Style
- SVG icons from Heroicons (outline style)
- Size: 1.5rem (24px) for UI elements
- Size: 4rem (64px) for feature icons
- Color: Red `#DC2626` for primary icons
- Color: Gray-600 for secondary icons

### Common Icons Used
- Phone: Contact information
- Email: Contact information
- Lightning: Welding services
- Building: Installation services
- Cog/Tool: Fabrication services
- Check Circle: Feature lists, completed items
- Search: Gallery zoom
- Close: Modal dismiss

## Responsive Breakpoints

### Tailwind Breakpoints
- **sm**: 640px - Small tablets
- **md**: 768px - Tablets
- **lg**: 1024px - Laptops
- **xl**: 1280px - Desktops
- **2xl**: 1536px - Large desktops

### Layout Changes
- **Mobile** (< 768px):
  - Single column layouts
  - Hamburger menu
  - Stacked cards
  - Full-width buttons

- **Tablet** (768px - 1024px):
  - Two-column grids
  - Visible navigation
  - Side-by-side content

- **Desktop** (> 1024px):
  - Three-column grids
  - Full navigation bar
  - Optimized spacing

## Animations & Transitions

### Hover Effects
- Buttons: Background color change (300ms)
- Links: Color change (300ms)
- Cards: Shadow expansion (300ms)
- Images: Scale 1.1 (300ms)

### Page Transitions
- Smooth scrolling enabled
- No page load transitions (SPA)

### Form Interactions
- Focus: Ring animation (instant)
- Submit: Button disabled state
- Success/Error: Fade in (200ms)

## Imagery

### Image Specifications
- **Gallery Images**: Minimum 1200px wide, 800px tall
- **Format**: JPG for photos, PNG for graphics
- **Optimization**: Compress before upload
- **Aspect Ratio**: 3:2 preferred for gallery

### Placeholder Images
- Current: via.placeholder.com with red background
- Replace with actual project photos
- Categories: Industrial, Commercial, Residential, Government

## Accessibility

### ARIA Labels
- Navigation toggle: "Toggle menu"
- Close buttons: "Close"
- Form fields: Proper labels

### Contrast Ratios
- All text meets WCAG AA standards
- Red on white: 4.5:1+ ✅
- White on dark: 15:1+ ✅

### Keyboard Navigation
- All interactive elements focusable
- Visible focus states (red ring)
- Skip links available

## Browser Compatibility

### Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features Used
- CSS Grid
- Flexbox
- CSS Custom Properties (via Tailwind)
- ES6+ JavaScript (transpiled by Vite)

## Performance Targets

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

### Optimization
- Code splitting by route
- Lazy loading images
- Minified CSS/JS
- Compressed assets (gzip)

## Design Principles

1. **Professional**: Clean, modern, business-focused design
2. **Bold**: Strong use of red accent color
3. **Clear**: Easy navigation and information hierarchy
4. **Responsive**: Mobile-first approach
5. **Fast**: Optimized for quick loading
6. **Accessible**: WCAG compliant

## Usage Examples

### CSS Classes

```jsx
// Primary button
<button className="btn-primary">Request Quote</button>

// Secondary button
<button className="btn-secondary">Learn More</button>

// Card
<div className="card">
  <h3>Title</h3>
  <p>Content</p>
</div>

// Section container
<section className="section-container">
  <h2 className="section-title">Section Title</h2>
  <p>Content...</p>
</section>
```

### Color Usage

```jsx
// Text colors
<h1 className="text-secondary">Heading</h1>
<p className="text-gray-700">Body text</p>
<span className="text-primary">Accent text</span>

// Background colors
<div className="bg-primary">Red background</div>
<div className="bg-secondary">Dark background</div>
<div className="bg-gray-50">Light background</div>
```

## Brand Guidelines

### Voice & Tone
- **Professional**: Industry expertise
- **Confident**: Capable and reliable
- **Direct**: Clear communication
- **Helpful**: Customer-focused

### Messaging
- Emphasize comprehensive solutions
- Highlight experience with all project types
- Focus on quality and safety
- Target professional contractors

---

**For questions about design implementation, see the actual component files in `/src`**
