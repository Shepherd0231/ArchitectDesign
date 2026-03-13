import type { SanityPublicLocale } from './env';
import { getSanityClient } from './client';
import { isSanityConfigured } from './env';
import { queries } from './queries';

export type SanityCaseListItem = {
  slug: string;
  title: string;
  description: string;
  isFeatured?: boolean;
  publishDate: string;
  coverImage: string;
  coverImageMeta?: Record<string, unknown>;
};

export type SanityCase = SanityCaseListItem & {
  client?: string;
  location?: string;
  year?: number;
  tags?: string[];
  body?: unknown;
};

export type SanityPostListItem = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  author?: string;
  tags?: string[];
  coverImage: string;
  coverImageMeta?: Record<string, unknown>;
};

export type SanityPost = SanityPostListItem & {
  body?: unknown;
};

export type SanitySection = {
  _id: string;
  layout: string;
  title?: string;
  content?: unknown;
  imageUrl?: string;
  imageMeta?: Record<string, unknown>;
  data?: Record<string, unknown>;
};

export type SanityPage = {
  title: string;
  slug: string;
  sections?: SanitySection[];
  seo?: Record<string, unknown>;
};

export type SanitySiteSettings = {
  title?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  wechat?: string;
  social?: Record<string, string | undefined>;
};

export function sanityAvailable() {
  return isSanityConfigured();
}

export async function fetchCases(locale: SanityPublicLocale) {
  const client = getSanityClient();
  return await client.fetch<SanityCaseListItem[]>(queries.casesList, { locale });
}

export async function fetchCaseBySlug(locale: SanityPublicLocale, slug: string) {
  const client = getSanityClient();
  return await client.fetch<SanityCase | null>(queries.caseBySlug, { locale, slug });
}

export async function fetchPosts(locale: SanityPublicLocale) {
  const client = getSanityClient();
  return await client.fetch<SanityPostListItem[]>(queries.postsList, { locale });
}

export async function fetchPostBySlug(locale: SanityPublicLocale, slug: string) {
  const client = getSanityClient();
  return await client.fetch<SanityPost | null>(queries.postBySlug, { locale, slug });
}

export async function fetchPageBySlug(locale: SanityPublicLocale, slug: string) {
  const client = getSanityClient();
  return await client.fetch<SanityPage | null>(queries.pageBySlug, { locale, slug });
}

export async function fetchSiteSettings() {
  const client = getSanityClient();
  return await client.fetch<SanitySiteSettings | null>(queries.siteSettings, {});
}
