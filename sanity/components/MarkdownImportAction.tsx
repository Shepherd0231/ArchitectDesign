import React, { useMemo, useRef, useState } from 'react';
import { Button, Dialog, Flex, Stack, Text } from '@sanity/ui';
import type { DocumentActionComponent } from 'sanity';
import { useDocumentOperation } from 'sanity';

type Frontmatter = Record<string, unknown>;

type UploadResponse =
  | { success: true; url: string; publicUrl?: string; key?: string }
  | { success: false; error?: string; message?: string; missing?: string[] };

function uid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function parseFrontmatter(input: string): { frontmatter: Frontmatter; body: string } {
  const trimmed = input.replace(/^\uFEFF/, '');
  if (!trimmed.startsWith('---')) return { frontmatter: {}, body: trimmed };

  const end = trimmed.indexOf('\n---', 3);
  if (end === -1) return { frontmatter: {}, body: trimmed };

  const header = trimmed.slice(3, end).trim();
  const body = trimmed.slice(end + '\n---'.length).replace(/^\s*\r?\n/, '');
  return { frontmatter: parseYamlLike(header), body };
}

function parseYamlLike(input: string): Frontmatter {
  const out: Frontmatter = {};
  const lines = input.split(/\r?\n/g);
  let currentKey: string | null = null;
  let currentList: unknown[] | null = null;

  const flushList = () => {
    if (currentKey && currentList) out[currentKey] = currentList;
    currentKey = null;
    currentList = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;

    const listItemMatch = /^-\s+(.*)$/.exec(line);
    if (listItemMatch) {
      if (!currentKey) continue;
      if (!currentList) currentList = [];
      currentList.push(parseScalar(listItemMatch[1]));
      continue;
    }

    flushList();

    const idx = line.indexOf(':');
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    const rest = line.slice(idx + 1).trim();

    if (!rest) {
      currentKey = key;
      currentList = [];
      continue;
    }

    out[key] = parseScalar(rest);
  }

  flushList();
  return out;
}

function parseScalar(value: string): unknown {
  const v = value.trim();
  if (!v) return '';
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map((s) => parseScalar(s.trim()));
  }
  return v;
}

type PortableTextSpan = {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
};

type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style?: string;
  children: PortableTextSpan[];
  markDefs: Array<{ _type: string; _key: string; href?: string }>;
  listItem?: 'bullet';
  level?: number;
};

function spansFromText(text: string): { children: PortableTextSpan[]; markDefs: PortableTextBlock['markDefs'] } {
  const children: PortableTextSpan[] = [];
  const markDefs: PortableTextBlock['markDefs'] = [];

  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    const before = text.slice(last, m.index);
    if (before) children.push({ _type: 'span', _key: uid(), text: before, marks: [] });

    const markKey = uid();
    markDefs.push({ _type: 'link', _key: markKey, href: m[2] });
    children.push({ _type: 'span', _key: uid(), text: m[1], marks: [markKey] });

    last = m.index + m[0].length;
  }

  const tail = text.slice(last);
  if (tail) children.push({ _type: 'span', _key: uid(), text: tail, marks: [] });
  if (!children.length) children.push({ _type: 'span', _key: uid(), text: '', marks: [] });

  return { children, markDefs };
}

function blockFromLine(line: string, opts?: { style?: string; listItem?: 'bullet'; level?: number }) {
  const { children, markDefs } = spansFromText(line);
  const block: PortableTextBlock = {
    _type: 'block',
    _key: uid(),
    style: opts?.style ?? 'normal',
    children,
    markDefs,
  };
  if (opts?.listItem) block.listItem = opts.listItem;
  if (opts?.level) block.level = opts.level;
  return block;
}

