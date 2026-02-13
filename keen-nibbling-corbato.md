# Implementation Plan: Clise Website with Astro

## Project Overview

Building a marketing website for Clise, a company that makes premium emblems using high-end technologies. The site will feature:
- 5 main pages: home, about, products listing, individual product pages, contact
- 10-15 product technologies (Trimflex, Topcrest, etc.)
- Tailwind CSS for styling with custom dark/light theme
- Keystatic CMS for non-technical content management
- Netlify hosting with Netlify Forms for contact functionality

## Phase 1: Initial Setup

### Project Context

- **Languages**: Bilingual site - Spanish (primary/default) and English (secondary)
- **Styling**: Tailwind CSS v4 with custom design system
- **Content**: Already organized, can be provided as JSON/structured data. Will be converted to Markdown files for each language
- **Images**: Each product has 2 featured images + 4-6 gallery images
- **CMS**: Keystatic for post-launch content management by marketing team (not for initial setup)

## Phase 2: Architecture Design

### Technology Stack Decision

**Static Site Generation with i18n + Translated Routes**
- **Output mode**: `static` (all pages pre-rendered)
- **i18n Strategy**: Astro's built-in i18n routing with `prefixDefaultLocale: false` + translated route segments
  - Spanish (default): `/` (root paths) with Spanish route names
  - English: `/en/` prefix with English route names
- **CMS**: Keystatic will be added post-launch (Phase 2) when marketing team needs editing capabilities
- **Reasoning**:
  - Static output is simpler, faster, and more efficient for initial development
  - Translated routes provide better UX and SEO
  - Keystatic can be added later without restructuring content

### Internationalization (i18n) Architecture

**Astro i18n Configuration:**
```javascript
i18n: {
  locales: ['es', 'en'],
  defaultLocale: 'es',
  routing: {
    prefixDefaultLocale: false  // Spanish at root, English at /en/
  }
}
```

**URL Structure (with translated routes):**
- Spanish (default): `/`, `/acerca-de`, `/productos`, `/productos/trimflex`, `/contacto`
- English: `/en/`, `/en/about`, `/en/products`, `/en/products/trimflex`, `/en/contact`

**Note**: Route segments are translated for better UX and SEO. Spanish users see Spanish words in URLs.

**Content Organization:**
- Products in both languages stored in separate directories
- Each product has matching files in both languages
- Example: `src/content/products/es/trimflex.md` and `src/content/products/en/trimflex.md`

### Project Structure

```
clisev2/
├── src/
│   ├── pages/
│   │   ├── index.astro                 # Home (Spanish - /)
│   │   ├── acerca-de.astro             # About (Spanish - /acerca-de)
│   │   ├── contacto.astro              # Contact (Spanish - /contacto)
│   │   ├── productos/
│   │   │   ├── index.astro             # Products listing (Spanish - /productos)
│   │   │   └── [slug].astro            # Product pages (Spanish - /productos/[slug])
│   │   └── en/                          # English pages
│   │       ├── index.astro             # Home (English - /en/)
│   │       ├── about.astro             # About (English - /en/about)
│   │       ├── contact.astro           # Contact (English - /en/contact)
│   │       └── products/
│   │           ├── index.astro         # Products listing (English - /en/products)
│   │           └── [slug].astro        # Product pages (English - /en/products/[slug])
│   ├── layouts/
│   │   ├── BaseLayout.astro            # Base HTML layout (accepts lang prop)
│   │   └── ProductLayout.astro         # Product-specific layout
│   ├── components/
│   │   ├── Header.astro                # Navigation (with language switcher)
│   │   ├── Footer.astro
│   │   ├── LanguageSwitcher.astro      # Language toggle component
│   │   ├── ProductCard.astro           # For products listing
│   │   ├── FeaturedImages.astro        # Display 2 featured images
│   │   ├── ImageGallery.astro          # Display 4-6 gallery images
│   │   └── ContactForm.astro           # Netlify form component
│   ├── content/
│   │   └── products/
│   │       ├── es/                      # Spanish products
│   │       │   ├── trimflex.md
│   │       │   ├── topcrest.md
│   │       │   └── ...
│   │       └── en/                      # English products
│   │           ├── trimflex.md
│   │           ├── topcrest.md
│   │           └── ...
│   ├── styles/
│   │   └── global.css                   # Tailwind CSS imports and @theme config
│   ├── i18n/
│   │   ├── ui.ts                        # UI translations (nav, buttons, etc.)
│   │   └── utils.ts                     # i18n helper functions
│   └── assets/
│       └── products/                    # Product images (optimized by Astro)
│           ├── trimflex/
│           │   ├── featured-1.jpg
│           │   ├── featured-2.jpg
│           │   ├── gallery-1.jpg
│           │   └── ...
│           └── topcrest/
│               └── ...
├── public/
│   └── (static assets like favicon, robots.txt)
├── keystatic.config.ts                  # Keystatic CMS configuration
├── src/content.config.ts                # Content collections config
└── astro.config.mjs                     # Astro configuration (with i18n and Tailwind)
```

