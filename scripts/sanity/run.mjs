import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const cacheRoot = path.join(repoRoot, '.cache');
const sanityConfigRoot = path.join(cacheRoot, 'sanity');
const appDataRoot = path.join(cacheRoot, 'appdata');

fs.mkdirSync(sanityConfigRoot, { recursive: true });
fs.mkdirSync(appDataRoot, { recursive: true });

function parseDotEnv(input) {
  const out = {};
  for (const raw of input.split(/\r?\n/g)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function loadDotEnv(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return parseDotEnv(content);
  } catch {
    return {};
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  process.stderr.write('Missing sanity command\n');
  process.exit(1);
}

const envFile = loadDotEnv(path.join(repoRoot, '.env'));
const devVarsFile = loadDotEnv(path.join(repoRoot, '.dev.vars'));

const env = {
  ...process.env,
  ...envFile,
  ...devVarsFile,
  XDG_CONFIG_HOME: sanityConfigRoot,
  HOME: cacheRoot,
  USERPROFILE: cacheRoot,
  APPDATA: appDataRoot,
  LOCALAPPDATA: appDataRoot,
  NO_UPDATE_NOTIFIER: '1',
};

const sanityBin =
  process.platform === 'win32'
    ? path.join(repoRoot, 'node_modules', '.bin', 'sanity.cmd')
    : path.join(repoRoot, 'node_modules', '.bin', 'sanity');

const cmd = process.platform === 'win32' ? 'cmd.exe' : sanityBin;
const cmdArgs = process.platform === 'win32' ? ['/c', sanityBin, ...args] : args;

const child = spawn(cmd, cmdArgs, { stdio: 'inherit', env });
child.on('exit', (code) => process.exit(code ?? 1));