function markdownToPortableText(markdown: string): PortableTextBlock[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: PortableTextBlock[] = [];
  let paragraph: string[] = [];
  const resolveImageUrl = (url: string) => url;

  const flushParagraph = () => {
    const text = paragraph.join(' ').trim();
    paragraph = [];
    if (!text) return;
    blocks.push(blockFromLine(text));
  };

  for (const raw of lines) {
    const line = raw.replace(/\t/g, '  ').trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const img = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/.exec(trimmed);
    if (img) {
      flushParagraph();
      const alt = img[1].trim();
      const url = resolveImageUrl(img[2].trim());
      blocks.push({
        _type: 'externalImage',
        _key: uid(),
        url,
        meta: alt ? { _type: 'imageMeta', alt } : undefined,
      } as any);
      continue;
    }

    const h = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (h) {
      flushParagraph();
      const level = h[1].length;
      const style =
        level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4';
      blocks.push(blockFromLine(h[2].trim(), { style }));
      continue;
    }

    const li = /^-\s+(.*)$/.exec(trimmed);
    if (li) {
      flushParagraph();
      blocks.push(blockFromLine(li[1].trim(), { listItem: 'bullet', level: 1 }));
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

function markdownToPortableTextWithImageResolver(markdown: string, resolver: (url: string) => string) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: PortableTextBlock[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    const text = paragraph.join(' ').trim();
    paragraph = [];
    if (!text) return;
    blocks.push(blockFromLine(text));
  };

  for (const raw of lines) {
    const line = raw.replace(/\t/g, '  ').trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const img = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/.exec(trimmed);
    if (img) {
      flushParagraph();
      const alt = img[1].trim();
      const url = resolver(img[2].trim());
      blocks.push({
        _type: 'externalImage',
        _key: uid(),
        url,
        meta: alt ? { _type: 'imageMeta', alt } : undefined,
      } as any);
      continue;
    }

    const h = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (h) {
      flushParagraph();
      const level = h[1].length;
      const style = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4';
      blocks.push(blockFromLine(h[2].trim(), { style }));
      continue;
    }

    const li = /^-\s+(.*)$/.exec(trimmed);
    if (li) {
      flushParagraph();
      blocks.push(blockFromLine(li[1].trim(), { listItem: 'bullet', level: 1 }));
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

function getString(fm: Frontmatter, key: string) {
  const v = fm[key];
  return typeof v === 'string' ? v.trim() : '';
}

function getStringArray(fm: Frontmatter, key: string) {
  const v = fm[key];
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === 'string') return v.split(',').map((s) => s.trim()).filter(Boolean);
  return undefined;
}

function normalizeLocale(input: string) {
  const v = input.toLowerCase();
  if (v === 'en' || v.startsWith('en-')) return 'en';
  if (v === 'es' || v.startsWith('es-')) return 'es';
  return 'zh';
}

function slugify(input: string) {
  const base = input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
  return base;
}

function fileBaseName(fileName: string) {
  const name = fileName.replaceAll('\\', '/').split('/').pop() ?? '';
  const dot = name.lastIndexOf('.');
  return (dot > 0 ? name.slice(0, dot) : name).trim();
}

function buildSlug(options: { fileName?: string; title?: string; publishDate?: string }) {
  const fromFile = options.fileName ? slugify(fileBaseName(options.fileName)) : '';
  if (fromFile) return fromFile;
  const fromTitle = options.title ? slugify(options.title) : '';
  if (fromTitle) return fromTitle;
  const date = options.publishDate ? new Date(options.publishDate) : new Date();
  const ymd = isNaN(date.getTime())
    ? new Date().toISOString().slice(0, 10).replaceAll('-', '')
    : date.toISOString().slice(0, 10).replaceAll('-', '');
  return `${ymd}-${uid().slice(0, 6)}`;
}

function isRelativeImageUrl(url: string) {
  const v = url.trim();
  if (!v) return false;
  if (v.startsWith('r2://')) return false;
  if (v.startsWith('http://') || v.startsWith('https://')) return false;
  if (v.startsWith('data:')) return false;
  if (v.startsWith('/')) return false;
  return true;
}

function basenameFromUrl(url: string) {
  const v = url.split('#')[0]?.split('?')[0] ?? url;
  const parts = v.replaceAll('\\', '/').split('/');
  return (parts[parts.length - 1] ?? '').trim();
}

function collectMarkdownImageUrls(markdown: string) {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const trimmed = raw.trim();
    const img = /^!\[[^\]]*\]\(([^)\s]+)\)\s*$/.exec(trimmed);
    if (!img) continue;
    const url = img[1].trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

async function uploadToR2(file: File, endpoint: string, token: string) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
    body: fd,
  });
  const data = (await res.json().catch(() => null)) as UploadResponse | null;
  if (!res.ok || !data) throw new Error(`Upload failed (${res.status})`);
  if ('success' in data && data.success && typeof data.url === 'string' && data.url) return data.url;
  const msg = (data as any)?.message || (data as any)?.error || `Upload failed (${res.status})`;
  throw new Error(String(msg));
}

