

# **Trae Skill: astro-components **

**用途**：提供可复用、模块化、响应式 Astro UI 组件，包括 Sections、ProductCard、BlogCard、Button、Container 和 Floating Widget，支持 props 驱动、布局组合和 Trae 管理。

**依赖**：

* **tailwind-design**：统一样式
* **astro-architecture**：目录结构和 BaseLayout
* **Content Management**：动态内容绑定
* **Form Handling Skill**：浮窗可触发表单或消息
* **Communication-Social**：浮窗可触发表单或消息
---

## **1️⃣ 组件目录结构**

```text id="x4e39h"
src/
  components/
    sections/
      Hero.astro
      Features.astro
      CTA.astro
      FAQ.astro
      Testimonials.astro
    cards/
      ProductCard.astro
      BlogCard.astro
    ui/
      Button.astro
      Container.astro
      SectionTitle.astro
      FloatingWidget.astro
```

---

## **2️⃣ Sections**

### **Hero Section**

`src/components/sections/Hero.astro`

```astro
---
const { title, subtitle, image } = Astro.props;
---
<section class="hero">
  <div class="container">
    <h1>{title}</h1>
    <p>{subtitle}</p>
    {image && (
      <img src={image} alt={title} loading="lazy" decoding="async" />
    )}
  </div>
</section>
```

### **其他 Sections**

* Features.astro / CTA.astro / FAQ.astro / Testimonials.astro
* Props 驱动内容，响应式布局

---

## **3️⃣ Cards**

### **Product Card**

`src/components/cards/ProductCard.astro`

```astro
---
const { product } = Astro.props;
---
<article class="product-card">
  <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
  <h2>{product.title}</h2>
  <p>{product.description}</p>
</article>
```

### **Blog Card**

`src/components/cards/BlogCard.astro`

```astro
---
const { post } = Astro.props;
---
<article class="blog-card">
  <h2>{post.title}</h2>
  <p>{post.excerpt}</p>
  <a href={post.url}>Read more</a>
</article>
```

---

## **4️⃣ UI 元素**

### **Button**

`src/components/ui/Button.astro`

```astro
---
const { label, href, type = "primary" } = Astro.props;
---
{href ? (
  <a href={href} class={`btn btn-${type}`}>{label}</a>
) : (
  <button class={`btn btn-${type}`}>{label}</button>
)}
```

### **Container**

`src/components/ui/Container.astro`

```astro
---
const { className = "", children } = Astro.props;
---
<div class={`container ${className}`}>
  <slot />
</div>
```

### **Section Title**

* Props: `title`, `subtitle`
* 支持响应式、Tailwind 样式

---

## **5️⃣ Floating Widget (沟通浮窗)**

`src/components/ui/FloatingWidget.astro`

```astro
---
const { icon, position = "bottom-right", channels = [], collapsed = false, theme = "light" } = Astro.props;
---
<div class={`floating-widget ${position} ${theme}`}>
  <button class="widget-toggle">
    <img src={icon} alt="Contact"/>
  </button>
  <div class={`widget-channels ${collapsed ? "hidden" : ""}`}>
    {channels.map(channel => (
      <a href={channel.url} target="_blank" class={`channel channel-${channel.type}`}>
        {channel.type}
      </a>
    ))}
  </div>
</div>
```

**Props**：

* `icon` (图标路径)
* `position` (bottom-right / bottom-left)
* `channels` ([{ type, url }])
* `collapsed` (boolean)
* `theme` (light / dark)

**样式示例**（Tailwind）

```css
.floating-widget { @apply fixed p-2 rounded-full shadow-lg z-50; }
.bottom-right { @apply bottom-6 right-6; }
.bottom-left { @apply bottom-6 left-6; }
.widget-toggle { @apply bg-primary-red text-white p-3 rounded-full shadow-md; }
.widget-channels { @apply mt-2 flex flex-col gap-2; }
.channel-whatsapp { @apply bg-green-500 text-white p-2 rounded-lg; }
.channel-email { @apply bg-blue-500 text-white p-2 rounded-lg; }
.channel-facebook { @apply bg-blue-700 text-white p-2 rounded-lg; }
```

---

## **6️⃣ 组件组合示例**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/sections/Hero.astro";
import Features from "../components/sections/Features.astro";
import CTA from "../components/sections/CTA.astro";
import ProductCard from "../components/cards/ProductCard.astro";
import FloatingWidget from "../components/ui/FloatingWidget.astro";
import products from "../data/products.json";
---

<BaseLayout>
  <Hero title="Welcome to SolarCo" subtitle="High-quality solar solutions" image="/images/hero-solar.jpg" />
  <Features />

  <section class="products">
    {products.map(product => <ProductCard product={product} />)}
  </section>

  <CTA />

  <FloatingWidget 
    icon="/images/icons/chat.svg"
    channels={[
      { type: "whatsapp", url: "https://wa.me/1234567890" },
      { type: "email", url: "mailto:contact@company.com" }
    ]}
  />
</BaseLayout>
```

---

## **7️⃣ 设计原则 & Best Practices**

* 每个组件 **独立、可复用**
* 使用 `<slot />` 保持灵活性
* 图片/媒体 **懒加载** 提升性能
* **Props 驱动**内容
* 响应式、移动优先
* 单组件 50–150 行，便于 Trae 批量更新

---

✅ **输出效果**

* Sections、Cards、UI 元素、Floating Widget 完整可用
* 与 Tailwind、BaseLayout、Content、Form、Communication Skills 整合
* 支持 Trae 一键生成和管理组件体系

---


