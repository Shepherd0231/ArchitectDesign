
# **Trae Skill: astro-content-management / sanity-content-management**

**用途**：管理和维护网站内容，支持多内容类型（页面、Sections、产品、博客）、多语言、多版本和动态内容渲染。可与表单、图像、SEO、性能优化等 Skill 联动。

**依赖**：

* **astro-architecture**：页面结构和目录
* **astro-components**：组件渲染动态内容
* **Form Handling Skill**：表单数据集成
* **image-management**：图片/视频处理
* **astro-seo-engine**：自动生成 SEO 元数据

---

## **1️⃣ Use Cases**

* 多页面网站、产品展示、案例、博客
* 程序化 SEO 页面（自动生成标题、描述、URL）
* 动态内容（轮播、卡片、表格）
* 多语言支持（EN/CN 或更多）
* 与表单、图片管理、SEO、性能优化 Skill 协作

---

## **2️⃣ 内容模型（Content Modeling）**

### **Page**

```js
{
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Page Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    { name: 'sections', type: 'array', of: [{ type: 'reference', to: [{ type: 'section' }] }] },
    { name: 'seo', type: 'seo', title: 'SEO Metadata' }
  ]
}
```

### **Section**

```js
{
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'content', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'layout', type: 'string', options: { list: ['hero', 'cards', 'text-left', 'text-right', 'grid'] } }
  ]
}
```

### **SEO Metadata**

```js
{
  name: 'seo',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    { name: 'metaTitle', type: 'string' },
    { name: 'metaDescription', type: 'text' },
    { name: 'canonical', type: 'url' },
    { name: 'ogImage', type: 'image' }
  ]
}
```

### **Multi-Language Support**

```js
{
  name: 'title',
  type: 'object',
  fields: [
    { name: 'en', type: 'string', title: 'English' },
    { name: 'zh', type: 'string', title: 'Chinese' }
  ]
}
```

* 支持页面、Section 和 SEO 字段的多语言内容
* 前端通过 `locale` 参数选择内容

---

## **3️⃣ 常用操作（CRUD）**

### Create / Update

```js
import client from './sanityClient';

await client.create({
  _type: 'page',
  title: 'Solar Solutions',
  slug: { _type: 'slug', current: 'solar-solutions' },
  sections: [],
  seo: { metaTitle: 'Solar Solutions | Company', metaDescription: 'High-end solar solutions.' }
});
```

### Query

```js
const homepage = await client.fetch(`*[_type == "page" && slug.current == "home"][0]{
  title, sections[]{..., content[]{..., asset->{url}}}
}`);
```

### Update

```js
await client.patch('page-id')
  .set({ title: 'Updated Page Title' })
  .commit();
```

### Delete

```js
await client.delete('page-id');
```

---

## **4️⃣ Content Versioning & Publishing**

* Draft：可编辑，未上线
* Published：已发布，前端可访问
* 支持 **定时发布**

---

## **5️⃣ Media & File Management**

* 使用 **Sanity Asset Pipeline** 管理图片/视频
* 支持响应式图片、裁剪、热点、压缩
* 与 **Image Management Skill** 联动

---

## **6️⃣ Frontend Integration (Astro / React)**

```js
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'your_project_id',
  dataset: 'production',
  useCdn: true
});

const hero = await client.fetch(`*[_type == "section" && layout == "hero"]{
  title, content[]{..., asset->{url}}
}`);
```

* `useCdn: true` 使用缓存静态内容
* 可在内容更新后触发前端重新验证

---

## **7️⃣ Forms & Dynamic Content**

* 表单提交可保存到 Sanity 或外部服务
* Sections 可渲染动态内容（轮播、卡片、案例）
* 与 **astro-components**、**form-handling** 结合

---

## **8️⃣ Permissions & Team Management**

* **Admin**：全部权限
* **Editor**：编辑内容
* **Reviewer**：只读
* 支持页面 & 字段级权限

---

## **9️⃣ Validation & Best Practices**

* 必填字段：`Rule => Rule.required()`
* 最大长度：`Rule.max(200)`
* URL 校验：`Rule.uri({ allowRelative: true })`
* 命名：`_type` 使用小写、kebab-case
* Slug 自动生成且唯一
* 使用结构化数据优化 SEO（FAQ、BlogPost、Product）

---

✅ **输出效果**

* 强大、可版本化的多语言内容管理
* 与动态页面、Sections、组件、SEO、表单、图片系统兼容
* 可通过 Trae 自动创建、更新和查询内容

---

如果你希望，我可以帮你 **生成完整的 Trae JSON 操作文件**，直接创建 `astro-content-management` Skill，包括 Page、Section、SEO 模型、多语言和示例 CRUD 操作，一键落地。

你希望我生成吗？
