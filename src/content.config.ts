import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().optional(),
  })
  .optional();

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/blog/', import.meta.url) }),
  schema: z.object({
    locale: z.enum(['zh-cn', 'en', 'es']).default('zh-cn'),
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    coverImage: z.string(),
    coverImageMeta: z
      .object({
        alt: z.string().optional(),
      })
      .optional(),
    seo: seoSchema,
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/cases/', import.meta.url) }),
  schema: z.object({
    locale: z.enum(['zh-cn', 'en', 'es']).default('zh-cn'),
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string(),
    coverImageMeta: z
      .object({
        alt: z.string().optional(),
      })
      .optional(),
    isFeatured: z.boolean().default(false),
    client: z.string().optional(),
    location: z.string().optional(),
    year: z.number().optional(),
    seo: seoSchema,
  }),
});

export const collections = {
  blog,
  cases,
};
