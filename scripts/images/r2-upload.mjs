import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET_NAME;
const prefix = (process.env.R2_PREFIX ?? 'images').replace(/^\/+|\/+$/g, '');

if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
  process.stderr.write('Missing R2 env vars: R2_ACCOUNT_ID/R2_ACCESS_KEY_ID/R2_SECRET_ACCESS_KEY/R2_BUCKET_NAME\n');
  process.exit(1);
}

const root = new URL('../../public/images/', import.meta.url);

function contentTypeFor(path) {
  switch (extname(path).toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const p = join(dir, entry);
    const s = await stat(p);
    if (s.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

let files = [];
try {
  files = await walk(root);
} catch {
  process.stderr.write('public/images 不存在，无法上传。\n');
  process.exit(1);
}

for (const abs of files) {
  const rel = relative(root.pathname, abs).replaceAll('\\', '/');
  const key = `${prefix}/${rel}`;
  const body = await readFile(abs);
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentTypeFor(abs),
    }),
  );
  process.stdout.write(`Uploaded: ${key}\n`);
}

