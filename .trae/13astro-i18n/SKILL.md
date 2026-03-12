

---

## True Multilingual `astro-i18n` Skill

```yaml
name: "astro-i18n"
description: "Manages true multilingual support for Astro B2B websites. Generates pages for selected languages, routes, SEO metadata, sitemap, and language switcher. Integrates with Markdown, JSON, or CMS content sources and is compatible with deployment and Cloudflare optimization skills."
parameters:
  supportedLangs:
    type: array
    description: "List of languages to generate, e.g., ['en','zh','fr','de','es']"
    required: true
```

---

# Astro True Multilingual Skill

## Purpose

* Generate Astro pages for **selected languages only**
* Ensure **SEO-friendly routing**, meta tags, and canonical URLs
* Provide **Language Switcher** for navigation
* Integrate with Markdown, JSON, or Sanity CMS
* Work seamlessly with `deployment-guide` and `astro-deployment` Skills

---

## 1️⃣ File & Folder Structure

```text
src/
  pages/
    <lang>/   # e.g., en/, zh/, fr/, de/
      index.astro
      products/
        index.astro
  components/
    LanguageSwitcher.astro
    SeoHead.astro
data/
  products.json  # multilingual content by language
```

* `pages/<lang>/` 自动生成所选语言页面
* Components 与模板共享

---

## 2️⃣ Language Switcher Component

```astro
---
const { currentLang, supportedLangs, pathname } = Astro.props;
---
<nav>
  {supportedLangs.map(lang => (
    <a href={`/${lang}${pathname.replace(/^\/(.*?)/,'')}`} class={lang===currentLang?'active':''}>
      {lang.toUpperCase()}
    </a>
  ))}
</nav>
```

* 自动根据选定语言列表生成切换链接
* 保证多语言 SEO URL 规范

---

## 3️⃣ SEO Metadata per Language

```astro
---
const { title, description, lang, canonical } = Astro.props;
---
<html lang={lang}>
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:locale" content={lang === 'zh' ? 'zh_CN' : `${lang}_${lang.toUpperCase()}`} />
  </head>
</html>
```

* 自动为每种语言生成 `<head>`
* Canonical URL 与 sitemap 对应

---

## 4️⃣ CMS / Content Integration

* **Markdown Example**

```text
content/products/index.en.md
content/products/index.zh.md
content/products/index.fr.md
```

* **JSON Example**

```json
{
  "en": [{"title":"Product A","url":"/en/products/a"}],
  "zh": [{"title":"产品A","url":"/zh/products/a"}],
  "fr": [{"title":"Produit A","url":"/fr/products/a"}]
}
```

* Astro page 动态加载：

```astro
---
import content from '../../data/products.json';
const lang = Astro.props.lang;
const products = content[lang];
---
<ul>
  {products.map(p => <li><a href={p.url}>{p.title}</a></li>)}
</ul>
```

* **CMS (Sanity) Example**

```js
const products = await getCollection('products', { lang: Astro.props.lang });
```

---

## 5️⃣ Sitemap Generation (Automatic)

```javascript
import fs from 'fs';
const langs = Astro.props.supportedLangs;
const pages = ['index','products/index'];

const sitemap = langs.flatMap(lang =>
  pages.map(page => `<url><loc>https://example.com/${lang}/${page}</loc></url>`)
);
fs.writeFileSync('dist/sitemap.xml', `<urlset>${sitemap.join('')}</urlset>`);
```

* 仅生成 **选定语言的 URL**
* 与 SEO Skill 配合

---

## 6️⃣ Trae Usage Flow

1. **选择语言列表**：

```json
{
  "supportedLangs": ["en","zh","fr","de","es"]
}
```

2. Skill 遍历生成每个语言的页面和目录
3. 生成 **Language Switcher、SEO metadata、sitemap**
4. 与部署 Skill 结合：

   * `deployment-guide` → 多平台 CI/CD、SEO、环境变量
   * `astro-deployment` → Cloudflare Pages + R2 + Serverless + Headers + Cache

---

## 7️⃣ Post-Generation Verification

* [ ] 所选语言页面全部生成
* [ ] Language Switcher 正常切换
* [ ] SEO `<title>`、`description`、canonical 正确
* [ ] Sitemap 包含所有选定语言 URL
* [ ] CMS 内容对应每种语言显示正确
* [ ] 路由和多页结构符合 B2B 外贸站标准

---

✅ **特点**

* 支持任意语言（不局限中英）
* 可按需求选用语言生成
* 与 Markdown/JSON/CMS 内容管理无缝集成
* 与 `deployment-guide` 和 `astro-deployment` 完整兼容
* 低运维、可扩展、多页、多语言

---

