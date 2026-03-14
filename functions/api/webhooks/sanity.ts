function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(init?.headers ?? {}),
    },
  });
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function getBearerToken(request: Request) {
  const auth = request.headers.get('authorization') ?? '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m?.[1]?.trim() ?? '';
}

export const onRequestPost = async (context: any) => {
  const { request, env } = context as { request: Request; env: any };
  const url = new URL(request.url);

  const expected = asString(env.SANITY_WEBHOOK_TOKEN);
  if (expected) {
    const token = getBearerToken(request) || url.searchParams.get('token') || request.headers.get('x-webhook-token');
    if (asString(token) !== expected) {
      return json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }
  }

  const deployHookUrl = asString(env.CLOUDFLARE_DEPLOY_HOOK_URL);
  if (!deployHookUrl) {
    return json({ success: false, error: 'MISSING_DEPLOY_HOOK_URL' }, { status: 500 });
  }

  const payloadText = await request.text().catch(() => '');
  const res = await fetch(deployHookUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      source: 'sanity',
      receivedAt: new Date().toISOString(),
      payload: payloadText ? payloadText.slice(0, 20000) : undefined,
    }),
  }).catch(() => undefined);

  if (!res) {
    return json({ success: false, error: 'DEPLOY_HOOK_UNREACHABLE' }, { status: 502 });
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return json(
      { success: false, error: 'DEPLOY_HOOK_FAILED', status: res.status, body: text.slice(0, 2000) },
      { status: 502 },
    );
  }

  return json({ success: true });
};