### Content Collections Schema

Products collection structure (same for both languages):
```typescript
{
  name: string,                    // e.g., "Trimflex" / "Trimflex"
  slug: string,                    // URL-friendly name (same in both languages)
  description: string,             // Main description (localized)
  applications: string,            // Where it's used (localized)
  finishes: string,                // Available finishes (localized)
  industries: string,              // Target industries (localized)
  featuredImages: array<image()>,  // 2 featured images (optimized by Astro)
  galleryImages: array<image()>,   // 4-6 gallery images (optimized by Astro)
  featured: boolean,               // Show on homepage?
  lang: 'es' | 'en'               // Language identifier
}
```

**Important Notes**:
- **Images are language-neutral**: Same images used for both languages, only text content is translated
- **Using `image()` helper**: Enables automatic optimization, type-safety, and validation
- **Images stored in `src/assets/products/`**: Allows Astro to process and optimize at build time

## Phase 3: Implementation Steps

### Key Implementation Note: Translated Routes

Astro's i18n doesn't automatically translate route segments. To achieve translated routes:
- **Spanish pages**: Create files with Spanish names in root (`/productos/`, `/contacto.astro`)
- **English pages**: Create files with English names in `/en/` (`/en/products/`, `/en/contact.astro`)
- **Result**: URLs are naturally localized without complex configuration

This is simpler than middleware-based solutions and provides better SEO/UX.

### Step 1: Set Up Tailwind CSS

**Tasks:**
1. Install Tailwind CSS v4 (already done via `npx astro add tailwind`)
2. Configure `src/styles/global.css` with Tailwind imports and optional custom theme settings
3. Import Inter font in BaseLayout.astro (optional, can use any font)
4. Import global.css in BaseLayout.astro
5. Test Tailwind classes work correctly in development

### Step 2: Install Dependencies

**Required packages:**
```bash
# Tailwind CSS (already installed via npx astro add tailwind)
# @tailwindcss/vite - Tailwind v4 Vite plugin (already installed)
# No additional packages needed for static site!
# Astro comes with everything we need for i18n and static generation
```

**Note**: We're keeping this simple for initial development. Netlify adapter and Keystatic will be added in Phase 2 when needed.

### Step 3: Configure Astro

**File**: `astro.config.mjs`

Configure:
- Tailwind CSS via Vite plugin (already configured)
- Output: `static` (default, can be explicit or omitted)
- i18n routing:
  ```javascript
  import { defineConfig } from 'astro/config';
  import tailwindcss from '@tailwindcss/vite';

  export default defineConfig({
    vite: {
      plugins: [tailwindcss()]
    },
    i18n: {
      locales: ['es', 'en'],
      defaultLocale: 'es',
      routing: {
        prefixDefaultLocale: false
      }
    }
  });
  ```

