
---

## Optimized `astro-deployment` Skill

```yaml id="astro-deploy-optimized"
name: "astro-deployment"
description: "Handles deployment of Astro websites to Cloudflare Pages with R2 CDN integration, serverless forms, edge caching, HTTP headers, environment management, and multilingual/static site optimization. Ensures low-maintenance, scalable, high-performance B2B deployments."
```

---

# Astro Deployment & Cloudflare Skill (Optimized)

## Purpose

Ensure that Astro websites deploy efficiently to **Cloudflare Pages**, support **R2 CDN for images/assets**, handle **serverless forms**, enforce **security headers**, implement **edge caching**, and manage environment variables in line with B2B Astro site architecture.

---

## 1️⃣ Project Build & Deployment

### Local Build & Preview

```bash id="build1"
npm run build
npm run preview
```

### Cloudflare Pages Deployment

1. Connect GitHub repository to Cloudflare Pages.
2. Build command: `npm run build`
3. Output directory: `dist/`
4. Set environment variables (R2 URL, API keys, etc.)
5. Deploy

> Works with static multi-page sites and multilingual sites (i18n).

---

## 2️⃣ R2 CDN Integration

1. Store local images in `public/images/`.
2. Optional: upload to **Cloudflare R2 bucket**.
3. Set environment variable in Cloudflare Pages:

```env id="r2-env"
R2_PUBLIC_URL=https://<bucket>.r2.dev
```

4. Reference in Astro components:

```astro id="r2-astro"
---
const baseUrl = import.meta.env.R2_PUBLIC_URL || '';
---
<img src={`${baseUrl}/images/hero.jpg`} alt="Hero">
```

> Ensures scalable asset delivery and low-latency CDN caching.

---

## 3️⃣ Serverless Forms & API Integration

1. Place Cloudflare Functions in `functions/`.
2. Example: `functions/contact.js`

```javascript id="contact-fn"
export async function onRequestPost({ request }) {
  const data = await request.json();
  // Process form data (e.g., save to D1 or send email via Resend)
  return new Response(JSON.stringify({ success: true }));
}
```

3. Form HTML example:

```html id="contact-form"
<form method="POST" action="/contact">
  <input name="name" required>
  <input name="email" type="email" required>
  <button type="submit">Send</button>
</form>
```

> Fully compatible with GDPR-compliant data collection and low-maintenance backend.

---

## 4️⃣ Headers & Security

Use `_headers` file in project root to enforce security and caching:

```text id="headers-cf"
/*
  Cache-Control: public, max-age=3600
  Strict-Transport-Security: max-age=31536000
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: no-referrer-when-downgrade
  Content-Security-Policy: default-src 'self'; img-src 'self' https://<bucket>.r2.dev
```

* Edge caching for static assets automatically handled.
* HTTPS enforced.
* Protects against common web attacks.

---

## 5️⃣ Caching & Performance

* Static assets (CSS, JS, images) use hashed filenames → automatic CDN caching.
* `_redirects` file can manage rewrites and SPA routing.
* Optional: prefetch R2 assets for faster first load.

---

## 6️⃣ Environment Variable Management

* Cloudflare Pages UI or local `.env` file:

```env id="env-vars"
PUBLIC_API_URL=https://api.example.com
PRIVATE_API_KEY=secret_key
R2_PUBLIC_URL=https://<bucket>.r2.dev
```

* Access in Astro components:

```astro id="env-astro"
const apiUrl = import.meta.env.PUBLIC_API_URL;
```

> Keeps secrets safe while allowing app to access endpoints dynamically.

---

## 7️⃣ CI/CD & Rollback

* Use GitHub Actions for automated build + deploy:

```yaml id="ci-cf"
name: Cloudflare CI/CD
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: ${{ secrets.CF_PROJECT_NAME }}
          directory: './dist'
```

* Rollback: trigger previous deployment via Cloudflare Pages dashboard.

---

## 8️⃣ Post-Deployment Verification

* [ ] Site loads correctly on all pages
* [ ] Images served via R2 or local fallback
* [ ] Forms functional
* [ ] SEO meta & Open Graph tags correct
* [ ] Edge caching effective
* [ ] Multilingual pages correctly linked
* [ ] Security headers verified
* [ ] Analytics tracking in place

---

## Expected Output Behavior

1. Astro project builds successfully for static hosting.
2. Cloudflare Pages deployment is smooth.
3. Images served via local or R2 CDN.
4. Serverless forms functional via `functions/`.
5. Security headers applied automatically.
6. Edge caching ensures fast load.
7. Environment variables accessible safely.
8. Fully compatible with SEO, Content, Components, and Performance skills in your B2B Astro architecture.

---

这个版本完全贴合你的架构要求，包括：

* Cloudflare Pages + R2 集成
* 多页、多语言兼容
* Serverless 表单
* 安全 headers + Edge 缓存
* CI/CD 自动化部署
* 低运维、易扩展

---

我可以下一步帮你生成 **完整 Trae Skill 调用顺序与操作指南**，把 `deployment-guide` + `astro-deployment` 两个 Skill 串成一个完整模板化建站流程，让你直接运行即可。

你希望我生成吗？
