const args = process.argv.slice(2);
const queryIndex = args.indexOf('--query');
const query = queryIndex >= 0 ? args.slice(queryIndex + 1).join(' ') : 'architecture';

const accessKey = process.env.UNSPLASH_ACCESS_KEY;
if (!accessKey) {
  process.stderr.write('Missing UNSPLASH_ACCESS_KEY\n');
  process.exit(1);
}

const url =
  'https://api.unsplash.com/photos/random?' +
  new URLSearchParams({
    query,
    orientation: 'landscape',
    content_filter: 'high',
    client_id: accessKey,
  }).toString();

const res = await fetch(url);
if (!res.ok) {
  process.stderr.write(`Unsplash error: ${res.status} ${res.statusText}\n`);
  process.exit(1);
}

const data = await res.json();
const result = {
  query,
  id: data.id,
  url: data.urls?.regular,
  download: data.links?.download_location,
  author: data.user?.name,
  authorUrl: data.user?.links?.html,
  sourceUrl: data.links?.html,
  license: 'Unsplash License',
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);

