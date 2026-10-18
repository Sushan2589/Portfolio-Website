import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";
import { projects } from "../src/content/projects";

const origin = new URL(process.env.SITE_URL || site.url).origin;
const pages = [
  { path: "/", title: "Sushan Dahal", schema: "ProfilePage", image: "/opengraph-image" },
  { path: "/projects", title: "Projects", schema: "CollectionPage", image: "/opengraph-image" },
  ...projects.map(project => ({ path: `/work/${project.slug}`, title: project.name, schema: "WebPage", image: `/work/${project.slug}/opengraph-image` })),
];

for (const entry of pages) {
  test(`server HTML has canonical metadata, structured data, and a working share image: ${entry.path}`, async ({ browser, request }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(entry.path);
    await expect(page).toHaveTitle(new RegExp(entry.title));
    const canonical = new URL(entry.path, `${origin}/`).toString();
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    // Next normalizes a root canonical to the origin without its trailing slash.
    expect(new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!).href).toBe(canonical);
    expect(new URL((await page.locator('meta[property="og:url"]').getAttribute("content"))!).href).toBe(canonical);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", new RegExp(entry.title));
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", new RegExp(entry.title));
    await expect(page.locator('link[rel="describedby"]')).toHaveAttribute("href", "/llms.txt");
    const markdown = entry.path === "/" ? "/index.md" : `${entry.path}/index.md`;
    await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute("href", `${origin}${markdown}`);

    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const nodes = schemas.flatMap(text => { const data = JSON.parse(text); return data["@graph"] ?? [data]; });
    expect(nodes.some(node => node["@type"] === entry.schema)).toBe(true);
    expect(nodes.find(node => node["@type"] === "Person").name).toBe("Sushan Dahal");
    expect(schemas.join("")).not.toContain("my-project.com");
    const imageUrl = new URL((await page.locator('meta[property="og:image"]').first().getAttribute("content"))!);
    expect(imageUrl.origin).toBe(origin);
    expect(imageUrl.pathname).toBe(entry.image);
    const image = await request.get(`${imageUrl.pathname}${imageUrl.search}`);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
    const bytes = await image.body();
    expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
    const twitterImage = new URL((await page.locator('meta[name="twitter:image"]').getAttribute("content"))!);
    expect(twitterImage.origin).toBe(origin);
    expect(twitterImage.pathname).toBe(entry.image);
    await context.close();
  });
}

test("robots and sitemap publish only real canonical pages", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  expect(await robots.text()).toContain("User-Agent: *");
  expect(await robots.text()).toContain("Allow: /");
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  expect(locations.sort()).toEqual(pages.map(page => new URL(page.path, `${origin}/`).toString()).sort());
  expect(xml).not.toContain("<lastmod>");
  expect(xml).not.toContain("localhost");
});

test("the AI reading guide links to readable documents and the real resume", async ({ request }) => {
  const guide = await request.get("/llms.txt");
  expect(guide.status()).toBe(200);
  expect(guide.headers()["content-type"]).toContain("text/plain");
  const text = await guide.text();
  expect(text).toContain("# Sushan Dahal");
  expect(text).not.toContain("localhost");
  const links = [...text.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(match => new URL(match[1])).filter(url => url.origin === origin);
  expect(links.length).toBeGreaterThan(5);
  for (const url of links) {
    expect((await request.get(url.pathname)).status(), url.pathname).toBe(200);
  }
  const profile = await request.get("/index.md");
  expect(profile.headers()["content-type"]).toContain("text/markdown");
  expect(profile.headers()["x-robots-tag"]).toContain("noindex");
  expect(profile.headers()["link"]).toContain(`<${origin}/>; rel="canonical"`);
  expect(await profile.text()).toContain("National SXC Science Fest");
  expect(await profile.text()).toContain("PCPS Hack4Impact");
  const project = await request.get("/work/fund-my-vision/index.md");
  expect(await project.text()).toContain("Node.js and Express.js");
  expect(await project.text()).not.toContain("my-project.com");
  expect((await request.get("/work/missing-project/index.md")).status()).toBe(404);
  const missing = await request.get("/work/missing-project");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toMatch(/name="robots" content="noindex/);
});
