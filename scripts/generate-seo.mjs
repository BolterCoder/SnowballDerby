import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { raceData } from '../src/data/races.ts';
import { getDriverSlug, mergedDriverData } from '../src/lib/drivers.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..');
const publicDir = path.join(workspaceRoot, 'public');
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/+$/g, '');
const generatedOn = new Date().toISOString().slice(0, 10);

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toAbsoluteUrl(routePath) {
  return new URL(routePath, `${siteUrl}/`).toString();
}

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/races', changefreq: 'weekly', priority: '0.95' },
  { path: '/drivers', changefreq: 'weekly', priority: '0.9' },
  { path: '/records', changefreq: 'monthly', priority: '0.8' },
  { path: '/timeline', changefreq: 'monthly', priority: '0.8' },
  { path: '/legends', changefreq: 'monthly', priority: '0.75' },
  { path: '/event', changefreq: 'monthly', priority: '0.75' },
].map((entry) => ({
  ...entry,
  lastmod: generatedOn,
}));

const raceRoutes = raceData.map((race) => ({
  path: `/races/${race.year}`,
  lastmod: race.date ?? generatedOn,
  changefreq: 'yearly',
  priority: '0.85',
}));

const driverRoutes = mergedDriverData.map((driver) => ({
  path: `/drivers/${getDriverSlug(driver.name)}`,
  lastmod: generatedOn,
  changefreq: 'monthly',
  priority: '0.7',
}));

const allRoutes = [...staticRoutes, ...raceRoutes, ...driverRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(toAbsoluteUrl(route.path))}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${toAbsoluteUrl('/sitemap.xml')}
`;

await writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`Generated sitemap and robots.txt for ${siteUrl}`);
