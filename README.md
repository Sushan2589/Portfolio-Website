# Sushan Dahal — Portfolio

A fresh, compact portfolio inspired by [prasen.dev](https://www.prasen.dev/): a centered reading column, personal introduction, small project cards, simple information rows, native disclosures, and a dotted contact panel. All content and illustrations are Sushan-specific; the reference’s portrait, achievements, counters, and projects are not reused.

## Run

Node.js 22+ and npm:

```sh
npm ci
npm run dev
```

Open the URL printed by Next.js. For production, run `npm run build` then `npm start`.

## Edit

- `src/content/site.ts`: email, GitHub, LinkedIn, résumé, deployed URL, and personal details.
- `src/content/appearance.ts`: `rainSpeed` controls both rain layers. `1` is normal, `0.5` is half speed, and `2` is twice as fast. Only positive numbers are used; invalid values fall back to normal speed. Pause and reduced motion continue to take precedence.
- `src/content/socials.ts`: add, reorder, or remove icons below the Say hello button. Supported icon names: `github`, `linkedin`, `x`, `instagram`, `youtube`, `website`, `email`, and `resume`. Replace `#linkhere` URLs to show additional icons; incomplete links remain hidden. The hero Say hello button uses `site.email` when valid and `mailto:me` otherwise.
- `src/content/projects.ts`: project summaries, status, role, technologies, links, screenshots, and case-study text. All three `/work/[slug]` pages come from this typed content.
- `src/content/experience.ts`: add timeline entries with organization, role, period, summary, optional detail bullets and a link. Keep newest entries first. The first five show by default; additional entries automatically go into the expandable “Show earlier experience” archive. Change `experiencePreviewCount` to show four instead. Stack groups are edited here too. Current entries are your editable sample content; replace them with real details before publication.
- `src/app/globals.css`: layout, Inter typography, light/dark palettes, and spacing.
- `src/components/avatar.tsx`: the SD monogram; replace with an actual portrait if desired.

Requested `#linkhere` placeholders remain in configuration and are hidden in the UI. The contact panel’s “Let’s talk” button explicitly links to `mailto:me`, as requested. Email copying and other email links appear only after a valid email is supplied. Clipboard failures show a fallback message. External links accept HTTP(S) URLs; the résumé can also be a local path such as `/resume.pdf`. Set `site.url` to the actual absolute deployed URL for correct social image URLs; localhost is the development fallback.

## Assets and missing details

No photo or screenshot is required to run the site. The avatar is a monogram, and all previews are explicitly labeled illustrations containing fictional example data.

Add real screenshots under `public/projects/` and set a project’s optional `image`:

```ts
image: {
  src: "/projects/password-manager.webp",
  alt: "Password manager vault screen showing saved entries",
  width: 1440,
  height: 900,
}
```

Images use `next/image`. A missing or failed screenshot falls back to a labeled illustration.

Still needed: email, LinkedIn, résumé, deployed URL, project links, actual experience entries, confirmed Password Manager and Vidya statuses, precise project contributions, the Fund My Vision and Vidya stacks, and factual review of the draft case studies. GitHub is already connected. No usage metrics, employment history, testimonials, or security certifications are invented. More detailed Password Manager claims need encryption/key-handling, recovery, testing, and security-review documentation.

## Performance and checks

The atmosphere uses a few CSS/SVG rain and cloud layers, a floating paper plane, shallow card hover depth, and a once-only handwritten name reveal. The experience line fills with native CSS scroll progress, including when older entries expand. Browsers without scroll-timeline support use a once-only line reveal. No animation library, WebGL, cursor tracking, scroll event loop, or per-frame JavaScript is used. One IntersectionObserver triggers the signature and fallback timeline. The header pause control persists its setting; decorative animation stops for reduced motion, and ambient motion pauses while the tab is hidden or JavaScript is unavailable. The archive uses native `details` and works without JavaScript. Content remains visible throughout. Inter is self-hosted, and theme preference is saved locally.

GitHub is configured as `https://github.com/Sushan2589`. The contribution calendar reads GitHub’s public date/level cells, tooltips, and reported total on the server, with a six-hour cache and eight-second request timeout. Nothing is fetched on every browser frame. If GitHub changes its markup or cannot be reached, the section shows a direct profile link instead of fabricated activity. Replace `site.github` with another GitHub profile to switch accounts.

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests cover 390px, 768px, and 1440px, all case-study routes, horizontal overflow, keyboard/touch disclosures, theme and motion-pause persistence, signature/timeline triggers, reduced motion, no-JavaScript navigation, GitHub parsing and actual activity, missing links, and long text. Tests use a dedicated production server on port 3177 (`PORTFOLIO_TEST_PORT` overrides it). Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use an existing Chromium executable. Screenshots are saved in ignored `test-results/`.

Verify actual external links and email copying after supplying real details. This is a local implementation; no hosting or deployment is configured. Full npm audit currently reports five development-tool findings through the ESLint/braces chain; the earlier runtime-only audit was clean.
