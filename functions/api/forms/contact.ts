import { Resend } from 'resend';

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  projectType?: unknown;
  company?: unknown;
  page?: unknown;
  source?: unknown;
  locale?: unknown;
  sourceUrl?: unknown;
};

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clamp(value: string, max: number) {
  return value.length > max ? value.slice(0, max) : value;
}

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(init?.headers ?? {}),
    },
  });
}

function i18n(locale: string) {
  const isZh = locale.toLowerCase().startsWith('zh');
  return {
    invalid: isZh ? '提交信息不完整或邮箱格式错误' : 'Invalid input',
    rateLimited: isZh ? '提交过于频繁，请稍后再试' : 'Too many requests',
    ok: isZh ? '提交成功' : 'Submitted',
    failed: isZh ? '提交失败，请稍后重试' : 'Submission failed',
  };
}

export const onRequestPost = async (context: any) => {
  const { request, env } = context as { request: Request; env: any };
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return json({ success: false, error: 'UNSUPPORTED_CONTENT_TYPE' }, { status: 415 });
  }

  let body: Payload = {};
  try {
    body = (await request.json()) as Payload;
  } catch {
    body = {};
  }

  const locale = asString(body.locale) || 'en';
  const t = i18n(locale);

  const honeypot = asString(body.company);
  if (honeypot) return json({ success: true, message: t.ok });

  const name = clamp(asString(body.name), 120);
  const email = clamp(asString(body.email).toLowerCase(), 200);
  const phone = clamp(asString(body.phone), 60);
  const message = clamp(asString(body.message), 4000);
  const projectType = clamp(asString(body.projectType), 120);
  const page = clamp(asString(body.page) || asString(body.sourceUrl), 400);
  const source = clamp(asString(body.source), 120);

  if (!name || !email || !message || !isEmail(email)) {
    return json({ success: false, error: 'INVALID_INPUT', message: t.invalid }, { status: 400 });
  }

  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '';
  const userAgent = clamp(request.headers.get('user-agent') ?? '', 400);

  const resendApiKey = asString(env.RESEND_API_KEY);
  const resendFrom = asString(env.RESEND_FROM);
  const resendTo = asString(env.RESEND_TO);
  if (!resendApiKey || !resendFrom || !resendTo) {
    return json({ success: false, error: 'EMAIL_CONFIG_MISSING', message: t.failed }, { status: 500 });
  }

  try {
    const recent = await env.FORMS_DB.prepare(
      `SELECT COUNT(1) AS count FROM submissions
       WHERE ip = ?
         AND datetime(replace(replace(created_at,'T',' '),'Z','')) > datetime('now','-10 minutes')`,
    )
      .bind(ip)
      .first();
    const recentCount = Number((recent as any)?.count ?? 0);

    if (recentCount >= 5) {
      return json({ success: false, error: 'RATE_LIMITED', message: t.rateLimited }, { status: 429 });
    }
  } catch {
    return json({ success: false, error: 'DB_UNAVAILABLE', message: t.failed }, { status: 503 });
  }

  try {
    await env.FORMS_DB.prepare(
      `INSERT INTO submissions (
        type, name, email, phone, message, project_type,
        source, page, locale,
        ip, user_agent,
        created_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?, datetime('now'))`,
    )
      .bind(
        'contact',
        name,
        email,
        phone || null,
        message,
        projectType || null,
        source || null,
        page || null,
        locale || null,
        ip || null,
        userAgent || null,
      )
      .run();
  } catch {
    return json({ success: false, error: 'DB_INSERT_FAILED', message: t.failed }, { status: 500 });
  }

  let resend: Resend;
  try {
    resend = new Resend(resendApiKey);
  } catch {
    return json({ success: false, error: 'EMAIL_CONFIG_MISSING', message: t.failed }, { status: 500 });
  }

  const adminHtml = `
    <h2>New Website Contact</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
    ${page ? `<p><strong>Page:</strong> ${page}</p>` : ''}
    ${source ? `<p><strong>Source:</strong> ${source}</p>` : ''}
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap">${message.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</pre>
  `;

  try {
    await resend.emails.send({
      from: resendFrom,
      to: resendTo,
      subject: `New Website Inquiry: ${name}`,
      html: adminHtml,
      replyTo: email,
    });
  } catch {
    return json({ success: false, error: 'EMAIL_FAILED', message: t.failed }, { status: 502 });
  }

  const replyEnabled = (env.RESEND_REPLY_ENABLED ?? 'true') !== 'false';
  if (replyEnabled) {
    const replyHtml =
      locale.toLowerCase().startsWith('zh')
        ? `<p>您好 ${name}，感谢您的咨询，我们将在 24 小时内与您联系。</p>`
        : `<p>Hi ${name}, thanks for reaching out. We'll reply within 24 hours.</p>`;
    try {
      await resend.emails.send({
        from: resendFrom,
        to: email,
        subject: locale.toLowerCase().startsWith('zh') ? '我们已收到您的咨询' : 'We received your message',
        html: replyHtml,
      });
    } catch {
      return json({ success: true, message: t.ok });
    }
  }

  return json({ success: true, message: t.ok });
};