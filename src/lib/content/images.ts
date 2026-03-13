function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

export function resolveImageUrl(input?: string) {
  if (!input) return undefined;

  if (input.startsWith('r2://')) {
    const r2PublicUrl = import.meta.env.R2_PUBLIC_URL as string | undefined;
    if (!r2PublicUrl) return undefined;
    const path = input.slice('r2://'.length).replace(/^\/+/g, '');
    return `${r2PublicUrl.replace(/\/+$/g, '')}/${path}`;
  }

  if (isHttpUrl(input) || input.startsWith('/')) return input;

  return `/${input.replace(/^\/+/g, '')}`;
}

export function resolveKeywords(input?: string[] | string) {
  if (!input) return undefined;
  if (Array.isArray(input)) return input;
  return input.split(',').map((s) => s.trim()).filter(Boolean);
}