**That's it!** No adapters or additional integrations needed for static site.

### Step 4: Set Up Content Collections

**File**: `src/content.config.ts`

Configure content collections for products:
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { image } from 'astro:content';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    applications: z.string(),
    finishes: z.string(),
    industries: z.string(),
    featuredImages: z.array(image()), // Using image() helper for automatic optimization
    galleryImages: z.array(image()),  // Using image() helper for automatic optimization
    featured: z.boolean(),
    lang: z.enum(['es', 'en'])
  })
});

export const collections = { products };
```

**Key Improvement**: Using `image()` helper instead of `z.string()` enables:
- Automatic image optimization at build time
- Type-safety and validation for image references
- Better integration with Astro's `<Image>` component
- Images stored in `src/assets/products/` for processing

### Step 5: Create Base Layout with Tailwind

**Tasks:**
1. Create `BaseLayout.astro` that includes:
   - Import of `../styles/global.css` (Tailwind CSS)
   - Optional Inter font from CDN
   - Meta tags for SEO
   - Language-aware `<html lang="...">` attribute
   - Theme initialization script for dark/light mode
2. Design responsive layouts using Tailwind utility classes
3. Create reusable component patterns with Tailwind
4. Test responsive design on different screen sizes

### Step 5.5: Implement Dark/Light Theme System

**Tasks:**
1. **Configure Tailwind dark mode** in `src/styles/global.css`:
   ```css
   @import "tailwindcss";
   @custom-variant dark (&:where(.dark, .dark *));
   ```
   This enables class-based dark mode toggling.

2. **Add theme initialization script** in `BaseLayout.astro` (in `<head>` before any content):
   ```javascript
   <script is:inline>
     // Set dark mode by default (not system)
     const theme = localStorage.getItem('theme') || 'dark';
     document.documentElement.classList.toggle('dark', theme === 'dark');
   </script>
   ```

3. **Use Tailwind dark mode classes** in components:
   - Example: `class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"`
   - Apply `dark:` variants throughout all components

4. **Create ThemeSwitcher component**:
   - Toggle button with sun/moon icon
   - Client-side script to toggle `dark` class on `<html>`:
     ```javascript
     const toggleTheme = () => {
       const isDark = document.documentElement.classList.toggle('dark');
       localStorage.theme = isDark ? 'dark' : 'light';
     };
     ```

5. **Test both themes** across all pages

**Note**: Default is dark mode. System preference is ignored unless explicitly chosen by user.

### Step 6: Build Page Components

**Create i18n utilities first:**
- `src/i18n/ui.ts`: Translations for UI elements (navigation, buttons, form labels, etc.)
- `src/i18n/utils.ts`: Helper functions for translations

**Spanish Pages (root with translated routes):**

#### Home Page (`src/pages/index.astro`)
- Route: `/`
- Hero section (Spanish text) styled with Tailwind
- Featured products (query from `products` where `lang === 'es'` and `featured === true`)
- Call-to-action sections
- Language switcher in header
- Use Tailwind utility classes for responsive layout and styling

#### About Page (`src/pages/acerca-de.astro`)
- Route: `/acerca-de`
- Company information in Spanish
- Static content

#### Products Listing (`src/pages/productos/index.astro`)
- Route: `/productos`
- Query Spanish products: `getCollection('products', ({ data }) => data.lang === 'es')`
- Display as grid using ProductCard components
- Spanish labels and text

#### Individual Product Page (`src/pages/productos/[slug].astro`)
- Route: `/productos/[slug]`
- Use `getStaticPaths()` to generate routes for Spanish products
- Display: 2 featured images at top (FeaturedImages component)
- Display: 4-6 gallery images below (ImageGallery component)
- Product details: name, description, applications, finishes, industries

