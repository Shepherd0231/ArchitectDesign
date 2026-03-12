

\---



\# \*\*Trae Skill: frontend-performance-optimization\*\*



\*\*Name:\*\* `frontend-performance-optimization`



\*\*Description:\*\*

优化 Astro 网站的整体前端性能，包括 \*\*静态生成、资源压缩、代码分割、缓存策略、预加载策略、Core Web Vitals 优化以及 Cloudflare CDN 加速\*\*。

该 Skill 确保网站在全球访问时具有 \*\*极快加载速度、优秀的 SEO 表现和稳定用户体验\*\*。



\---



\# \*\*Dependencies\*\*



\* \*\*astro-core-setup\*\*

&#x20; 提供 Astro 静态站点基础结构



\* \*\*astro-components\*\*

&#x20; 页面组件需要遵循性能优化规范



\* \*\*image-media-performance\*\*

&#x20; 图片加载优化



\* \*\*deployment-cloudflare\*\*

&#x20; Cloudflare Pages CDN 与缓存策略



\---



\# \*\*1️⃣ Static Site Generation (SSG)\*\*



Astro 默认使用 \*\*静态生成\*\*。



所有页面在构建阶段生成 HTML。



优点：



\* 页面加载速度极快

\* SEO 友好

\* 不需要服务器运行时渲染



\---



\### 页面示例



```astro

\---

import BaseLayout from "../layouts/BaseLayout.astro";

\---



<BaseLayout>

&#x20; <h1>About Us</h1>

</BaseLayout>

```



构建后输出：



```

/dist/about/index.html

```



浏览器访问时无需服务器计算。



\---



\# \*\*2️⃣ Code Splitting\*\*



Astro 默认实现 \*\*按需加载 JavaScript\*\*。



组件只有在需要时才加载 JS。



\---



\### 示例



```astro

import ContactForm from "../components/ContactForm.jsx";



<ContactForm client:load />

```



说明：



| 指令             | 含义       |

| -------------- | -------- |

| client:load    | 页面加载时加载  |

| client:idle    | 浏览器空闲时加载 |

| client:visible | 元素进入视口加载 |



推荐：



```

client:visible

```



适用于：



\* 表单

\* Chat Widget

\* 互动组件



\---



\# \*\*3️⃣ JavaScript Optimization\*\*



原则：



\* 默认 \*\*0 JS\*\*

\* 仅交互组件使用 JS



推荐实践：



避免：



```

大型前端框架

```



优先：



\* 原生 JS

\* 轻量组件



\---



\# \*\*4️⃣ CSS Optimization\*\*



使用 \*\*Tailwind CSS\*\*。



特点：



\* 按需生成 CSS

\* 自动移除未使用样式



\---



\### Tailwind 配置



```js

export default {

&#x20; content: \[

&#x20;   "./src/\*\*/\*.{astro,html,js,jsx,ts,tsx}"

&#x20; ]

};

```



构建时：



```

未使用CSS自动删除

```



\---



\# \*\*5️⃣ Preload Critical Resources\*\*



关键资源提前加载。



在 BaseLayout 中加入：



```html

<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

```



适用于：



\* 字体

\* Hero 图片

\* 首屏 CSS



\---



\# \*\*6️⃣ Font Optimization\*\*



推荐：



\*\*Google Fonts → 本地托管\*\*



示例：



```

/public/fonts/inter.woff2

```



BaseLayout：



```html

<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

```



优点：



\* 避免第三方请求

\* 提升加载速度



\---



\# \*\*7️⃣ Cloudflare CDN Acceleration\*\*



Cloudflare Pages 自动提供：



\* 全球 CDN

\* HTTP/3

\* Brotli 压缩

\* 边缘缓存



静态资源自动缓存：



```

Cache-Control: public, max-age=31536000

```



\---



\# \*\*8️⃣ Resource Compression\*\*



构建时自动压缩：



\* HTML

\* CSS

\* JavaScript



Cloudflare 提供：



\* Brotli

\* Gzip



无需额外服务器配置。



\---



\# \*\*9️⃣ Core Web Vitals Optimization\*\*



目标指标：



| 指标  | 目标      |

| --- | ------- |

| LCP | < 2.5s  |

| CLS | < 0.1   |

| INP | < 200ms |



优化方式：



\* 减少 JS

\* Lazy load 图片

\* 固定图片尺寸

\* 优化字体加载



\---



\# \*\*🔟 Lighthouse Optimization\*\*



目标：



```

Performance ≥ 95

SEO ≥ 95

Accessibility ≥ 95

Best Practices ≥ 95

```



测试工具：



\* Chrome Lighthouse

\* PageSpeed Insights



\---



\# \*\*Integration Notes\*\*



该 Skill 与以下模块协同：



| Skill                             | 作用      |

| --------------------------------- | ------- |

| image-management                  | 图片来源    |

| image-media-performance           | 图片加载优化  |

| frontend-performance-optimization | 前端整体性能  |

| deployment-cloudflare             | CDN 与缓存 |



\---



\# \*\*Performance Architecture\*\*



最终性能结构：



```

Astro Static Site

&#x20;     ↓

Code Splitting

&#x20;     ↓

Optimized CSS (Tailwind)

&#x20;     ↓

Optimized Images

&#x20;     ↓

Cloudflare CDN

&#x20;     ↓

Global Edge Delivery

```



\---



