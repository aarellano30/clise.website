# Clise v3 — Deployment Action Plan

## 1. Placeholder Content (Must Replace)

- [ ] **Logo** — Replace Tailwind placeholder logo in Header.astro and Footer.astro with actual Clise logo
- [ ] **Products dropdown** — Replace placeholder items (Analytics, Engagement, Security, Integrations, Automations) with real product links or simplify to a direct link
- [ ] **Homepage Bento Grid** — Replace entire section (Deploy faster, Mobile friendly, Performance, Security, Powerful APIs) with real content or remove
- [ ] **Homepage Pricing Section** — Replace Hobby/Enterprise tiers with real content or remove
- [ ] **Footer** — Replace all placeholder content:
  - "Your Company, Inc." → "Clise"
  - "Making the world a better place..." → real company tagline
  - 22+ links pointing to `#` → real links or remove
  - Social media links (Facebook, Instagram, X, YouTube) → real URLs or remove
  - Implement i18n (currently hardcoded English, not using translations)
- [ ] **How to Start image** — Replace external Unsplash image with a local image

## 2. Performance Optimization

### Fonts
- [ ] Install `@fontsource/inter` and remove external CDN link (`rsms.me`)
- [ ] Ensure `font-display: swap` is set to prevent FOUC

### Images
- [ ] Compress `outside2.jpg` (18 MB → target 1-2 MB)
- [ ] Compress all product images >500KB (metalcraft, trimflex, ecobadge)
- [ ] Add `loading="lazy"` to ProductPage featured images and AboutPage images
- [ ] Replace all external `<img>` tags with local `<Image />` components once placeholders are replaced

### Video
- [ ] Add `poster` attribute to homepage video for fast initial render
- [ ] Delete duplicate video from `src/assets/images/videos/` (keep only `public/videos/`)
- [ ] Consider adding WebM format for better compression

### JavaScript
- [ ] Move Preline JS from `node_modules` to `public/js/`, load with `defer`
- [ ] Remove unused `@astrojs/react` and `react` dependencies

### Build
- [ ] Install `sharp` for Astro image optimization
- [ ] Run `npm run build` and verify no errors

## 3. New Features

### Blog
- [ ] Define `blog` content collection in `content.config.ts`
- [ ] Create `src/content/blog/es/` and `src/content/blog/en/` folders
- [ ] Add blog collection to Keystatic config
- [ ] Create blog listing page (`/blog` + `/en/blog`)
- [ ] Create dynamic blog post page (`/blog/[slug]`)
- [ ] Add nav link + translation keys

### PDFs
- [ ] Add company catalog PDF to `public/docs/`
- [ ] Add instructions PDF to `public/docs/`
- [ ] Link catalog from footer/about page/homepage
- [ ] Add instructions download link to ProductPage.astro

## 4. SEO & Meta

- [ ] Add Open Graph meta tags (`og:title`, `og:description`, `og:image`)
- [ ] Add Twitter Card meta tags
- [ ] Add `<link rel="canonical">` tags (important for bilingual SEO)
- [ ] Add structured data / JSON-LD (Organization, LocalBusiness)
- [ ] Create social preview image for link sharing
- [ ] Install `@astrojs/sitemap` and configure
- [ ] Add `public/robots.txt`
- [ ] Verify/replace favicon with Clise brand favicon

## 5. Error Handling & Legal

- [ ] Create custom 404 page
- [ ] Add privacy policy page
- [ ] Add terms of use page
- [ ] Add cookie consent banner (if serving EU visitors)

## 6. Forms & Contact

- [ ] Add honeypot or reCAPTCHA to contact form for spam protection
- [ ] Configure Netlify form notifications (email destination)
- [ ] Test form submission end-to-end

## 7. Hosting & Deployment

- [ ] Create `netlify.toml` (build command, redirects, caching headers, security headers)
- [ ] Add security headers (CSP, X-Frame-Options, X-Content-Type-Options)
- [ ] Configure custom domain and SSL
- [ ] Configure Keystatic GitHub OAuth env vars for production CMS
- [ ] Set up Google Analytics or Plausible

## 8. Testing & QA

- [ ] Run `npm run build` — verify clean build
- [ ] Test all routes in both languages (es + en)
- [ ] Verify language switcher works on all pages (including `/como-comenzar` ↔ `/en/how-to-start`)
- [ ] Test contact form submission
- [ ] Test responsive design (especially navbar at 320px)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Run Lighthouse audit
- [ ] Check all product pages render correctly with images
- [ ] Verify Keystatic admin works in production
- [ ] Submit sitemap to Google Search Console