export const MarkdownImportAction: DocumentActionComponent = (props) => {
  const { id, type, published, draft, onComplete } = props;
  const { patch } = useDocumentOperation(id, type);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const supported = useMemo(() => type === 'post' || type === 'case', [type]);
  const doc = draft ?? published;
  const endpoint = ((import.meta.env.SANITY_STUDIO_R2_UPLOAD_URL as string | undefined) ?? '').trim();
  const token = ((import.meta.env.SANITY_STUDIO_R2_UPLOAD_TOKEN as string | undefined) ?? '').trim();

  if (!supported) return null;

  return {
    label: 'Import Markdown',
    onHandle: () => setOpen(true),
    dialog: open
      ? {
          type: 'dialog',
          onClose: () => {
            setOpen(false);
            onComplete();
          },
          content: (
            <Dialog
              header="Import Markdown"
              id="markdown-import"
              width={1}
              onClose={() => {
                setOpen(false);
                onComplete();
              }}
            >
              <Stack space={4} padding={4}>
                <Text size={1}>
                  Upload a .md file. If your markdown references local images like ./image.jpg, select those images together.
                </Text>

                {err ? (
                  <Text size={1} style={{ color: 'var(--card-critical-fg-color)' }}>
                    {err}
                  </Text>
                ) : null}

                <Flex gap={3}>
                  <Button
                    mode="default"
                    tone="primary"
                    text={busy ? 'Importing…' : 'Choose .md'}
                    disabled={busy}
                    onClick={() => fileRef.current?.click()}
                  />
                  <Button
                    mode="ghost"
                    text="Close"
                    disabled={busy}
                    onClick={() => {
                      setOpen(false);
                      onComplete();
                    }}
                  />
                </Flex>

                <input
                  ref={fileRef}
                  type="file"
                  accept=".md,text/markdown,image/*"
                  multiple
                  hidden
                  onChange={async (e) => {
                    const files = Array.from(e.currentTarget.files ?? []);
                    const mdFile = files.find((f) => f.name.toLowerCase().endsWith('.md'));
                    if (!mdFile) {
                      setErr('Please select a .md file');
                      return;
                    }
                    const file = mdFile;
                    e.currentTarget.value = '';

                    setBusy(true);
                    setErr(null);
                    try {
                      const text = await file.text();
                      const { frontmatter, body } = parseFrontmatter(text);

                      const locale = normalizeLocale(getString(frontmatter, 'locale') || 'zh');
                      const title = getString(frontmatter, 'title');
                      const description = getString(frontmatter, 'description');
                      const publishDate = getString(frontmatter, 'publishDate') || getString(frontmatter, 'date');
                      const author = getString(frontmatter, 'author');
                      const slug = getString(frontmatter, 'slug');
                      const tags = getStringArray(frontmatter, 'tags');
                      const coverImageRaw =
                        getString(frontmatter, 'coverImageUrl') || getString(frontmatter, 'coverImage');

                      const imageFiles = new Map<string, File>();
                      for (const f of files) {
                        if (f === file) continue;
                        imageFiles.set(f.name.toLowerCase(), f);
                      }

                      const urls = collectMarkdownImageUrls(body);
                      const urlMap = new Map<string, string>();
                      const missingRefs: string[] = [];

                      const relativeUrls = urls.filter(isRelativeImageUrl);
                      const coverIsRelative = coverImageRaw ? isRelativeImageUrl(coverImageRaw) : false;
                      if ((relativeUrls.length || coverIsRelative) && !endpoint) {
                        setErr('Missing SANITY_STUDIO_R2_UPLOAD_URL');
                        return;
                      }

                      for (const u of relativeUrls) {
                        const base = basenameFromUrl(u);
                        const f = imageFiles.get(base.toLowerCase());
                        if (!f) {
                          missingRefs.push(u);
                          continue;
                        }
                        const uploadedUrl = await uploadToR2(f, endpoint, token);
                        urlMap.set(u, uploadedUrl);
                      }

                      let coverImageUrl = coverImageRaw;
                      if (coverImageRaw && coverIsRelative) {
                        const base = basenameFromUrl(coverImageRaw);
                        const f = imageFiles.get(base.toLowerCase());
                        if (!f) {
                          missingRefs.push(coverImageRaw);
                        } else {
                          const uploadedUrl = await uploadToR2(f, endpoint, token);
                          urlMap.set(coverImageRaw, uploadedUrl);
                          coverImageUrl = uploadedUrl;
                        }
                      }

                      if (missingRefs.length) {
                        setErr(`Missing image files: ${missingRefs.join(', ')}`);
                        return;
                      }

                      const bodyBlocks = urlMap.size
                        ? markdownToPortableTextWithImageResolver(body, (u) => urlMap.get(u) ?? u)
                        : markdownToPortableText(body);

                      const setOps: any[] = [];

                      if (title) setOps.push({ set: { [`title.${locale}`]: title } });
                      if (description) setOps.push({ set: { [`description.${locale}`]: description } });
                      if (publishDate) setOps.push({ set: { publishDate } });
                      if (author) setOps.push({ set: { author } });
                      if (tags && tags.length) setOps.push({ set: { tags } });
                      if (coverImageUrl) setOps.push({ set: { coverImageUrl } });
                      const existingSlug = (doc as any)?.slug?.current;
                      const computedSlug = slug || (!existingSlug ? buildSlug({ fileName: file.name, title, publishDate }) : '');
                      if (computedSlug && !existingSlug) {
                        setOps.push({ set: { slug: { _type: 'slug', current: computedSlug } } });
                      }
                      if (bodyBlocks.length) setOps.push({ set: { body: bodyBlocks } });

                      if (!setOps.length) {
                        setErr('No usable fields found in markdown');
                        return;
                      }

                      patch.execute(setOps);
                      setOpen(false);
                      onComplete();
                    } catch (e2) {
                      setErr(e2 instanceof Error ? e2.message : 'Import failed');
                    } finally {
                      setBusy(false);
                    }
                  }}
                />

                <Text size={1}>
                  Current document: {doc?._id ? String(doc._id) : id}
                </Text>
              </Stack>
            </Dialog>
          ),
        }
      : null,
  };
};
