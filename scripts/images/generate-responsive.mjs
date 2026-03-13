import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { extname, join, basename } from 'node:path';

const widths = [480, 800, 1200, 1920];

const inputDir = process.env.IMAGES_SOURCE_DIR ?? './public/images-src';
const outputDir = process.env.IMAGES_OUTPUT_DIR ?? './public/images';
const enableWebp = (process.env.PUBLIC_MEDIA_WEBP ?? 'true') !== 'false';

async function listFiles(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const p = join(dir, entry);
    const s = await stat(p);
    if (s.isDirectory()) continue;
    files.push(p);
  }
  return files;
}

function isRaster(path) {
  const ext = extname(path).toLowerCase();
  return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
}

await mkdir(outputDir, { recursive: true });

let files = [];
try {
  files = await listFiles(inputDir);
} catch {
  process.stdout.write(`${inputDir} 不存在，跳过生成。\n`);
  process.exit(0);
}

for (const file of files) {
  if (!isRaster(file)) continue;

  const base = basename(file, extname(file));
  for (const w of widths) {
    const jpgOut = join(outputDir, `${base}-${w}.jpg`);
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(jpgOut);

    if (enableWebp) {
      const webpOut = join(outputDir, `${base}-${w}.webp`);
      await sharp(file)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(webpOut);
    }
  }

  process.stdout.write(`Generated: ${base}\n`);
}