#### Contact Page (`src/pages/contacto.astro`)
- Route: `/contacto`
- Contact form using Netlify Forms (Spanish)
- Form fields: name, email, company, message
- Spanish labels
- Add `netlify` attribute to form

**English Pages (/en/ directory with English routes):**

#### Home Page (`src/pages/en/index.astro`)
- Route: `/en/`
- Same structure as Spanish, English text

#### About Page (`src/pages/en/about.astro`)
- Route: `/en/about`
- English content

#### Products Listing (`src/pages/en/products/index.astro`)
- Route: `/en/products`
- Query: `getCollection('products', ({ data }) => data.lang === 'en')`
- English labels

#### Individual Product Page (`src/pages/en/products/[slug].astro`)
- Route: `/en/products/[slug]`
- Same images, English text

#### Contact Page (`src/pages/en/contact.astro`)
- Route: `/en/contact`
- English form labels

### Step 7: Create Reusable Components

**Header.astro**
- Navigation menu with localized links
- Uses `getRelativeLocaleUrl()` for proper routing
- Accepts `lang` prop ('es' | 'en')
- Displays translated nav items from i18n/ui.ts
- Mobile-responsive using Tailwind (e.g., hidden/flex with breakpoints)
- Includes LanguageSwitcher component
- Includes ThemeSwitcher component

**LanguageSwitcher.astro**
- Toggle between Spanish/English
- Shows current language
- Links to same page in other language
- Uses Astro's i18n helpers

**ThemeSwitcher.astro**
- Toggle between light/dark mode
- Default: dark mode (not system preference)
- Stores preference in localStorage
- Client-side JavaScript to toggle theme
- Icon button (sun/moon icons)

**Footer.astro**
- Company info, links, social media
- Accepts `lang` prop for translations
- Localized text

**ProductCard.astro**
- Display product first featured image as thumbnail
- Product name and brief description excerpt
- Link to individual product page (language-aware)
- Accepts `lang` prop

**FeaturedImages.astro**
- Display 2 featured images prominently at top of product page
- Side-by-side or stacked layout
- Optimized using Astro's `<Image>` component
- Clickable to open in modal/lightbox

**ImageGallery.astro**
- Display 4-6 gallery images in responsive grid (Tailwind grid classes)
- Lightbox/modal functionality for full-size viewing (custom or library like Photoswipe)
- Thumbnail grid layout
- Optimized image loading using Astro's `<Image>` component
- Lazy loading for performance

**ContactForm.astro**
- HTML form with Netlify attributes
- Accepts `lang` prop for form labels
- Form fields: name, email, company (optional), message
- Client-side validation
- Accessible form design
- Localized error messages

### Step 8: Configure Netlify Deployment

**File**: `netlify.toml` (optional, but recommended)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

**Netlify Forms Setup:**
- Ensure both contact forms have `netlify` attribute and `name` attribute
- Spanish form: `name="contact-es"`
- English form: `name="contact-en"`
- Configure form notifications in Netlify dashboard to marketing team email

**Note**: Static sites are simple to deploy on Netlify - just connect your GitHub repo!

### Step 9: Optimize for Performance

**Image Optimization:**
- Use Astro's built-in `<Image>` component for all images
- Netlify Image CDN will handle optimization automatically
- Lazy loading for product galleries

**CSS/JS Optimization:**
- Tailwind automatically purges unused CSS classes in production
- Minimize custom CSS (use Tailwind utilities when possible)
- Use Astro's automatic CSS bundling

**SEO Optimization:**
- Add meta tags to BaseLayout (language-aware)
- Add hreflang tags linking Spanish/English versions
- Generate sitemap with both languages
- Structured data for products (JSON-LD)
- Language-specific meta descriptions
- Open Graph tags for social sharing (both languages)

## Phase 4: Content Entry

### Step 10: Create Product Markdown Files

**Approach**: User will provide organized product data. We'll create Markdown files for each product in both languages.

**Process**:

