
```
---
name: "astro-content-management"
description: "Manages structured and editorial content for Astro foreign-trade websites. Supports Markdown articles, JSON structured data, and scalable content architecture integrated with SEO, R2 image storage, and dynamic page generation."
---
```

# Astro Content Management Skill

This skill manages **all website content** for Astro-based foreign trade websites.

It ensures content is:

* structured
* scalable
* SEO-optimized
* compatible with Astro static generation
* integrated with the site architecture

Content types supported:

* Markdown editorial content
* JSON structured data
* dynamic programmatic pages

---

# 1 Content Types

The website uses **two main content systems**.

| Content Type | Usage                            |
| ------------ | -------------------------------- |
| Markdown     | Blog / Articles / Case Studies   |
| JSON Data    | Products / Services / Categories |

This combination allows:

* scalable page generation
* SEO optimization
* easy content maintenance

---

# 2 Content Directory Structure

Content is organized inside the **src directory**.

```
src/
  content/
    blog/
    case-studies/
    news/
  data/
    products.json
    services.json
    categories.json
```

Purpose:

| Directory    | Purpose                 |
| ------------ | ----------------------- |
| blog         | SEO articles            |
| case-studies | client success stories  |
| news         | company updates         |
| data         | structured site content |

---

# 3 Markdown Content

Markdown is used for **long-form editorial content**.

Typical use cases:

* blog posts
* tutorials
* industry insights
* case studies

Example file:

```
src/content/blog/solar-energy-trends.md
```

Frontmatter structure:

```yaml
---
title: "Solar Energy Trends in 2025"
description: "Latest trends in solar energy technology and market growth."
date: "2025-02-10"

image: "r2://blog/solar-energy-trends.webp"

author: "Admin"

tags:
  - solar
  - energy
  - renewable

category: "industry-insight"
---
```

Content guidelines:

* use clear headings (`#`, `##`, `###`)
* keep paragraphs readable
* use SEO keywords naturally
* include internal links when relevant

---

# 4 Image Management

Images follow the **Image Management Skill**.

Rules:

* images stored in **Cloudflare R2**
* use CDN URLs in Markdown
* filenames should be descriptive

Example:

```
https://cdn.example.com/blog/solar-energy-trends.webp
```

Avoid storing large images inside the repository.

---

# 5 JSON Structured Data

JSON files define **structured site content**.

Typical data types:

| Data File       | Usage              |
| --------------- | ------------------ |
| products.json   | product pages      |
| services.json   | service pages      |
| categories.json | product grouping   |
| locations.json  | SEO location pages |

Example product data:

```json
[
  {
    "slug": "aluminum-window-frame",
    "title": "Aluminum Window Frame",
    "description": "Durable aluminum window frame for modern buildings",
    "image": "r2://products/aluminum-window-frame.webp",
    "category": "windows"
  }
]
```

Advantages:

* easier batch editing
* dynamic page generation
* scalable product catalog

---

# 6 Dynamic Page Generation

JSON data can generate pages automatically.

Example:

```
/products/[slug]
```

Astro implementation:

```astro
---
import products from "../../data/products.json";

export async function getStaticPaths() {
  return products.map(product => ({
    params: { slug: product.slug },
    props: { product }
  }));
}

const { product } = Astro.props;
---
```

Benefits:

* scalable product pages
* consistent layouts
* easy SEO optimization

---

# 7 Content Creation Rules

All content must follow these rules.

1. **Unique slug**

Avoid duplicate page routes.

2. **Consistent field names**

Use the same keys across files.

Example:

```
slug
title
description
image
category
```

3. **SEO-friendly titles**

Avoid generic titles.

4. **Descriptive image names**

Example:

```
aluminum-window-frame.webp
```

5. **Structured tags**

Tags should be reusable.

---

# 8 SEO Integration

Content integrates with the **SEO Skill**.

Key elements:

| Element     | Purpose            |
| ----------- | ------------------ |
| title       | page title         |
| description | meta description   |
| image       | social preview     |
| tags        | internal filtering |

All Markdown pages should provide these fields.

---

# 9 Trae Content Automation

When invoked, this skill allows Trae to:

* generate new blog articles
* add product entries
* create case study pages
* update JSON data safely

Trae ensures:

* proper folder placement
* valid frontmatter
* consistent naming conventions

---

# 10 Scaling Strategy

The system supports **large content expansion**.

Typical scale:

| Content Type | Estimated Pages |
| ------------ | --------------- |
| Blog         | 50-300          |
| Products     | 10-200          |
| Case Studies | 5-50            |

Astro static generation ensures:

* fast page load
* low server cost
* high SEO performance

---

# 11 Recommended Content Types for B2B Sites

For foreign trade websites:

| Content Type  | Purpose         |
| ------------- | --------------- |
| Blog          | SEO traffic     |
| Case Study    | build trust     |
| Product pages | lead generation |
| News          | brand updates   |

---

# 12 Summary

This skill manages all website content in a structured way.

It ensures:

* scalable content architecture
* consistent Markdown and JSON structure
* integration with SEO and image systems
* compatibility with Astro static generation
* easy automation via Trae

The result is a **high-performance, SEO-ready content system** for Astro websites.

---




