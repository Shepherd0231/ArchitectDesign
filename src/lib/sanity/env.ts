export type SanityPublicLocale = 'en' | 'es' | 'zh';

export function normalizeSanityLocale(locale: string | undefined): SanityPublicLocale {
  if (!locale) return 'zh';
  const lower = locale.toLowerCase();
  if (lower === 'en' || lower.startsWith('en-')) return 'en';
  if (lower === 'es' || lower.startsWith('es-')) return 'es';
  return 'zh';
}

export function getSanityEnv() {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined;
  const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string | undefined) ?? 'production';
  const apiVersion = (import.meta.env.PUBLIC_SANITY_API_VERSION as string | undefined) ?? '2025-01-01';
  const token = import.meta.env.SANITY_API_TOKEN as string | undefined;
  const useCdn = (import.meta.env.PUBLIC_SANITY_USE_CDN as string | undefined) !== 'false';

  return { projectId, dataset, apiVersion, token, useCdn };
}

export function isSanityConfigured() {
  const { projectId, dataset } = getSanityEnv();
  return Boolean(projectId && dataset);
}
