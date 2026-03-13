export const defaultLocale = 'zh-cn' as const;
export const supportedLocales = ['zh-cn', 'en', 'es'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (supportedLocales as readonly string[]).includes(value);
}

export function getLocaleFromPathname(pathname: string): SupportedLocale {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && isSupportedLocale(seg)) return seg;
  return defaultLocale;
}

export function stripLocalePrefix(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return '/';
  const first = parts[0];
  if (first && isSupportedLocale(first)) {
    const rest = parts.slice(1).join('/');
    return `/${rest}`.replace(/\/+$/g, '') || '/';
  }
  return `/${parts.join('/')}`.replace(/\/+$/g, '') || '/';
}

function hasFileExtension(pathname: string) {
  const last = pathname.split('/').filter(Boolean).pop() ?? '';
  return last.includes('.') && !last.endsWith('.');
}

function normalizeTrailingSlash(pathname: string) {
  if (pathname === '/') return '/';
  if (hasFileExtension(pathname)) return pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function localizePath(pathname: string, locale: SupportedLocale) {
  const base = stripLocalePrefix(pathname);
  const localized = locale === defaultLocale ? base : `/${locale}${base === '/' ? '' : base}`;
  return normalizeTrailingSlash(localized.replace(/\/{2,}/g, '/'));
}

export function hreflang(locale: SupportedLocale) {
  if (locale === 'zh-cn') return 'zh-CN';
  if (locale === 'en') return 'en';
  if (locale === 'es') return 'es';
  return locale;
}

export function ogLocale(locale: SupportedLocale) {
  if (locale === 'zh-cn') return 'zh_CN';
  if (locale === 'en') return 'en_US';
  if (locale === 'es') return 'es_ES';
  return locale;
}

export function buildAlternates(site: string, pathname: string) {
  const base = stripLocalePrefix(pathname);
  return supportedLocales.map((loc) => ({
    hreflang: hreflang(loc),
    href: new URL(localizePath(base, loc), site).toString(),
  }));
}
