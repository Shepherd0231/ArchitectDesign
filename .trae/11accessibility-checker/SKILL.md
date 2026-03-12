

# Trae Skill: accessibility-checker

**Name:** `accessibility-checker`

**Description:**
用于审查 Astro 网站组件与页面的可访问性，确保符合 **WCAG 2.1 Level AA 标准**。
该 Skill 会检查 **语义 HTML、颜色对比度、ARIA 属性、键盘导航、图片可访问性、表单可访问性以及交互组件**，确保网站对所有用户（包括辅助技术用户）可用。

适用架构：

* Astro Static Site
* Cloudflare Pages
* Tailwind CSS UI
* R2 图片系统
* Floating Communication Widget
* Serverless Form System

---

# Dependencies

| Skill                             | Purpose  |
| --------------------------------- | -------- |
| astro-components                  | UI组件     |
| image-management                  | 图片命名与alt |
| image-media-performance           | 图片属性     |
| frontend-performance-optimization | 页面结构     |
| astro-seo-engine                  | 页面语义结构   |
| Communication-Social            | 聊天与社媒组件  |
| form-handling skill               | 表单系统     |

---

# Usage Stage

建议在以下阶段使用：

1️⃣ 组件开发完成后
2️⃣ 页面开发完成后
3️⃣ 表单功能增加后
4️⃣ 网站发布前审计

---

# WCAG Compliance Levels

| Level     | Meaning    |
| --------- | ---------- |
| Level A   | 基础可访问性     |
| Level AA  | 标准合规（推荐目标） |
| Level AAA | 高级可访问性     |

目标：

```
WCAG 2.1 Level AA
```

---

# 1️⃣ Color Contrast

文本必须满足对比度要求：

| 类型            | AA    | AAA   |
| ------------- | ----- | ----- |
| Normal text   | 4.5:1 | 7:1   |
| Large text    | 3:1   | 4.5:1 |
| UI Components | 3:1   | —     |

Tailwind 示例：

```css
:root {
  --primary-red: #EE0000;
  --white: #FFFFFF;
  --dark: #131313;
}

.text-primary {
  color: var(--primary-red);
}

.text-white {
  color: var(--white);
  background-color: var(--dark);
}
```

必须检查：

* Hero 文本
* CTA 按钮
* 表单标签
* Footer 链接

---

# 2️⃣ Semantic HTML

必须使用语义标签。

推荐结构：

```html
<header>
<nav>
</nav>
</header>

<main>

<section>
<h1>Page Title</h1>
</section>

<section>
<h2>Product Features</h2>
</section>

</main>

<footer>
</footer>
```

规则：

* 页面只能有一个 **H1**
* H1 → H2 → H3 层级清晰

---

# 3️⃣ Image Accessibility

所有信息型图片必须包含 **alt 文本**。

示例：

```html
<img
 src="https://cdn.example.com/solar-panel.jpg"
 alt="Solar panel installation on residential roof"
 width="800"
 height="600"
 loading="lazy"
/>
```

装饰图片：

```html
<img src="/images/pattern.svg" alt="">
```

复杂图表：

```html
<figure>

<img src="chart.jpg" alt="Energy savings over 5 years">

<figcaption>
Energy savings increased by 40% annually
</figcaption>

</figure>
```

必须检查：

* Product images
* Blog images
* Hero images

---

# 4️⃣ Form Accessibility

表单必须符合可访问性规范。

示例：

```html
<form>

<label for="email">Email Address *</label>

<input
 type="email"
 id="email"
 name="email"
 required
 aria-required="true"
/>

<span id="email-error" class="error" role="alert"></span>

<button type="submit" aria-label="Submit contact form">
Submit
</button>

</form>
```

检查：

* label 与 input 绑定
* required 属性
* 错误提示
* 键盘可访问

适用于：

* Contact Form
* Quote Form
* Inquiry Form

---

# 5️⃣ Interactive Elements

交互元素必须使用正确标签。

错误：

```html
<div onclick="submitForm()">Submit</div>
```

正确：

```html
<button onclick="submitForm()" aria-label="Submit form">
Submit
</button>
```

检查：

* CTA Buttons
* Floating Widget
* Navigation Menu
* Form Buttons

---

# 6️⃣ Focus Indicators

所有可交互元素必须有 **可见焦点状态**。

示例：

```css
:focus-visible {
  outline: 2px solid #EE0000;
  outline-offset: 2px;
}
```

---

# 7️⃣ Skip Links

页面必须提供 **跳过导航链接**。

示例：

```html
<a href="#main-content" class="skip-link">
Skip to main content
</a>
```

CSS：

```css
.skip-link {
 position: absolute;
 top: -40px;
 left: 0;
 background: #EE0000;
 color: white;
 padding: 8px;
}

.skip-link:focus {
 top: 0;
}
```

---

# 8️⃣ ARIA Usage

用于复杂组件。

示例：

导航：

```html
<nav aria-label="Main navigation">
```

按钮：

```html
<button aria-label="Close menu">
```

动态内容：

```html
<div aria-live="polite">
```

---

# 9️⃣ Keyboard Navigation

所有交互组件必须支持键盘。

检查：

* Tab 顺序正确
* 无 keyboard trap
* 表单可提交
* 菜单可展开

示例：

```html
<a href="#">First</a>

<button>Second</button>

<input type="text">
```

---

# 🔟 Accessibility Testing Tools

自动检测：

* Lighthouse
* axe DevTools
* WAVE

手动检测：

* 键盘导航
* Screen Reader（NVDA / VoiceOver）
* 200% 页面缩放
* Color contrast

---

# Accessibility Checklist

### Perceivable

* [ ] 图片 alt 文本
* [ ] 视频字幕
* [ ] 颜色不是唯一信息来源
* [ ] 文本可放大 200%

---

### Operable

* [ ] 键盘可操作
* [ ] 无键盘陷阱
* [ ] Skip Link
* [ ] 可见焦点

---

### Understandable

* [ ] 页面语言声明
* [ ] 表单错误提示清晰
* [ ] 导航一致

---

### Robust

* [ ] HTML 有效
* [ ] ARIA 正确
* [ ] 兼容辅助技术

---

# Integration

该 Skill 与以下模块协作：

| Skill                             | Purpose  |
| --------------------------------- | -------- |
| astro-components                  | UI组件     |
| image-management                  | 图片命名与alt |
| image-media-performance           | 图片属性     |
| frontend-performance-optimization | 页面结构     |
| astro-seo-engine                  | 页面语义结构   |
| Communication-Social            | 聊天与社媒组件  |
| form-handling skill               | 表单系统     |

---

# Expected Result

执行该 Skill 后：

网站将达到：

```
WCAG 2.1 Level AA
```

同时在 Lighthouse 中达到：

```
Accessibility ≥ 95
```

---

