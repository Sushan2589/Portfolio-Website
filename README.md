# Sushan Dahal — Portfolio

## Run locally

`npm install` then `npm run dev`.

## Production domain and SEO

The planned production origin is `https://sushandahal.com.np`, configured in `src/content/site.ts`. An optional `SITE_URL` environment variable overrides it for a domain migration. Set environment variables before building, because metadata and readable documents are generated at build time.

The site provides canonical URLs, Open Graph and Twitter cards, project share images, and JSON-LD for the person, website, profile, project collection, and case studies. Robots and sitemap settings come from the same origin. Vercel preview builds return `noindex` metadata, a disallow-all robots file, and an empty sitemap.

Public crawl and text endpoints:

- `/robots.txt`
- `/sitemap.xml` — only the canonical HTML pages, without invented modification dates
- `/llms.txt` — a short guide to the portfolio
- `/llms-full.txt` — the profile and case studies in one document
- `/index.md`, `/projects/index.md`, and `/work/<slug>/index.md` — Markdown versions generated from the site content

Markdown and text resources link back to the HTML canonical pages and send `X-Robots-Tag: noindex, follow`, so they remain fetchable without competing with the main pages in search. HTML pages advertise their Markdown alternate and the llms.txt guide. Edit the content modules to update the human-readable and machine-readable versions together.

`llms.txt` is a community proposal, not a guarantee of indexing, AI citations, or ranking. Standard SEO, useful content, and crawlability remain the foundation. Sources: [llms.txt proposal](https://llmstxt.org/) and [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).

## When the domain is connected

1. Deploy the production build and configure DNS and HTTPS for `sushandahal.com.np`.
2. Choose the apex domain as the primary host and redirect alternate hosts to it in the hosting provider settings.
3. Verify the domain in Google Search Console. If using HTML verification, set `GOOGLE_SITE_VERIFICATION` to the supplied token and rebuild; DNS verification does not require a token in the app.
4. Submit `https://sushandahal.com.np/sitemap.xml` and inspect the home page and case studies.
5. Check that any hosting-level crawler protection permits the public pages and assets. The app's robots.txt does not override CDN or hosting restrictions.

## Resume

Replace `public/resume.pdf` to update the downloaded resume.

## Checks

`npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:e2e`.
