## 图片资源管理（Image-Management）

本流程仅覆盖“资源管理”：来源、命名、入库、上传与 CMS 字段记录。图片加载与性能优化由 image-media-performance 负责。

### 1) 图片来源工作流

#### AI 生成
- 适用：Hero、Blog 插图、概念方案图、Banner
- 建议记录：工具、Prompt、出图参数、是否可商用、是否需要二次修图
- 落地：将最终可用的“发布图”统一命名后进入上传流程

#### 专业素材/实拍
- 适用：案例实景、团队、人像、产品/材料细节
- 建议记录：来源平台/摄影师、授权类型、原始链接、购买凭证编号（如有）

#### Unsplash 占位图（演示站）
- 适用：在无真实素材时占位，快速搭建展示站
- 建议记录：Unsplash photo id、作者/链接、下载链接（用于归因）

### 2) 命名规范

统一命名格式：

```
page-type-topic-size.format
```

示例（建筑设计站）：

```
hero-architecture-studio.jpg
case-villa-minimal-1200.jpg
case-commercial-urban-1200.jpg
blog-light-shadow-1200.jpg
team-studio.jpg
icon-whatsapp.svg
```

多尺寸建议：

```
hero-architecture-480.jpg
hero-architecture-800.jpg
hero-architecture-1200.jpg
hero-architecture-1920.jpg
```

规则建议：
- 全小写、用 `-` 连接，不用空格和中文
- size 为像素宽度（如 1200/1920），用于区分版本
- 素材原图不直接发布，发布图统一走命名与上传

### 3) Cloudflare R2 上传流程

目录建议：
- 本地发布图：`public/images/**`
- R2 Key 建议与本地路径一致：`images/...`

环境变量（本地 .env，不要提交）：

```
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=site-images
R2_PUBLIC_URL=https://pub-xxx.r2.dev
R2_PREFIX=images
```

### 4) CMS（Sanity）图片字段记录规范

Sanity 侧建议同时支持两种输入：
- `coverImage`（Sanity Asset）：适合 Studio 内直接上传
- `coverImageUrl`（URL）：适合 R2/Unsplash/外链

配套元数据字段：
- `coverImageMeta.sourceType`：sanity/r2/unsplash/ai/stock/photo/external
- `coverImageMeta.alt`：可访问性与 SEO 必填
- `coverImageMeta.sourceName/sourceUrl/license/credit`：版权与归因
- `coverImageMeta.r2Key/unsplashId/aiTool/aiPrompt`：追溯与维护

页面 Section 亦提供 `image/imageUrl/imageMeta`，用于可复用区块的统一图片记录。

### 5) 占位图（Unsplash）使用方式

用于快速生成可追溯的占位图 URL 和归因信息：
- 使用脚本 `npm run images:unsplash -- --query "architecture minimal"` 获取 URL 与作者信息
- 将 URL 写入 `coverImageUrl`，并填写 `coverImageMeta.unsplashId/sourceUrl/credit/license`

