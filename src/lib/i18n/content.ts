import type { SupportedLocale } from './routing';

export function pickLocale<T extends { data: { locale?: string } }>(items: T[], locale: SupportedLocale) {
  const exact = items.filter((e) => (e.data.locale ?? 'zh-cn') === locale);
  if (exact.length) return exact;
  if (locale !== 'en') {
    const en = items.filter((e) => (e.data.locale ?? 'zh-cn') === 'en');
    if (en.length) return en;
  }
  const zh = items.filter((e) => (e.data.locale ?? 'zh-cn') === 'zh-cn');
  return zh.length ? zh : items;
}

