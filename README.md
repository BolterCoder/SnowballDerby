# Snowball Derby Archive

A Vite + React + TypeScript archive for Snowball Derby history, driver profiles, records, timelines, and Five Flags Speedway context.

## Requirements

- Node.js 22.x
- npm 10+

## Local Development

```bash
npm install
npm run dev
```

The default Vite dev URL is usually `http://localhost:5173`.

## Environment

Set `VITE_SITE_URL` before production builds so canonical URLs, structured data, `robots.txt`, and `sitemap.xml` all point to the real domain.

Example:

```bash
cp .env.example .env.local
```

```bash
VITE_SITE_URL=https://archive.example.com npm run build
```

## Commands

```bash
npm run dev
npm test
npm run build
npm run preview
```

`npm run build` does three things:

1. Generates `public/robots.txt` and `public/sitemap.xml`
2. Type-checks the app
3. Builds the production bundle with Vite

## Production Checklist

Before launch:

1. Set `VITE_SITE_URL` to the live canonical domain.
2. Confirm your host serves `index.html` as the SPA fallback for nested routes like `/races/2025` and `/drivers/rich-bickle`.
3. Verify `/robots.txt` and `/sitemap.xml` are reachable on the deployed domain.
4. Spot-check canonical tags and JSON-LD on `/`, `/races/2025`, and `/drivers/rich-bickle`.
5. Run `npm test` and `npm run build` before every deploy.

## Deploying To Vercel

1. Push this repo to GitHub, GitLab, or Bitbucket.
2. In Vercel, create a new project and import the repository.
3. Let Vercel detect the app as `Vite`.
4. Set the Vercel Node.js version to `22.x` or let [package.json](/Users/frankbolter/Desktop/snowball-derby/package.json) enforce it automatically.
5. In the Vercel project settings, add the environment variable `VITE_SITE_URL` with your live domain, for example `https://snowballderbyarchive.com`.
6. Deploy.

This repo includes [vercel.json](/Users/frankbolter/Desktop/snowball-derby/vercel.json) so client-side routes such as `/races/2025` and `/drivers/rich-bickle` resolve correctly on refresh and direct visits.

## Notes

- The app is route-driven and content-driven; race and driver pages are generated from local datasets and curated content modules.
- SEO assets are generated at build time from the race and driver datasets, so new pages are picked up automatically when data is added.
- If you deploy behind a CDN, enable compression and long-lived caching for static assets under `/assets/`.
