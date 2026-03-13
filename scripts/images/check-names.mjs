import { readdir, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = new URL('../../public/images/', import.meta.url);

const allowedExt = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg']);

function isValidName(file) {
  const ext = extname(file).toLowerCase();
  if (!allowedExt.has(ext)) return false;
  const base = file.slice(0, -ext.length);
  if (!/^[a-z0-9-]+$/.test(base)) return false;
  const parts = base.split('-').filter(Boolean);
  if (parts.length < 2) return false;
  const last = parts[parts.length - 1];
  if (/^\d{2,5}$/.test(last)) return true;
  return true;
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

let ok = true;
let files = [];
try {
  files = await walk(root);
} catch {
  process.stdout.write('public/images 不存在或为空，跳过检查。\n');
  process.exit(0);
}

for (const abs of files) {
  const rel = relative(root.pathname, abs).replaceAll('\\', '/');
  const name = rel.split('/').pop() ?? rel;
  if (!isValidName(name)) {
    ok = false;
    process.stdout.write(`命名不符合规范: ${rel}\n`);
  }
}

process.exit(ok ? 0 : 1);

