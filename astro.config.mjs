// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';

import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false  // Spanish at root, English at /en/
    }
  },

  integrations: [react(), markdoc(), keystatic(), sitemap()],
  adapter: netlify()
});