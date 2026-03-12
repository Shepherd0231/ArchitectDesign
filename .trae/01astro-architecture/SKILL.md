**name**: `astro-architecture`
    
- **description**: 定义 Astro 网站推荐架构，包括项目目录、布局层级、组件组织和数据驱动页面模式。优化 Cloudflare Pages 部署和静态内容管理（Markdown/JSON）。
    
- **目标**: 为后续 CMS、表单、SEO、性能优化、沟通模块提供标准化基础和可扩展结构。
    

---

### **1️⃣ 项目目录结构**

```text
src/
  components/     → 可复用组件
  layouts/        → 全局布局模板
  pages/          → 页面与路由
  data/           → JSON 数据
  content/        → Markdown 内容
  styles/         → 全局样式

public/
  images/         → 静态图片
  icons/          → 图标

astro.config.mjs
package.json
```

- **依赖关系**：
    
    - **CSS**：全局样式在 `styles/`，组件样式在 `components/`。
        
    - **SEO**：布局和页面结构决定 meta 标签位置。
        
    - **CMS**：内容目录 `content/` 和 `data/` 是内容管理系统的数据源。
        
    - **表单**：表单组件放在 `components/`。
        
    - **性能优化**：静态页面结构和图片存储位置影响懒加载和 CDN 迁移。
        
    - **沟通模块**：导航栏或浮窗组件放在 `components/`。
        

---

### **2️⃣ 布局系统**

- **推荐位置**: `src/layouts/BaseLayout.astro`
    
- **内容**:
    

```astro
---
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
---

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<slot name="head" />
</head>
<body>
<Header />
<main><slot /></main>
<Footer />
</body>
</html>
```

- **说明**：
    
    - `Header` 和 `Footer` 可以包含导航、SEO meta、社媒/WhatsApp/Email 按钮。
        
    - 通过 `<slot />` 支持页面插入自定义内容。
        
- **依赖关系**：
    
    - **SEO Skill**：meta 标签与结构化数据注入。
        
    - **沟通模块**：浮窗按钮或导航入口。
        
    - **Performance**：布局优化、减少阻塞 JS。
        

---

### **3️⃣ 页面组织**

```text
src/pages/
  index.astro
  about.astro
  contact.astro
  products/
    index.astro
    [slug].astro
  blog/
    index.astro
    [slug].astro
```

- **原则**：
    
    - 保持 URL 清晰 `/products/product-name`。
        
    - 动态页面使用 `[slug].astro`，内容由 JSON 或 CMS 驱动。
        
- **依赖**：
    
    - **CMS**：内容管理数据。
        
    - **SEO**：页面结构决定 canonical URL。
        
    - **表单**：Contact 页可嵌入表单组件。
        
    - **Performance**：静态渲染优先。
        

---

### **4️⃣ 数据管理**

- **JSON 数据**: `src/data/`
    

```json
[
  {
    "slug": "solar-panel-system",
    "title": "Solar Panel System",
    "description": "High efficiency solar panel system",
    "image": "/images/products/solar-panel.jpg"
  }
]
```

- **Markdown 内容**: `src/content/blog/`
    

```markdown
---
title: Solar Installation Guide
description: Complete solar installation guide
date: 2025-01-01
image: /images/blog/solar-guide.jpg
---
Content goes here.
```

- **依赖**：
    
    - **CMS Skill**：同步和管理 JSON/Markdown。
        
    - **SEO Skill**：根据 frontmatter 自动生成 meta 标签。
        
    - **Image Management**：图片路径管理，方便后期 R2 CDN 迁移。
        

---

### **5️⃣ 组件系统**

- **位置**: `src/components/`
    
- **示例**：
    

```text
Header.astro
Footer.astro
ProductCard.astro
BlogCard.astro
CTA.astro
Form.astro
```

- **原则**：
    
    - 小而复用，避免页面逻辑混入组件。
        
    - 支持 props 驱动、响应式设计。
        
- **依赖**：
    
    - **CSS/UI Skill**：组件样式统一。
        
    - **表单 Skill**：表单组件调用。
        
    - **沟通模块**：Header/Footer 内的社媒/WhatsApp/Email 按钮。
        

---

### **6️⃣ 图片与资源管理**

- **位置**: `public/images/`
    
- **示例结构**：
    

```text
products/
blog/
hero/
icons/
```

- **命名规范**: 使用描述性文件名，如 `solar-panel-installation.jpg`
    
- **依赖**：
    
    - **Image Management Skill**：后续迁移到 R2 CDN。
        
    - **Performance**：优化图片加载、懒加载。
        
    - **SEO**：图片 alt 属性与结构化数据。
        

---

### **7️⃣ 样式管理**

- **位置**: `src/styles/`
    
- **文件示例**：
    

```text
global.css
layout.css
components.css
```

- **依赖**：
    
    - **UI & Design Skill**：Tailwind 配置。
        
    - **Performance**：减少全局 CSS 冗余。
        

---

### **8️⃣ 内部链接与路由原则**

- **示例结构**：
    

```text
Home → Products → Product Detail
     → Blog → Article
     → Contact
```

- **原则**：
    
    - SEO友好、URL清晰
        
    - 避免深层嵌套
        
- **依赖**：
    
    - **SEO Skill**：URL 与 sitemap 自动生成。
        

---

### **9️⃣ 性能与最佳实践**

- **原则**：
    
    - 优先静态页面
        
    - JS 最小化，懒加载图片
        
    - 使用 Astro islands 或 partial hydration 仅在必要时
        
- **依赖**：
    
    - **Performance Skill**：后续优化 JS/CSS、缓存策略
        
    - **Image Management**：图片优化
        

---

### **10️⃣ 输出结果**

生成的项目必须：

1. 遵循推荐目录结构
    
2. 使用 BaseLayout 布局系统
    
3. 页面按逻辑分区组织
    
4. 支持 JSON 数据驱动动态页面
    
5. 支持 Markdown 内容
    
6. 图片存放在 `public/images`
    
7. 保持兼容 Astro 静态构建
    
8. 可扩展 CMS、表单、沟通模块、SEO 与性能优化