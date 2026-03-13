import { defineCollection, z } from 'astro:content';

// 设计案例集合
const casesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string(),
    isFeatured: z.boolean().default(false),
    // 可选的详细信息
    client: z.string().optional(),
    location: z.string().optional(),
    year: z.number().optional(),
  }),
});

// 设计视界（博客）集合
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string().default('AstroMeta Studio'),
    tags: z.array(z.string()).optional(),
    coverImage: z.string(),
  }),
});

export const collections = {
  'cases': casesCollection,
  'blog': blogCollection,
};
