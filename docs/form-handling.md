## 表单处理（Cloudflare Pages Functions + D1 + Resend）

本项目的表单使用 Cloudflare Pages Functions 实现服务端提交，数据写入 D1，并用 Resend 发送邮件通知。

### 1) 路由

- Contact：`POST /api/forms/contact`
- Functions 代码：`functions/api/forms/contact.ts`

### 2) D1 数据库

迁移文件：
- `migrations/0001_create_submissions.sql`

本地迁移（需要 wrangler）：

```bash
npm run d1:local
```

线上创建与迁移：

```bash
wrangler d1 create forms-db
wrangler d1 migrations apply forms-db
```

然后把 `wrangler d1 create` 输出的 `database_id` 写入 `wrangler.toml` 的 `database_id`。

### 3) Resend 通知

在 Cloudflare Pages / 本地 wrangler 环境变量中配置：

- `RESEND_API_KEY`
- `RESEND_FROM`
- `RESEND_TO`
- `RESEND_REPLY_ENABLED`（可选，默认 true）

本地开发建议复制：
- `.dev.vars.example` → `.dev.vars`

### 4) 本地开发（包含 Functions）

`astro dev` 不会运行 Pages Functions。使用：

```bash
npm run pages:dev
```

该命令会先构建站点，再用 `wrangler pages dev` 启动静态站点 + Functions。

