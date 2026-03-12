

# **Trae Skill: tailwind-design**

**用途**：统一网站设计风格、布局、色彩、排版、组件及响应式策略，确保界面一致性与易维护性。

**依赖**：

* **astro-architecture**：使用 BaseLayout 和组件系统作为样式应用目标
* **astro-components**：Tailwind 样式应用到 Card、Button、CTA 等组件
* **Image & Media Performance**：保证 Tailwind 使用原子类高效加载
* **Frontend Performance Optimization**：保证 Tailwind 使用原子类高效加载


---

## **1️⃣ 品牌色彩**

```css
:root {
  --primary-red: #EE0000;
  --dark-bg: #131313;
  --light-bg: #F8F8F8;
  --text-primary: #131313;
  --text-secondary: #666666;
  --white: #FFFFFF;
}
```

* 可根据品牌替换变量
* Tailwind 配置可使用 `theme.extend.colors` 统一管理

---

## **2️⃣ 字体与排版**

```css
/* Tailwind 配置示例 */
theme: {
  extend: {
    fontFamily: {
      heading: ['Poppins', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
  }
}
```

* **Headings**: Poppins / Bold
* **Body**: Roboto / Regular
* **尺寸比例**:

  | Size  | px    |
  | ----- | ----- |
  | Small | 12–14 |
  | Base  | 16    |
  | Large | 18–20 |
  | XL    | 24–32 |
  | 2XL   | 36–48 |
  | 3XL   | 60–72 |

**Tailwind 示例**：

```html
<h1 class="font-heading font-bold text-3xl md:text-4xl lg:text-5xl">Heading</h1>
<p class="font-body text-base md:text-lg">Body text</p>
```

---

## **3️⃣ 间距（Spacing Scale）**

| Size | px | Tailwind |
| ---- | -- | -------- |
| xs   | 4  | p-1      |
| sm   | 8  | p-2      |
| md   | 16 | p-4      |
| lg   | 24 | p-6      |
| xl   | 32 | p-8      |
| 2xl  | 48 | p-12     |
| 3xl  | 64 | p-16     |

---

## **4️⃣ 响应式断点**

| Breakpoint | Width  |
| ---------- | ------ |
| sm         | 640px  |
| md         | 768px  |
| lg         | 1024px |
| xl         | 1280px |
| 2xl        | 1536px |

> Tailwind 前缀示例：`sm:`, `md:`, `lg:` 等

---

## **5️⃣ 常用组件模式**

### Card

```html
<div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
  <!-- Card content -->
</div>
```

### Button Primary

```html
<button class="px-6 py-3 bg-[#EE0000] text-white rounded-full hover:bg-[#CC0000] transition-colors duration-300">
  Primary
</button>
```

### Button Secondary

```html
<button class="px-6 py-3 border-2 border-[#EE0000] text-[#EE0000] rounded-full hover:bg-[#EE0000] hover:text-white transition-all duration-300">
  Secondary
</button>
```

### Container

```html
<div class="max-w-[90rem] mx-auto px-6 lg:px-9">
  <!-- Content -->
</div>
```

### Section Spacing

```html
<section class="py-16 lg:py-28">
  <!-- Section content -->
</section>
```

---

## **6️⃣ 动画工具**

* `transition-all duration-300` – 平滑过渡
* `hover:scale-105` – 悬停缩放
* `animate-pulse` – 脉冲
* `animate-bounce` – 弹跳

---

## **7️⃣ 网格布局（Grid Layouts）**

### 2-Column

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
  <!-- Columns -->
</div>
```

### 3-Column

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  <!-- Columns -->
</div>
```

### 12-Column

```html
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
  <div class="lg:col-span-7"><!-- Main content --></div>
  <div class="lg:col-span-5"><!-- Sidebar --></div>
</div>
```

---

## **8️⃣ Dark / Glass / Gradient Patterns**

### Dark Section

```html
<section class="bg-[#131313] text-white">
  <p class="text-white/60">Secondary text</p>
  <p class="text-white/80">Primary text</p>
</section>
```

### Glass Morphism

```html
<div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl">
  <!-- Glass content -->
</div>
```

### Gradient Overlays

```html
<div class="bg-gradient-to-r from-black via-black/80 to-transparent"></div>
<div class="bg-gradient-to-t from-black via-transparent to-transparent"></div>
```

---

## **9️⃣ Notes**

* 色彩、字体、间距可按品牌替换
* Grid 与 Container 灵活调整
* 响应式支持所有组件
* 动画和渐变增强视觉效果，需适度

---

✅ **输出效果**

* 所有页面和组件保持统一视觉风格
* 与 BaseLayout、组件系统和表单、沟通模块兼容
* Tailwind 原子类高效加载，便于性能优化
* 可直接用于 Trae 自动创建 UI/Design Skill

---

