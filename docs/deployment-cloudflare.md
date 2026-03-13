## Cloudflare Pages 部署指南（含 R2/CDN、D1 表单、边缘缓存与多语言）

目标：低维护、可扩展、高性能的外贸站部署方案。使用 Cloudflare Pages 托管静态站点，Pages Functions 提供表单服务，R2 作为图片 CDN，D1 作为表单数据库，结合 HTTP 缓存与多语言优化。

### 1) 站点构建与产物
- Astro 输出为 `dist/` 静态站点
- 已启用多语言与尾斜杠：`/`、`/en/`、`/es/` 路径均生成
- `_routes.json` 限制函数入口：仅 `/api/*` 走 Functions，其余全静态

### 2) 环境变量

在 Cloudflare Pages 项目设置中配置：
- 基础
  - `SITE_URL`：站点 URL（例如 `https://example.com`）
  - `PUBLIC_MEDIA_WEBP`：是否输出 webp 变体（默认 `true`）
- Sanity（可选）
  - `PUBLIC_SANITY_PROJECT_ID`、`PUBLIC_SANITY_DATASET`、`PUBLIC_SANITY_API_VERSION`、`PUBLIC_SANITY_USE_CDN`
  - `SANITY_API_TOKEN`（仅需服务端写/读）
- R2 图片 CDN（推荐）
  - `R2_PUBLIC_URL`：R2 Bucket 的公网访问域名（自定义域或官方域）
  - `R2_PREFIX`：资源前缀（示例：`images`）
- Resend 邮件（表单通知）
  - `RESEND_API_KEY`、`RESEND_FROM`、`RESEND_TO`、`RESEND_REPLY_ENABLED`

本地开发使用 `.dev.vars`（参考 `.dev.vars.example`），预览使用 `npm run pages:dev`。

### 3) 图片集成与命名规范
- 内容中图片字段支持：
  - `https://images.unsplash.com/...` → 自动生成响应式 srcset
  - `r2://products/xxx-1200.jpg` → 自动解析到 `R2_PUBLIC_URL/products/xxx-1200.jpg`
  - 纯 URL 无尺寸后缀时，按原图直出，避免生成不存在的变体
- 未配置 R2 或图片缺失时，自动使用 `/images/placeholder.svg` 兜底

### 4) 表单与数据库
- 入口：`/api/forms/contact`（Pages Functions）
- D1 数据库绑定：`FORMS_DB`
  - 在 Pages 的 **Settings → Functions → D1** 添加绑定名 `FORMS_DB` 指向你的数据库
  - 运行迁移（本地开发示例）：`npm run d1:local`
- 速率限制、防垃圾字段（`company` 蜜罐）、中英回复邮件均已内置

### 5) HTTP 缓存与 Headers
- `public/_headers` 已设置：
  - `/assets/*`, `/images/*`, `/fonts/*`, `/*.css`, `/*.js` → `Cache-Control: public, max-age=31536000, immutable`
  - `/*` → `Cache-Control: public, max-age=0, must-revalidate`
  - `/api/*` → `Cache-Control: no-store`
- BaseLayout 预连接：R2/Unsplash/Sanity
- i18n：canonical + hreflang + og:locale 已生成

### 6) Cloudflare Pages 配置建议
- Build 命令：`npm run build`；输出目录：`dist`
- Pages Functions：默认路径 `functions/**`（已放置表单处理）
- 路由控制：使用 `_routes.json` 仅启用 `/api/*` 的函数路由，减少冷启动和边缘执行成本
- 绑定与变量：在 Pages 控制台配置 D1、环境变量、敏感密钥（不要提交到仓库）

### 7) R2 建议
- 建桶、绑定自定义域（HTTPS）
- 按命名规范生成多尺寸文件（如 `file-480.jpg, file-800.jpg, file-1200.jpg, file-1920.jpg`）
- 上传脚本参考：`scripts/images/r2-upload.mjs`

### 8) 多语言与静态优化
- `astro.config.mjs` 已启用 `trailingSlash: "always"` 与内置 i18n
- 目录式 i18n 路由（`/en/`, `/es/`），可与 SEO 交叉验证
- sitemap 集成（当设置 `SITE_URL` 时自动启用）

### 9) 预览与验证
- 本地预览 Pages Functions：`npm run pages:dev`（读取 `.dev.vars`）
- 验证 checklist：
  - [ ] en/es 路由正常，语言切换不 404
  - [ ] 表单提交写入 D1，并收到邮件通知
  - [ ] R2 图片直出或响应式 srcset正常，缺失图显示占位图
  - [ ] Headers 生效：静态资源长期缓存，HTML 可重新验证，API 不缓存
  - [ ] sitemap 包含所有语言 URL

