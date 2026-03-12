

\---



\# \*\*Trae Skill: communication-social\*\*



\*\*Name\*\*: `communication-social`

\*\*Description\*\*: 集成网站沟通渠道，包括 Email、WhatsApp、社交媒体消息和浮窗，支持与表单、组件、CMS 以及 SEO/性能优化模块协作，实现快速用户交互和消息通知。



\*\*依赖\*\*：

\* \*\*astro-components\*\*：Floating Widget、Button 等 UI 元素
\* \*\*Form Handling Skill\*\*：表单提交触发消息通知
\* \*\*Sanity-Content-Management\*\*：动态内容触发沟通
\* \*\*tailwind-design\*\*：浮窗样式与响应式统一
\* \*\*deployment-guide\*\*：确保全局可用性和低延迟
\* \*\*Deployment & Cloudflare\*\*：确保全局可用性和低延迟
\* \*\*Frontend Performance Optimization\*\*：确保全局可用性和低延迟



\---



\## \*\*1️⃣ Use Cases\*\*



\* 页面右下角浮窗与用户实时沟通（WhatsApp、Email、社媒）

\* 表单提交触发消息通知

\* 产品、博客或案例页面提供快速询盘入口

\* 支持多语言显示（EN/CN）

\* 与 R2、CMS、SEO、性能优化 Skill 协作



\---



\## \*\*2️⃣ Component / Widget\*\*



\### Floating Widget



\* \*\*文件位置\*\*: `src/components/ui/FloatingWidget.astro`

\* \*\*Props\*\*：



```js

{

&#x20; icon: string,        // 浮窗图标

&#x20; position: string,    // bottom-right / bottom-left

&#x20; channels: \[          // 多渠道支持

&#x20;   { type: "whatsapp", url: "https://wa.me/1234567890" },

&#x20;   { type: "email", url: "mailto:contact@company.com" },

&#x20;   { type: "facebook", url: "https://m.me/company" }

&#x20; ],

&#x20; collapsed: boolean,  // 默认折叠

&#x20; theme: "light"|"dark" // 主题样式

}

```



\* \*\*功能\*\*：



&#x20; \* 点击图标展开/折叠

&#x20; \* 渲染渠道按钮

&#x20; \* 支持表单提交结果触发消息提示

&#x20; \* 响应式适配手机、平板、PC



\---



\## \*\*3️⃣ Integration with Form Handling\*\*



\* \*\*表单提交通知\*\*：



&#x20; \* 表单成功提交后，调用 Floating Widget 显示“消息发送成功”提示

&#x20; \* 可同时触发 Email 或 WhatsApp 通知

\* \*\*Props 示例\*\*：



```js

{

&#x20; formSuccessMessage: "Thank you! We will contact you shortly.",

&#x20; triggerChannels: \["email", "whatsapp"]

}

```



\---



\## \*\*4️⃣ Frontend / Trae Usage\*\*



\### Example Usage



```astro

<FloatingWidget 

&#x20; icon="/images/icons/chat.svg"

&#x20; position="bottom-right"

&#x20; collapsed={false}

&#x20; channels={\[

&#x20;   { type: "whatsapp", url: "https://wa.me/1234567890" },

&#x20;   { type: "email", url: "mailto:contact@company.com" },

&#x20;   { type: "facebook", url: "https://m.me/company" }

&#x20; ]}

&#x20; formSuccessMessage="Thanks! We'll get back to you soon."

/>

```



\* 可在 BaseLayout 或页面内全局使用

\* 与表单、产品卡片、博客文章结合，提供即时沟通入口



\---



\## \*\*5️⃣ Best Practices\*\*



\* 使用 \*\*Props 驱动内容和渠道\*\*，避免硬编码

\* 响应式布局，移动端和桌面端适配

\* 避免阻塞页面性能，懒加载浮窗图标

\* 可通过 Trae 批量更新渠道配置

\* 浮窗样式与 Tailwind Design Skill 统一



\---



\## \*\*6️⃣ Multi-Channel Notes\*\*



| Channel              | Notes             |

| -------------------- | ----------------- |

| WhatsApp             | 使用 wa.me 链接快速打开对话 |

| Email                | mailto: 链接，支持预填主题 |

| Facebook / Messenger | m.me 链接，支持社媒即时消息  |

| Telegram             | t.me 链接，可扩展其他社媒   |



\* 每个渠道均可通过 Props 配置

\* 可随时新增自定义渠道，支持扩展



\---



\## \*\*7️⃣ Permissions / Team Usage\*\*



\* 管理员可配置所有渠道

\* 编辑可调整文字、图标和位置

\* 访问者仅显示前端浮窗



\---



✅ \*\*输出效果\*\*



\* 浮窗组件可在所有页面全局使用

\* 与表单和 CMS 内容联动，实现即时通知

\* 响应式、可扩展、多渠道

\* 可通过 Trae 一键更新和管理



\---





