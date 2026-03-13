## 内容管理（Markdown + JSON + 动态页面生成）

本项目内容体系面向外贸站常见需求：SEO 文章、案例/项目展示、结构化产品目录。支持 Markdown 编辑内容、JSON 结构化数据，并与 SEO、R2 图片与静态生成联动。

### 1) 目录结构

```
src/
  content/
    blog/        # Markdown：文章
    cases/       # Markdown：案例/项目
  data/
    products.json  # JSON：结构化目录（示例：/catalog）
```

### 2) Markdown（文章/案例）

Markdown 位于 `src/content/**`，统一 Frontmatter 字段：

```
title
description
publishDate
coverImage
tags
seo (可选)
```

建议图片字段：
- `coverImage`：支持 `https://...`（Unsplash/R2 公网地址）或 `r2://path/to/image.jpg`
- `coverImageMeta.alt`：为卡片/封面提供更准确的 alt

SEO 可选字段：

```
seo:
  title:
  description:
  image:
  keywords:
  canonical:
  noindex:
```

### 3) JSON（结构化目录）

JSON 文件位于 `src/data/**`，用于批量维护和自动生成页面。

示例：`src/data/products.json` 会生成：
- `/catalog`（列表）
- `/catalog/[slug]`（详情）

字段建议：

```
slug
title
description
image
price (可选)
```

### 4) 图片（R2 集成约定）

当使用 R2 时，推荐在内容里写：
- `r2://blog/xxx-1200.jpg` 或 `r2://products/xxx-1200.jpg`
- 或直接写公开 CDN URL（https://...）

页面与组件会在渲染时将 `r2://` 解析为 `R2_PUBLIC_URL` 下的实际 URL。