1. **Receive product data** from user (JSON, spreadsheet, or structured format)
2. **Create Markdown files** for each product:
   - Spanish version: `src/content/products/es/[slug].md`
   - English version: `src/content/products/en/[slug].md`
3. **Markdown file structure**:
   ```markdown
   ---
   name: "Trimflex"
   slug: "trimflex"
   description: "Descripción del producto..."
   applications: "Aplicaciones del producto..."
   finishes: "Acabados disponibles..."
   industries: "Industrias objetivo..."
   featuredImages:
     - "../../assets/products/trimflex/featured-1.jpg"
     - "../../assets/products/trimflex/featured-2.jpg"
   galleryImages:
     - "../../assets/products/trimflex/gallery-1.jpg"
     - "../../assets/products/trimflex/gallery-2.jpg"
     - "../../assets/products/trimflex/gallery-3.jpg"
     - "../../assets/products/trimflex/gallery-4.jpg"
   featured: true
   lang: "es"
   ---

   Additional product content (optional)
   ```

4. **Place product images** in `src/assets/products/[product-name]/`
   - This allows Astro to optimize images at build time
   - Both Spanish and English markdown files reference the same images (shared assets)
   - Relative paths from markdown files: `../../assets/products/[product-name]/[image].jpg`
5. **Verify** content displays correctly on both language versions of the site

**Post-Launch**: Marketing team will use Keystatic to edit these same Markdown files.

### Step 11: Testing

**Functionality Testing:**
- All Spanish routes work with translated URLs:
  - `/` (home), `/acerca-de`, `/productos`, `/productos/[slug]`, `/contacto`
- All English routes work:
  - `/en/` (home), `/en/about`, `/en/products`, `/en/products/[slug]`, `/en/contact`
- Language switcher toggles between languages correctly
- Product pages generate correctly for both languages (10-15 products × 2 languages)
- Featured images (2) and gallery images (4-6) display properly
- Contact form submits to Netlify in both languages (separate form names)
- Mobile responsiveness across all pages
- 404 pages for both languages

**i18n Testing:**
- Language detection and routing works
- Correct language content displays on each route
- Translated routes work correctly (/productos vs /products)
- Links maintain language context
- Language switcher shows correct current language
- Hreflang tags are correct for SEO
- No mixed-language content on pages

**Performance Testing:**
- Run Lighthouse audit for both languages
- Check page load times (Spanish and English)
- Verify image optimization (featured + gallery)
- Test on mobile devices
- Verify lazy loading works

## Phase 5: Deployment

### Step 12: Deploy to Netlify

1. Connect GitHub repository to Netlify
2. Configure environment variables
3. Set up Keystatic with GitHub storage for production
4. Deploy and verify
5. Configure custom domain (if applicable)
6. Set up form notifications

## Critical Files to Modify/Create

### Configuration Files
- `astro.config.mjs` - Add i18n config and Tailwind Vite plugin (static output)
- `src/styles/global.css` - Tailwind imports and @custom-variant for dark mode
- `netlify.toml` - Netlify build configuration (optional)
- `package.json` - Update if adding any optional packages
- `src/content.config.ts` - Content collections configuration

### i18n Files
- `src/i18n/ui.ts` - UI translations (nav, buttons, labels)
- `src/i18n/utils.ts` - i18n helper functions

### Layout Files
- `src/layouts/BaseLayout.astro` - Main HTML structure with Tailwind (imports global.css), hreflang tags, language support, dark mode script
- `src/layouts/ProductLayout.astro` - Product page layout

### Spanish Page Files (Root - with translated routes)
- `src/pages/index.astro` - Home (`/`)
- `src/pages/acerca-de.astro` - About (`/acerca-de`)
- `src/pages/productos/index.astro` - Products listing (`/productos`)
- `src/pages/productos/[slug].astro` - Dynamic product pages (`/productos/[slug]`)
- `src/pages/contacto.astro` - Contact form (`/contacto`)

