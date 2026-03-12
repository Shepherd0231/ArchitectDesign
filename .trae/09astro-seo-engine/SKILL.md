---

# **Trae Skill: astro-seo-engine**

**Name:** `astro-seo-engine`

**Description:**
标准化 Astro 网站 SEO 系统。自动生成 **Meta 标签、Canonical URL、OpenGraph、Twitter Cards、Structured Data、图片 SEO 规则和 Sitemap 结构**。
该 Skill 专为 **Astro + Cloudflare Pages + R2 架构的外贸网站**设计，支持 Markdown / JSON / CMS 内容驱动。

---

# **Dependencies**

| Skill                    | Purpose           |
| ------------------------ | ----------------- |
| astro-core-setup         | Astro 项目基础结构      |
| astro-components         | 页面组件              |
| image-management         | 图片命名与来源           |
| image-media-performance  | 图片优化              |
| sanity-content-management | Markdown / CMS 内容 |
| deployment-cloudflare    | sitemap / robots  |

---

# **1️⃣ Core SEO Principles**

每个页面必须包含：

* **Title**
* **Meta Description**
* **Canonical URL**
* **OpenGraph**
* **Twitter Card**
* **正确的 H1 结构**

SEO 字段统一定义：

```
title
description
image
keywords
canonical
```

数据来源：

* Markdown
* JSON
* CMS（如 Sanity）

---

# **2️⃣ SEO Component**

创建统一 SEO 组件。

路径：

```
src/components/SEOHead.astro
```

实现：

```astro
---
const {
  title,
  description,
  image = "/images/og-default.jpg",
  keywords = "",
  canonical = ""
} = Astro.props;

const siteName = "Company Name";

const url = canonical || new URL(Astro.url.pathname, Astro.site);
---

<title>{title} | {siteName}</title>

<meta name="robots" content="index, follow">

<meta name="description" content={description} />
<meta name="keywords" content={keywords} />

<link rel="canonical" href={url} />

<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />
<meta property="og:url" content={url} />
<meta property="og:site_name" content={siteName} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={image} />
```

---

# **3️⃣ Layout Integration**

SEO 组件必须集成到全局 Layout。

路径：

```
src/layouts/BaseLayout.astro
```

实现：

```astro
---
import SEOHead from "../components/SEOHead.astro";

const { title, description, image } = Astro.props;
---

<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<SEOHead
 title={title}
 description={description}
 image={image}
/>

</head>

<body>

<slot />

</body>

</html>
```

---

# **4️⃣ Page SEO Usage**

每个页面必须传递 SEO 数据。

示例：

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout
 title="Solar Panel Systems"
 description="Professional solar panel systems for residential and commercial use."
 image="/images/products/solar-panel.jpg"
>

<h1>Solar Panel Systems</h1>

<p>
High efficiency solar panel systems designed for modern energy solutions.
</p>

</BaseLayout>
```

---

# **5️⃣ Image SEO Strategy**

图片必须遵循：

| 规则           | 说明                           |
| ------------ | ---------------------------- |
| 描述性文件名       | solar-panel-installation.jpg |
| alt 文本       | 详细描述                         |
| 固定尺寸         | width / height               |
| lazy loading | loading="lazy"               |

示例：

```html
<img
 src="/images/products/solar-panel.jpg"
 alt="High efficiency solar panel installation on residential roof"
 width="800"
 height="600"
 loading="lazy"
 decoding="async"
/>
```

图片来源：

* 本地 `/public/images`
* Cloudflare R2
* Unsplash 占位图

---

# **6️⃣ Structured Data**

推荐加入 **Schema.org JSON-LD**。

示例（公司信息）：

```html
<script type="application/ld+json">

{
 "@context": "https://schema.org",
 "@type": "Organization",
 "name": "Company Name",
 "url": "https://example.com",
 "logo": "https://example.com/logo.png",
 "sameAs": [
   "https://linkedin.com/company/example",
   "https://twitter.com/example"
 ]
}

</script>
```

---

# **7️⃣ Sitemap Generation**

在 `astro.config.mjs` 中加入：

```js
import sitemap from "@astrojs/sitemap";

export default {
 site: "https://example.com",
 integrations: [sitemap()]
};
```

生成：

```
/sitemap-index.xml
```

自动提交搜索引擎。

---

# **8️⃣ Robots.txt**

路径：

```
public/robots.txt
```

内容：

```
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap-index.xml
```

---

# **9️⃣ Heading Structure**

页面结构必须规范：

```
H1 页面标题
H2 内容模块
H3 子模块
```

示例：

```
H1 Solar Panel Systems
   H2 Product Advantages
   H2 Installation Process
   H2 Case Studies
```

---

# **🔟 SEO Architecture**

完整 SEO 结构：

```
Page Content
     ↓
SEOHead Component
     ↓
OpenGraph / Twitter
     ↓
Structured Data
     ↓
Sitemap
     ↓
Search Engine Index
```

---

# **Integration Notes**

| Skill                             | 功能            |
| --------------------------------- | ------------- |
| image-management                  | 图片命名          |
| image-media-performance           | 图片加载优化        |
| frontend-performance-optimization | 页面加载性能        |
| sanity-seo-engine                  | SEO 元数据       |
| deployment-cloudflare             | Sitemap 与 CDN |

---




