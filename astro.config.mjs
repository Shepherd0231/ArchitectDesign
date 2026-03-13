// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  integrations: process.env.SITE_URL ? [sitemap()] : [],
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "zh-cn",
    locales: ["zh-cn", "en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
