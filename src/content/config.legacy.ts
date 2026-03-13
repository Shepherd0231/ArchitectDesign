import { defineCollection, z } from 'astro:content';

const casesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string(),
    isFeatured: z.boolean().default(false),
    client: z.string().optional(),
    location: z.string().optional(),
    year: z.number().optional(),
  }),
});

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
  cases: casesCollection,
  blog: blogCollection,
};