### English Page Files (/en/ - with English routes)
- `src/pages/en/index.astro` - Home (`/en/`)
- `src/pages/en/about.astro` - About (`/en/about`)
- `src/pages/en/products/index.astro` - Products listing (`/en/products`)
- `src/pages/en/products/[slug].astro` - Dynamic product pages (`/en/products/[slug]`)
- `src/pages/en/contact.astro` - Contact form (`/en/contact`)

### Component Files
- `src/components/Header.astro` - Navigation with i18n and theme switcher
- `src/components/LanguageSwitcher.astro` - Language toggle
- `src/components/ThemeSwitcher.astro` - Dark/light mode toggle
- `src/components/Footer.astro` - Footer with i18n
- `src/components/ProductCard.astro` - Product card
- `src/components/FeaturedImages.astro` - 2 featured images display
- `src/components/ImageGallery.astro` - 4-6 gallery images
- `src/components/ContactForm.astro` - Netlify form with i18n

### Content Files (Created from user's product data)
- `src/content/products/es/*.md` - Spanish product files
- `src/content/products/en/*.md` - English product files

## Verification Steps

After implementation:

1. **Build Test**: Run `npm run build` - should complete without errors, verify both locales built
2. **Route Test**: Verify all routes exist:
   - Spanish: `/`, `/acerca-de`, `/productos`, `/productos/trimflex`, `/contacto`
   - English: `/en/`, `/en/about`, `/en/products`, `/en/products/trimflex`, `/en/contact`
3. **Dev Test**: Run `npm run dev` - test all Spanish and English routes
4. **i18n Test**:
   - Visit `/` (Spanish) and `/en/` (English)
   - Test language switcher on each page
   - Verify correct language content displays
   - Confirm translated routes work (productos vs products)
5. **Content Test**: Verify all 10-15 products appear in both languages with matching slugs
6. **Image Test**: Verify 2 featured images + 4-6 gallery images display correctly
7. **Theme Test**:
   - Page loads in dark mode by default
   - Theme switcher toggles between light/dark
   - Preference persists across page navigation
   - Both themes render correctly with Tailwind dark mode classes
8. **Form Test**: Submit contact forms `/contacto` and `/en/contact`, check Netlify dashboard
8. **Production Test**: Deploy to Netlify, verify all functionality in production
9. **SEO Test**: Check hreflang tags, meta tags, sitemap includes both languages and translated routes
10. **Performance Test**: Run Lighthouse on `/`, `/en/`, `/productos`, `/en/products`, aim for 90+ scores
11. **Mobile Test**: Test responsive design, language switcher, image galleries on mobile

## Notes

### Important Considerations

- **Output Mode**: Static site (no server needed, simple deployment)
- **Multilingual**: Fully bilingual (Spanish primary, English secondary)
- **Translated Routes**: Spanish uses Spanish words (`/productos`), English uses English (`/products`)
- **URL Structure**: Spanish at root `/`, English at `/en/` prefix
- **Content Parity**: All products must exist in both Spanish and English with matching slugs
- **Images**: Shared between languages (same images for both ES/EN versions)
  - Stored in `src/assets/products/` for Astro optimization
  - Using `image()` helper in schema for type-safety and automatic optimization
  - Both language markdown files reference the same image assets
- **Image Layout**: 2 featured images prominently displayed, then 4-6 gallery images below
- **Theme**: Dark mode by default with light/dark switcher (stored in localStorage)
- **Content Format**: Markdown files with frontmatter (no CMS during initial development)
- **Phase 2 Features** (to be added later):
  - Keystatic CMS for marketing team
  - Blog (bilingual)
  - Hybrid mode (only if/when Keystatic is needed)

### SEO Considerations

- Implement hreflang tags linking Spanish ↔ English versions
- Separate meta descriptions for each language
- Sitemap includes both language versions
- Use `lang` attribute correctly on `<html>` tag for each language
