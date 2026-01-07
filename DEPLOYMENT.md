# Deployment Guide - Williams Steel Works Website

## Quick Start Deployment to Netlify

### Step 1: Prepare Your Repository (Recommended)

1. Initialize Git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Williams Steel Works website"
```

2. Create a repository on GitHub/GitLab/Bitbucket and push:
```bash
git remote add origin <your-repository-url>
git push -u origin main
```

### Step 2: Deploy to Netlify

#### Option A: Deploy from Git (Recommended)

1. Go to [https://www.netlify.com](https://www.netlify.com) and sign up/log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repository
5. Select the Williams Steel Works repository
6. Configure build settings:
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click **"Deploy site"**
8. Wait for deployment to complete (usually 2-3 minutes)

#### Option B: Manual Deploy (Quick Test)

1. Build the project locally:
```bash
npm run build
```

2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder onto the Netlify Drop page
4. Your site will be live in seconds with a random Netlify URL

### Step 3: Configure Custom Domain

1. In your Netlify site dashboard, go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter `williamssteelworks.com`
4. Netlify will provide DNS configuration instructions
5. Go to your domain registrar and update DNS records:
   - Add an **A record** pointing to Netlify's IP (shown in dashboard)
   - Or add a **CNAME record** pointing to your Netlify subdomain
6. Also add `www.williamssteelworks.com` as a domain alias
7. Wait for DNS propagation (can take up to 24 hours, usually much faster)

### Step 4: Enable HTTPS (Free SSL)

1. Once your domain is connected, Netlify automatically provisions a free SSL certificate
2. In **"Domain settings"**, enable **"Force HTTPS"**
3. Your site will now be secure with https://

### Step 5: Configure Form Submissions

The contact form is already configured for Netlify Forms. After deployment:

1. In Netlify dashboard, go to **"Forms"** in the sidebar
2. You'll see the **"contact-quote"** form
3. Click on it to configure notifications:
   - Go to **"Form notifications"**
   - Click **"Add notification"** → **"Email notification"**
   - Enter the email where you want to receive form submissions
   - Save the notification

Now you'll receive an email every time someone submits the contact form!

### Step 6: Test Your Website

Visit your website and test:
- [ ] All pages load correctly (Home, Services, Gallery, Contact)
- [ ] Navigation works on desktop and mobile
- [ ] Contact form submission works
- [ ] File upload works (try attaching a file)
- [ ] You receive form submission emails
- [ ] Site works on mobile devices
- [ ] HTTPS is enabled (lock icon in browser)

## Post-Deployment Customization

### Update Contact Information

1. Edit [src/components/Footer.jsx](src/components/Footer.jsx)
2. Edit [src/pages/Contact.jsx](src/pages/Contact.jsx)
3. Replace placeholder phone number `(123) 456-7890` with real number
4. Replace placeholder email `info@williamssteelworks.com` with real email

### Add Real Project Photos

1. Open [src/pages/Gallery.jsx](src/pages/Gallery.jsx)
2. Replace the placeholder image URLs with actual project photos
3. You can either:
   - Upload images to the `public` folder and reference them: `/images/project1.jpg`
   - Or use a service like Cloudinary or Imgur for image hosting

Example:
```javascript
{
  id: 1,
  title: 'Industrial Steel Fabrication',
  category: 'Industrial',
  description: 'Custom steel fabrication for XYZ facility',
  image: '/images/project-industrial-1.jpg', // Your actual image
}
```

### Add Company Logo

1. Place your logo file in the `public` folder (e.g., `public/logo.png`)
2. Edit [src/components/Header.jsx](src/components/Header.jsx)
3. Replace the text logo with an image:

```jsx
<Link to="/" className="flex items-center space-x-2">
  <img src="/logo.png" alt="Williams Steel Works" className="h-12" />
</Link>
```

### Add Favicon

1. Create a favicon (16x16 and 32x32 PNG or ICO file)
2. Use a tool like [favicon.io](https://favicon.io) to generate
3. Replace `public/vite.svg` with your favicon
4. Update [index.html](index.html) to reference your favicon

## Environment Variables (Optional)

If you need to add API keys or other secrets:

1. In Netlify dashboard, go to **"Site settings"** → **"Environment variables"**
2. Add your variables (e.g., `VITE_API_KEY`)
3. Access them in code with `import.meta.env.VITE_API_KEY`
4. Never commit secrets to Git!

## Continuous Deployment

With Git-connected deployment:
- Every push to your `main` branch automatically deploys to production
- Create a `develop` branch for testing changes
- Use Netlify's **branch deploys** to preview changes before merging

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. Get your Google Analytics tracking ID
2. Add to [index.html](index.html) before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### View Netlify Analytics

1. In Netlify dashboard, go to **"Analytics"**
2. Enable Netlify Analytics ($9/month) for detailed insights
3. Or use the free tier with basic metrics

## Troubleshooting

### Form submissions not working
- Ensure the hidden form in [Contact.jsx](src/pages/Contact.jsx) exists (Netlify uses it for detection)
- Check Netlify Forms dashboard to see if form is detected
- Verify `netlify="true"` attribute is present

### 404 errors on page refresh
- Check that [netlify.toml](netlify.toml) exists with redirects configuration
- Ensure `[[redirects]]` is properly configured

### Build fails on Netlify
- Check build logs in Netlify dashboard
- Ensure `package.json` dependencies are correct
- Try building locally first: `npm run build`

### Images not loading
- Ensure images are in the `public` folder or properly referenced
- Check browser console for 404 errors
- Verify image paths are correct (case-sensitive)

## Support

For deployment issues:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Support](https://www.netlify.com/support/)
- [Netlify Community Forum](https://answers.netlify.com)

For website updates:
- Contact Text Media LLC or your web developer

## Costs

- **Netlify Hosting**: Free tier (100GB bandwidth/month, 300 build minutes/month)
- **Custom Domain**: Your existing domain cost
- **SSL Certificate**: Free (included with Netlify)
- **Form Submissions**: 100 free submissions/month, then $19/month for more

## Next Steps

1. Deploy the site
2. Connect your domain
3. Configure form notifications
4. Replace placeholder content (photos, contact info)
5. Test thoroughly
6. Share with the client!

Good luck with your deployment! 🚀
