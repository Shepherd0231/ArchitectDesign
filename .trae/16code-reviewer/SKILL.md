
---

# Trae Skill: code-review-quality

**Name:** `code-review-quality`

**Description:**
对 Astro 网站代码进行系统化审查，确保项目在 **代码质量、性能、可访问性、SEO、组件结构和架构一致性**方面符合最佳实践。
该 Skill 适用于 **功能开发后、组件新增后、提交代码前或部署前**的质量检查。

适用架构：

* Astro Static Site
* Cloudflare Pages
* Cloudflare R2 图片
* Workers + D1 表单系统
* Markdown / CMS 内容系统

---

# Dependencies

| Skill                             | Purpose           |
| --------------------------------- | ----------------- |
| astro-core-setup                  | 项目结构              |
| astro-components                  | UI组件规范            |
| image-management                  | 图片来源              |
| image-media-performance           | 图片性能              |
| frontend-performance-optimization | 前端性能              |
| astro-seo-engine                  | SEO               |
| communication-widgets             | WhatsApp / Social |
| form-handling                     | 表单系统              |

---

# Review Workflow

推荐在以下阶段使用：

1️⃣ 新组件创建后
2️⃣ 新页面开发后
3️⃣ 表单或交互功能增加后
4️⃣ Git 提交前
5️⃣ Cloudflare 部署前

---

# 1️⃣ Astro Best Practices

检查 Astro 组件规范。

Checklist：

* [ ] Props 使用 TypeScript interface
* [ ] 组件保持小型可复用
* [ ] 使用 Slot 提高组件灵活性
* [ ] 静态组件避免 JS
* [ ] 仅在需要时使用 Client Directive

示例：

```typescript
// ❌ Bad
const props = Astro.props;

// ✅ Good
export interface Props {
  title: string;
}

const { title } = Astro.props as Props;
```

---

# 2️⃣ Component Architecture

组件结构必须符合项目标准：

```
src/
  components/
  layouts/
  pages/
```

组件检查：

* [ ] Header / Footer 使用 Layout
* [ ] Hero / Card / CTA 为独立组件
* [ ] FloatingWidget 为独立组件
* [ ] ContactForm 为独立组件

组件必须：

* 单一职责
* 可复用
* 不嵌入业务逻辑

---

# 3️⃣ Performance Review

性能检查：

* [ ] 静态页面无不必要 JS
* [ ] JS 使用 client:visible / client:idle
* [ ] 组件未引入大型依赖
* [ ] Tailwind 未生成冗余 CSS
* [ ] 无未使用的 npm 包

JS 使用示例：

```astro
<ContactForm client:visible />
```

而不是：

```astro
<ContactForm client:load />
```

---

# 4️⃣ Image System Review

图片必须符合图片系统规则。

检查：

* [ ] 图片命名规范
* [ ] alt 文本完整
* [ ] width / height 定义
* [ ] lazy loading
* [ ] R2 URL 正确

错误示例：

```astro
<img src="image.jpg">
```

正确示例：

```astro
<img
 src="https://cdn.example.com/product-window.jpg"
 alt="High quality aluminum window system"
 width="800"
 height="600"
 loading="lazy"
/>
```

---

# 5️⃣ SEO Review

页面必须包含 SEO 数据。

检查：

* [ ] title
* [ ] description
* [ ] canonical
* [ ] OpenGraph
* [ ] Twitter Card

示例：

```astro
<BaseLayout
 title="Aluminum Windows"
 description="High quality aluminum windows for residential buildings"
 image="/images/products/window.jpg"
/>
```

---

# 6️⃣ Accessibility Review

符合 **WCAG 2.1 AA** 标准。

检查：

* [ ] semantic HTML
* [ ] alt 文本
* [ ] aria-label
* [ ] keyboard navigation
* [ ] color contrast

错误示例：

```astro
<div onclick={submitForm}>Submit</div>
```

正确示例：

```astro
<button onclick={submitForm} aria-label="Submit contact form">
Submit
</button>
```

---

# 7️⃣ Communication System Review

检查沟通系统组件。

必须包含：

* WhatsApp Button
* Social Media Links
* Email Link
* Contact Page

检查：

* [ ] FloatingWidget 正常
* [ ] WhatsApp URL 正确
* [ ] 邮件链接使用 mailto
* [ ] 社媒链接打开新窗口

示例：

```html
<a
 href="https://wa.me/1234567890"
 target="_blank"
 rel="noopener"
>
WhatsApp
</a>
```

---

# 8️⃣ Form System Review

表单必须符合 Serverless 架构：

```
Form
 ↓
Cloudflare Worker
 ↓
D1 Database
 ↓
Resend Email
```

检查：

* [ ] 表单字段验证
* [ ] anti-spam
* [ ] API endpoint 正确
* [ ] 成功 / 错误提示

---

# 9️⃣ Code Quality Review

检查代码质量：

* [ ] 无 console.log
* [ ] 变量命名规范
* [ ] 无重复代码
* [ ] 复杂逻辑有注释
* [ ] 组件无冗余依赖

命名规范：

```
PascalCase → Components
camelCase → Variables
kebab-case → Files
```

示例：

```
HeroSection.astro
ProductCard.astro
contact-form.ts
```

---

# 🔟 Project Architecture Review

项目结构必须符合标准：

```
src
 ├ components
 ├ layouts
 ├ pages
 ├ styles
 ├ lib
 └ content
```

public：

```
public
 ├ images
 ├ fonts
 └ icons
```

---

# Integration

该 Skill 与以下模块协作：

| Skill                             | Role |
| --------------------------------- | ---- |
| astro-components                  | UI   |
| image-management                  | 图片   |
| image-media-performance           | 图片性能 |
| frontend-performance-optimization | 前端性能 |
| astro-seo-engine                  | SEO  |
| communication-widgets             | 社媒沟通 |
| form-handling                     | 表单系统 |

---

