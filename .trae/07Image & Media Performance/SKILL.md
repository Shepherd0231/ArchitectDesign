
---

# **Trae Skill: performance-media**

**Name**: `performance-media`
**Description**: 优化 Astro 网站图片和媒体资源，包括响应式图片生成、压缩、Lazy Load、Cloudflare R2/CDN 上传，以及 AI/Unsplash 占位图支持。与 Image Management Skill 联动，实现高性能、快速加载的媒体资源管理。

**依赖**：

* **image-management**：图片生成与占位图
* **astro-components**：Hero、Cards、Floating Widget 等组件
* **Sanity-content-management**：CMS 图片字段映射
* **deployment-guide / R2**：CDN 加速
* **Deployment & Cloudflare / R2**：CDN 加速


---

## **1️⃣ Image Workflow**

### **Step 1: Generate High-Quality Images**

* AI 工具（Midjourney、DALL-E 3、Gemini）或专业素材
* 高分辨率，品牌风格一致，光影自然
* 类型：

  * Hero / Banner
  * Product / Service
  * Team / Staff
  * Blog / Article
  * Icons / UI Elements

### **Step 2: Responsive Versions**

* 宽度：480 / 800 / 1200 / 1920 px
* 文件命名示例：

```text
hero-solar-480.jpg
hero-solar-800.jpg
hero-solar-1200.jpg
hero-solar-1920.jpg
product-1-480.jpg
product-1-800.jpg
product-1-1200.jpg
product-1-1920.jpg
```

* 格式：JPEG / PNG / WebP
* 压缩同时保证清晰度

### **Step 3: Upload to Cloudflare R2**

* **创建 Bucket**

```bash
npx wrangler r2 bucket create site-images
```

* **上传脚本**

```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function uploadImages() {
  const files = readdirSync('./public/images');
  for (const file of files) {
    const content = readFileSync(join('./public/images', file));
    await S3.send(new PutObjectCommand({
      Bucket: 'site-images',
      Key: file,
      Body: content,
      ContentType: 'image/jpeg',
    }));
    console.log(`Uploaded: ${file}`);
  }
}

uploadImages();
```

* **环境变量**

```text
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=site-images
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

### **Step 4: Unsplash API for Placeholder**

* 临时或展示站图片占位：

```javascript
const accessKey = import.meta.env.UNSPLASH_ACCESS_KEY;
const query = "solar panel";
const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}`;
const response = await fetch(url);
const data = await response.json();
const imageUrl = data.urls.full;
```

* 可绑定组件占位图或 CMS URL

### **Step 5: Integration in Astro Components**

```astro
---
const { src, alt, className = '' } = Astro.props;
const base = src.replace(/\.[^/.]+$/, '');
const R2 = import.meta.env.R2_PUBLIC_URL;
---
<picture>
  <source media="(min-width:1200px)" srcset={`${R2}/${base}-1920.jpg`} />
  <source media="(min-width:800px)" srcset={`${R2}/${base}-1200.jpg`} />
  <source media="(min-width:480px)" srcset={`${R2}/${base}-800.jpg`} />
  <img src={`${R2}/${base}-480.jpg`} alt={alt} class={className} loading="lazy" decoding="async" />
</picture>
```

* Hero、ProductCard、BlogCard、Floating Widget 等组件可直接使用

---

## **2️⃣ Page-Specific Guidelines**

| Page Type         | Purpose | Quality Control | Responsive        | Accessibility    |
| ----------------- | ------- | --------------- | ----------------- | ---------------- |
| Hero              | 首页横幅    | 高分辨率、光影自然       | 480/800/1200/1920 | 描述性 alt          |
| Product / Service | 产品展示    | 主题突出、背景干净       | 480/800/1200/1920 | alt 文本           |
| Team / Staff      | 团队展示    | 姿势自然、光影柔和       | 480/800/1200/1920 | alt 文本           |
| Blog / Article    | 内容插图    | 文字可读、图像清晰       | 480/800/1200/1920 | alt 文本           |
| Icons / UI        | 页面交互    | 矢量/高清 PNG，风格统一  | 灵活                | aria-label 或描述文本 |

---

## **3️⃣ Best Practices**

* 图片压缩优化，兼顾质量与大小
* Lazy-load 页面非首屏图片
* 全站图片风格一致
* 占位图可使用 Unsplash API
* 与 R2/CDN 集成，保证快速加载
* 与 Astro Components / Content Skill 联动

---

## **4️⃣ AI Prompt Recommendations**

| Image Type        | Sample Prompt                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| Hero              | Photorealistic hero image, modern architecture or product, cinematic lighting, aligned with brand style |
| Product / Service | Clear product image, clean background, emphasize main subject, professional photography                 |
| Team / Staff      | Team in office, natural/soft lighting, professional poses, diverse group, corporate style               |
| Blog / Article    | Illustrative content image, readable text/data, photorealistic, high resolution                         |
| Icon / UI         | Minimalist vector-style icon, matches site color scheme, high clarity, scalable                         |

---

## **5️⃣ Expected Output**

* 响应式、高质量图片
* 与 R2/CDN 集成
* 支持 AI 或 Unsplash 占位图
* Astro 组件可直接绑定
* 页面特定质量、可访问性和风格一致性

---


