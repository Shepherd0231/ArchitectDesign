import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(init?.headers ?? {}),
    },
  });
}

function originAllowed(origin: string, allowlist: string) {
  const items = allowlist
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  for (const rule of items) {
    if (rule === origin) return true;
    if (rule.includes('*')) {
      const escaped = rule.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replaceAll('\\*', '.*');
      const re = new RegExp(`^${escaped}$`, 'i');
      if (re.test(origin)) return true;
    }
  }
  return false;
}

function isLocalDevOrigin(origin: string) {
  return /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(origin);
}

function cors(request: Request, env: any) {
  const origin = request.headers.get('origin') ?? '';
  const allowlist = (env.R2_UPLOAD_ALLOWED_ORIGINS as string | undefined) ?? '';
  const uploadToken = (env.R2_UPLOAD_TOKEN as string | undefined) ?? '';

  const allowOrigin = (() => {
    if (!origin) return '';
    if (isLocalDevOrigin(origin)) return origin;
    if (uploadToken) return origin;
    if (!allowlist) return '';
    return originAllowed(origin, allowlist) ? origin : '';
  })();

  const requestHeaders =
    request.headers.get('access-control-request-headers') ?? 'content-type, authorization';

  return {
    allowOrigin,
    headers: {
      ...(allowOrigin ? { 'access-control-allow-origin': allowOrigin } : {}),
      ...(allowOrigin ? { vary: 'origin' } : {}),
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': requestHeaders,
      'access-control-max-age': '86400',
    } as Record<string, string>,
  };
}

export const onRequestGet = async (context: any) => {
  const { request, env } = context as { request: Request; env: any };
  const c = cors(request, env);
  return json({ success: false, error: 'METHOD_NOT_ALLOWED' }, { status: 405, headers: c.headers });
};

export const onRequestOptions = async (context: any) => {
  const { request, env } = context as { request: Request; env: any };
  const c = cors(request, env);
  return new Response(null, { status: 204, headers: c.headers });
};

export const onRequestPost = async (context: any) => {
  const { request, env } = context as { request: Request; env: any };
  const c = cors(request, env);

  try {
    const uploadToken = (env.R2_UPLOAD_TOKEN as string | undefined) ?? '';
    if (uploadToken) {
      const auth = request.headers.get('authorization') ?? '';
      const expected = `Bearer ${uploadToken}`;
      if (auth !== expected) {
        return json({ success: false, error: 'UNAUTHORIZED' }, { status: 401, headers: c.headers });
      }
    }

    const accountId = (env.R2_ACCOUNT_ID as string | undefined) ?? '';
    const accessKeyId = (env.R2_ACCESS_KEY_ID as string | undefined) ?? '';
    const secretAccessKey = (env.R2_SECRET_ACCESS_KEY as string | undefined) ?? '';
    const bucket = (env.R2_BUCKET_NAME as string | undefined) ?? '';
    const prefix = ((env.R2_PREFIX as string | undefined) ?? 'images').replace(/^\/+|\/+$/g, '');
    const publicUrl = (env.R2_PUBLIC_URL as string | undefined) ?? '';

    if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
      return json({ success: false, error: 'R2_CONFIG_MISSING' }, { status: 500, headers: c.headers });
    }

    const ct = request.headers.get('content-type') ?? '';
    if (!ct.includes('multipart/form-data')) {
      return json(
        { success: false, error: 'UNSUPPORTED_CONTENT_TYPE' },
        { status: 415, headers: c.headers },
      );
    }

    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return json({ success: false, error: 'NO_FILE' }, { status: 400, headers: c.headers });
    }

    const name = (file.name || 'upload').replaceAll('\\', '/').split('/').pop() || 'upload';
    const ext = name.includes('.') ? `.${name.split('.').pop()}`.toLowerCase() : '';
    const safeBase = name
      .replace(ext, '')
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80);

    const stamp = new Date().toISOString().replaceAll(':', '').replaceAll('.', '').replace('Z', 'Z');
    const key = `${prefix}/${stamp}-${safeBase || 'image'}${ext || '.jpg'}`;

    const s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: new Uint8Array(await file.arrayBuffer()),
          ContentType: file.type || 'application/octet-stream',
        }),
      );
    } catch (e) {
      const code = e instanceof Error ? e.name : 'UPLOAD_FAILED';
      return json({ success: false, error: 'UPLOAD_FAILED', code }, { status: 502, headers: c.headers });
    }

    return json(
      {
        success: true,
        key,
        url: `r2://${key}`,
        publicUrl: publicUrl ? `${publicUrl.replace(/\/+$/g, '')}/${key}` : undefined,
      },
      { status: 200, headers: c.headers },
    );
  } catch (e) {
    const code = e instanceof Error ? e.name : 'UPLOAD_FAILED';
    return json({ success: false, error: 'UPLOAD_FAILED', code }, { status: 500, headers: c.headers });
  }
};
