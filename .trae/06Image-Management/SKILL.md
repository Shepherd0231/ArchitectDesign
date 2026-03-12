
---

# **Trae Skill: image-management**

**Name:** `image-management`

**Description:**
管理网站图片资源，包括 **AI生成、素材来源、Cloudflare R2上传、命名规范、CMS图片字段管理以及Unsplash API占位图**。
该 Skill 只负责 **图片资源管理流程**，图片加载优化由 `image-media-performance` 处理。

---

# **Dependencies**

* **astro-components**
  Hero、ProductCard、BlogCard、Team、FloatingWidget 等组件使用图片

* **astro-content-management**
  CMS 中图片字段与 R2 URL 或 Unsplash URL 映射

* **image-media-performance**
  图片加载优化（srcset、lazy、WebP、CDN）

---

# **1️⃣ Image Source Workflow**

## Step 1: Image Creation

图片来源可以是：

### AI生成

常用工具：

* Midjourney
* DALL·E
* Gemini
* 豆包
* Stable Diffusion

适合：

* Hero
* Blog插图
* 产品概念图
* Banner

---

### 专业素材

来源：

* 产品实拍
* 企业照片
* Shutterstock
* Envato
* Pexels

适合：

* 产品图
* 工厂图
* 团队照片

---

### Unsplash API（展示站）

如果没有素材，可使用 **Unsplash API 自动获取占位图**。

示例：

```js
const accessKey = import.meta.env.UNSPLASH_ACCESS_KEY;

const query = "solar panel";

const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}`;

const response = await fetch(url);
const data = await response.json();

const imageUrl = data.urls.regular;
```

适用于：

* Blog
* 服务页
* 示例产品
* 演示站

---

# **2️⃣ Image Naming Convention**

统一命名规则：

```
page-type-topic-size.format
```

示例：

```
hero-solar-energy.jpg
product-aluminum-window.jpg
team-office.jpg
blog-ai-manufacturing.jpg
icon-whatsapp.svg
```

如果需要多尺寸：

```
hero-solar-480.jpg
hero-solar-800.jpg
hero-solar-1200.jpg
hero-solar-1920.jpg
```

---

# **3️⃣ Upload to Cloudflare R2**

创建 Bucket：

```bash
npx wrangler r2 bucket create site-images
```

---

### 上传脚本示例

```javascript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function uploadImages() {
  const files = readdirSync("./public/images");

  for (const file of files) {
    const content = readFileSync(join("./public/images", file));

    await S3.send(
      new PutObjectCommand({
        Bucket: "site-images",
        Key: file,
        Body: content,
        ContentType: "image/jpeg",
      })
    );

    console.log(`Uploaded: ${file}`);
  }
}

uploadImages();
```

---

### 环境变量

```
R2_ACCESS_KEY_ID=your_key
R2_SECRET_ACCESS_KEY=your_secret
R2_BUCKET_NAME=site-images
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

---

# **4️⃣ CMS Image Integration**

CMS（如 Sanity）图片字段：

```
{
  name: "image",
  type: "url",
  title: "Image URL"
}
```

数据来源：

* R2 URL
* Unsplash URL

示例：

```
https://pub-xxx.r2.dev/product-window.jpg
```

---

# **5️⃣ Page Image Guidelines**

| Page     | Image Type | Requirement |
| -------- | ---------- | ----------- |
| Homepage | Hero       | 高分辨率横幅      |
| Product  | 产品图        | 背景干净        |
| Service  | 服务图        | 场景化         |
| Team     | 人像         | 光线自然        |
| Blog     | 插图         | 内容相关        |
| UI       | Icon       | SVG优先       |

---

# **6️⃣ AI Prompt Examples**

| Image Type | Prompt                                                           |
| ---------- | ---------------------------------------------------------------- |
| Hero       | photorealistic industrial factory hero image, cinematic lighting |
| Product    | professional product photography, clean background               |
| Team       | professional team photo, natural lighting                        |
| Blog       | modern illustration about manufacturing technology               |
| Icon       | minimalist vector icon                                           |

---

# **Integration Notes**

本 Skill 只负责 **图片资源管理**：

| Skill                   | 负责内容      |
| ----------------------- | --------- |
| image-management        | 图片来源与R2管理 |
| image-media-performance | 图片加载性能    |
| frontend-performance    | 全站性能      |

---


