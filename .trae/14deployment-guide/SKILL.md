
---

## Optimized `deployment-guide` Skill

```yaml
name: "deployment-guide"
description: "Guides deployment of Astro websites to multiple platforms (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Optimized for multilingual B2B sites, SEO automation, static site performance, CI/CD, environment variables, domain setup, rollback, and low-maintenance operations."
```

---

# Deployment Guide Skill (Optimized for B2B Astro Sites)

## Purpose

Provide step-by-step guidance for deploying Astro websites, ensuring smooth builds, CI/CD automation, SEO/performance optimization, multilingual support, and proper environment/configuration management.

---

## Supported Platforms

1. **Vercel (Recommended)**
2. **Netlify**
3. **Cloudflare Pages**
4. **GitHub Pages**

> Note: For Cloudflare-specific optimizations (R2 CDN, serverless forms, headers), use the `astro-deployment` Skill.

---

## Pre-Deployment Checklist

Before deploying, ensure:

* [ ] Local build passes: `npm run build`
* [ ] Local preview: `npm run preview`
* [ ] Lighthouse score ≥ 90
* [ ] All images optimized (R2 optional)
* [ ] No console errors
* [ ] All links functional
* [ ] Meta tags & SEO data present
* [ ] Sitemap & robots.txt configured
* [ ] Canonical URLs correct
* [ ] HTTPS enabled
* [ ] Security headers set
* [ ] Dependencies updated
* [ ] Multilingual pages correctly linked (i18n: e.g., `/en/` & `/zh/`)

---

## 1️⃣ Vercel

### Setup

```bash
npm i -g vercel
vercel login
vercel
```

### Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "rewrites": [
    { "source": "/:lang(en|zh)/:path*", "destination": "/:path*" }
  ]
}
```

### Environment Variables

```bash
vercel env add PUBLIC_API_URL
vercel env add PRIVATE_API_KEY
```

### Domain Setup

1. Add domain in Vercel dashboard
2. Point DNS
3. Wait for SSL issuance

### Rollback

```bash
vercel ls
vercel --rollback <deployment-id>
```

---

## 2️⃣ Netlify

### Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deploy

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Domain Setup

1. Add domain in Netlify dashboard
2. Point DNS
3. Enable HTTPS

---

## 3️⃣ Cloudflare Pages

### Configuration (`astro.config.mjs`)

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  base: '/', // set if multilingual or repo subpath
});
```

### Deploy Steps

1. Connect GitHub repo
2. Build command: `npm run build`
3. Output: `dist`
4. Set environment variables as needed

> For R2 CDN, serverless forms, and headers, see `astro-deployment` Skill.

---

## 4️⃣ GitHub Pages

### Configuration (`astro.config.mjs`)

```javascript
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name',
});
```

### GitHub Actions Example (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v2
      - uses: actions/deploy-pages@v3
```

---

## CI/CD Pipeline Example (Cross-Platform)

```yaml
name: CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v2
        with:
          node-version: 20
```

---

## Environment Management

* Local `.env`

```env
PUBLIC_API_URL=https://api.example.com
PRIVATE_API_KEY=secret_key
```

* Production variables set in hosting dashboard (Vercel, Netlify, Cloudflare Pages)

---

## Post-Deployment Verification

* [ ] Verify site loads correctly
* [ ] All pages accessible
* [ ] Forms and interactions functional
* [ ] Analytics tracking installed
* [ ] SEO meta & Open Graph tags present
* [ ] Multilingual navigation working

---

## Summary

This optimized `deployment-guide` Skill ensures:

1. Smooth deployment to multiple platforms
2. CI/CD automation and environment management
3. SEO, performance, and multilingual support
4. Domain and DNS setup guidance
5. Rollback and troubleshooting procedures
6. Compatibility with your B2B Astro architecture (low-maintenance, scalable, multi-page, multilingual)

```

---

```
