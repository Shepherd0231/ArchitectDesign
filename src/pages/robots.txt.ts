import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/+$/g, '') ?? '';
  const sitemapUrl = base ? `${base}/sitemap-index.xml` : '/sitemap-index.xml';
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    status: 200,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};

