# Launch Checklist - Williams Steel Works Website

Use this checklist to ensure everything is ready before going live.

## Pre-Deployment Customization

### Content Updates
- [ ] Replace phone number `(123) 456-7890` with actual number
  - Files: `src/components/Footer.jsx`, `src/pages/Contact.jsx`
- [ ] Replace email `info@williamssteelworks.com` with actual email
  - Files: `src/components/Footer.jsx`, `src/pages/Contact.jsx`
- [ ] Add actual project photos to gallery
  - File: `src/pages/Gallery.jsx`
- [ ] Review all page content for accuracy
- [ ] Verify business hours are correct
  - File: `src/pages/Contact.jsx`

### Visual Assets (Optional but Recommended)
- [ ] Add company logo
  - Add file to `public/` folder
  - Update `src/components/Header.jsx`
- [ ] Create and add favicon
  - Replace `public/vite.svg`
  - Update `index.html`
- [ ] Add high-quality project photos (at least 6-8 images)

### Build & Test Locally
- [ ] Run `npm install` to ensure dependencies are installed
- [ ] Run `npm run dev` to test development server
- [ ] Test all pages and navigation
- [ ] Test contact form (check console for errors)
- [ ] Test on mobile device or browser dev tools
- [ ] Run `npm run build` to verify production build works
- [ ] Fix any build errors or warnings

## Deployment to Netlify

### Initial Setup
- [ ] Create Netlify account at https://www.netlify.com
- [ ] Push code to Git repository (GitHub/GitLab/Bitbucket)
- [ ] Connect repository to Netlify
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Deploy site
- [ ] Wait for build to complete
- [ ] Visit temporary Netlify URL to verify

### Domain Configuration
- [ ] Add custom domain `williamssteelworks.com` in Netlify
- [ ] Also add `www.williamssteelworks.com`
- [ ] Copy DNS configuration from Netlify
- [ ] Update DNS at domain registrar:
  - Add A record or CNAME as instructed
  - Wait for DNS propagation (up to 24 hours)
- [ ] Verify domain is connected
- [ ] Enable "Force HTTPS" in Netlify
- [ ] Wait for SSL certificate (automatic, a few minutes)
- [ ] Test https://williamssteelworks.com
- [ ] Test https://www.williamssteelworks.com

### Form Configuration
- [ ] Go to Netlify Forms dashboard
- [ ] Verify "contact-quote" form is detected
- [ ] Set up email notification:
  - Add notification email address
  - Configure notification settings
- [ ] Test form submission from live site
- [ ] Verify email notification is received
- [ ] Check that file uploads work

## Testing on Live Site

### Functional Testing
- [ ] All pages load correctly
  - [ ] Home page
  - [ ] Services page
  - [ ] Gallery page
  - [ ] Contact page
- [ ] Navigation works
  - [ ] Desktop menu
  - [ ] Mobile menu
  - [ ] Footer links
- [ ] Contact form
  - [ ] Form validation works
  - [ ] Required fields show errors
  - [ ] File upload accepts files
  - [ ] Success message displays
  - [ ] Email notification arrives
- [ ] All links work
  - [ ] Internal navigation links
  - [ ] Phone number (tel:) link
  - [ ] Email (mailto:) link
- [ ] Images load properly
  - [ ] Gallery images
  - [ ] Icons render correctly
  - [ ] No broken images

### Responsive Testing
- [ ] Test on mobile phone (iOS)
- [ ] Test on mobile phone (Android)
- [ ] Test on tablet
- [ ] Test on desktop (large screen)
- [ ] Mobile menu works correctly
- [ ] Forms are usable on mobile
- [ ] Images scale properly
- [ ] Text is readable on all devices

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iPhone)
- [ ] Chrome Mobile (Android)

### Performance & SEO
- [ ] Run Lighthouse audit
  - [ ] Performance score > 90
  - [ ] Accessibility score > 90
  - [ ] SEO score > 90
- [ ] Test page load speed
- [ ] Check meta tags in page source
- [ ] Verify robots.txt is accessible
- [ ] Test social media preview (Facebook/LinkedIn)

## Analytics & Monitoring (Optional)

- [ ] Set up Google Analytics (if desired)
- [ ] Add Google Search Console
- [ ] Submit sitemap to Google
- [ ] Enable Netlify Analytics (optional, $9/month)

## Client Handoff

### Documentation
- [ ] Share README.md with client
- [ ] Share DEPLOYMENT.md for reference
- [ ] Share PROJECT_SUMMARY.md
- [ ] Document how to update content

### Access & Credentials
- [ ] Share Netlify account access (if applicable)
- [ ] Share Git repository access (if applicable)
- [ ] Document form notification email setup
- [ ] Provide list of files for future updates

### Training (if needed)
- [ ] Show client how to access Netlify dashboard
- [ ] Explain how to view form submissions
- [ ] Show how to download uploaded files
- [ ] Explain deployment process

## Post-Launch

### Immediate
- [ ] Monitor form submissions first day
- [ ] Check for any error reports
- [ ] Verify analytics are tracking (if set up)
- [ ] Test from different locations/networks

### First Week
- [ ] Monitor site uptime
- [ ] Check form submissions are working
- [ ] Review any client feedback
- [ ] Make any necessary adjustments

### First Month
- [ ] Review analytics data
- [ ] Check Netlify bandwidth usage
- [ ] Collect client feedback
- [ ] Plan any content updates

## Troubleshooting

If something doesn't work:

### Build Failures
1. Check Netlify build logs
2. Ensure all dependencies are in package.json
3. Try building locally: `npm run build`
4. Check for Node version compatibility

### Form Not Working
1. Verify hidden Netlify form exists in Contact.jsx
2. Check Netlify Forms dashboard
3. Ensure form has `netlify="true"` attribute
4. Test form in incognito/private mode

### Domain Issues
1. Verify DNS settings at registrar
2. Wait 24 hours for DNS propagation
3. Use DNS checker tool: https://dnschecker.org
4. Check Netlify domain settings

### Images Not Loading
1. Check file paths are correct
2. Ensure images are in public folder
3. Check browser console for 404 errors
4. Verify image files were deployed

## Success Criteria

Site is ready to launch when:
- ✅ All pages load without errors
- ✅ Contact form works and sends emails
- ✅ Domain is connected with HTTPS
- ✅ Mobile responsive on all devices
- ✅ Client contact information is correct
- ✅ All content reviewed and approved
- ✅ Forms tested and working
- ✅ Client has been trained (if needed)

## Launch Date

**Target**: December 30, 2025
**Actual**: _________________

## Notes

_Use this space for any issues encountered or important notes:_

---

**Congratulations on launching Williams Steel Works website!** 🚀

For support after launch, refer to the documentation or contact Text Media LLC.
