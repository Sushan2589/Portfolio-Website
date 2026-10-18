import { expect, test } from "@playwright/test";
import { githubUsername, parseContributions } from "../src/lib/github";
import { experience, experiencePreviewCount } from "../src/content/experience";
import { appearance } from "../src/content/appearance";
import { projects, selectedWorkCount } from "../src/content/projects";
const selectedCount = Math.min(projects.filter(project => project.featured).length, Math.max(0, Math.floor(selectedWorkCount)));
const slugs = ["password-manager", "fund-my-vision", "vidya"];
test("featured work leads to all projects and section navigation scrolls smoothly", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator("html").evaluate(node => getComputedStyle(node).scrollBehavior)).toBe("smooth");
  await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.locator("#contact").evaluate(node => {
    const target = Math.min(node.getBoundingClientRect().top + scrollY - 24, document.documentElement.scrollHeight - innerHeight);
    return Math.abs(scrollY - target);
  })).toBeLessThan(2);
  await page.getByRole("link", { name: "View all projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1, name: "All projects" })).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Projects", exact: true })).toHaveAttribute("href", "/projects");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: "Read case study", exact: true }).first().click();
  await expect(page.getByRole("link", { name: "All projects", exact: true })).toHaveAttribute("href", "/projects");
});
for (const width of [390, 768, 1440]) {
  test(`new homepage and case studies fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    expect((await page.goto("/"))?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("hey, Sushan here");
    await expect(page.locator(".project-card")).toHaveCount(selectedCount);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator(".site-atmosphere").evaluate(node => Math.ceil(node.getBoundingClientRect().height) >= document.body.scrollHeight)).toBe(true);
    await page.locator(".signature-block").scrollIntoViewIfNeeded();
    await expect(page.locator(".signature-block")).toHaveAttribute("data-in-view", "true");
    await expect.poll(async () => page.locator(".signature-underline").evaluate(node => getComputedStyle(node).strokeDashoffset)).toBe("0px");
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(page.locator(".experience-timeline")).toHaveAttribute("data-in-view", "true");
    await page.locator(".intro").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/new-home-${width}.png`, fullPage: true });
    await page.screenshot({ path: `test-results/new-viewport-${width}.png` });
    expect(await page.locator('a[href*="linkhere"]').count()).toBe(0);
    for (const slug of slugs) {
      expect((await page.goto(`/work/${slug}`))?.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page.locator(".illustration-label")).toContainText("ILLUSTRATION");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
test("dark is the default and theme choices persist with keyboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toHaveAttribute("aria-pressed", "true");
  for (const selector of [".email-box", ".small-button"]) {
    const colors = await page.locator(selector).first().evaluate(node => {
      const style = getComputedStyle(node);
      return { fill: style.backgroundImage, text: style.color };
    });
    expect(colors.fill).toContain("linear-gradient");
    const shade = colors.fill.match(/rgb\((\d+), (\d+), (\d+)\)/);
    expect(shade).not.toBeNull();
    expect(shade?.slice(1).every(channel => Number(channel) < 90)).toBe(true);
    expect(colors.text.match(/\d+/g)?.every(channel => Number(channel) > 200)).toBe(true);
  }
  await page.screenshot({ path: "test-results/new-dark.png", fullPage: true });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
test("experience shows only recent entries and archive works with keyboard", async ({ page }) => {
  await page.goto("/");
  const visible = Math.min(experience.length, experiencePreviewCount);
  await expect(page.locator(".experience-entry:visible")).toHaveCount(visible || 1);
  await expect(page.locator(".experience-entry a")).toHaveCount(0);
  await expect(page.getByText("More about this work")).toHaveCount(0);
  const entry = page.locator("details.experience-entry").first();
  if (await entry.count()) {
    await entry.locator(".experience-period").click();
    await expect(entry).toHaveAttribute("open", "");
    await expect(entry.locator(".experience-details")).toBeVisible();
    await entry.locator(".experience-role").click();
    await expect(entry).not.toHaveAttribute("open", "");
    await entry.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(entry).toHaveAttribute("open", "");
    await page.keyboard.press("Enter");
    await expect(entry).not.toHaveAttribute("open", "");
  }
  if (experience.length > experiencePreviewCount) {
    const summary = page.locator(".earlier-experience > summary");
    await expect(summary).toContainText(String(experience.length - experiencePreviewCount));
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".experience-entry:visible")).toHaveCount(experience.length);
    await expect(summary).toContainText("Hide earlier experience");
    await page.keyboard.press("Enter");
    await expect(page.locator(".experience-entry:visible")).toHaveCount(visible);
  }
});
test("timeline fill follows scroll rather than elapsed time", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  test.skip(!await page.evaluate(() => CSS.supports("animation-timeline", "view()")), "Browser uses the once-only fallback");
  const geometry = await page.locator(".experience-timeline").evaluate(node => {
    const bounds = node.getBoundingClientRect();
    return { top: bounds.top + scrollY, height: bounds.height };
  });
  const progress = () => page.locator(".timeline-line").evaluate(node => {
    const transform = getComputedStyle(node, "::after").transform;
    return transform === "none" ? 1 : new DOMMatrixReadOnly(transform).d;
  });
  await page.evaluate(top => window.scrollTo(0, Math.max(0, top - innerHeight + 20)), geometry.top);
  await expect.poll(progress).toBeLessThan(.1);
  await page.evaluate(top => window.scrollTo(0, top), geometry.top + geometry.height * .35);
  await expect.poll(progress).toBeGreaterThan(.8);
  await page.evaluate(top => window.scrollTo(0, Math.max(0, top - innerHeight + 20)), geometry.top);
  await expect.poll(progress).toBeLessThan(.1);
});
test("simplified hero action and configured social icons", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Email me", exact: true })).toHaveAttribute("href", "mailto:sushandahal06@gmail.com");
  await expect(page.getByRole("link", { name: "Explore my work" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "A little about me" })).toHaveCount(0);
  await expect(page.getByText("Elsewhere on the internet")).toHaveCount(0);
  await expect(page.locator(".email-box .lucide-arrow-up-right, .contact-pill .lucide-arrow-up-right, .small-button .lucide-arrow-up-right")).toHaveCount(0);
  await expect(page.locator(".social-links").getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute("href", "https://github.com/Sushan2589");
  await expect(page.locator(".social-links").getByRole("link", { name: "Instagram" })).toHaveCount(0);
});
test("native details work with keyboard and mobile navigation with touch", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto("/");
  await page.locator(".mobile-menu summary").tap();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About" }).tap();
  await expect(page).toHaveURL(/\/$/);
  const summary = page.locator(".principle summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".principle").first()).toHaveAttribute("open", "");
  await expect(page.locator(".principle").first().locator("p")).toBeVisible();
  expect(await summary.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page.locator(".principle").first()).not.toHaveAttribute("open", "");
  await context.close();
});
test("reduced motion disables decoration and leaves signatures visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  expect(await page.locator(".timeline-line").evaluate(node => new DOMMatrixReadOnly(getComputedStyle(node, "::after").transform).d)).toBe(1);
  await expect(page.locator(".workbench")).toHaveCount(0);
  await expect(page.locator(".project-card")).toHaveCount(selectedCount);
  await expect(page.getByRole("button", { name: "Decorative motion disabled by system preference" })).toBeDisabled();
  expect(await page.locator(".signature-ink").first().evaluate(node => getComputedStyle(node).strokeDashoffset)).toBe("0px");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});
test("weather pauses and the choice persists without blocking content", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator(".rain-layer").first().evaluate(node => getComputedStyle(node).animationName)).toBe("quiet-rain");
  expect(await page.locator(".rain-layer").first().evaluate(node => getComputedStyle(node).animationDuration)).toBe(`${7 / appearance.rainSpeed}s`);
  await expect(page.locator(".rain-spark")).toHaveCount(2);
  await page.getByRole("button", { name: "Pause decorative motion" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  expect(await page.locator(".rain-layer").first().evaluate(node => getComputedStyle(node).animationPlayState)).toBe("paused");
  for (const selector of [".floating-tech", ".status-dot"]) {
    expect(await page.locator(selector).first().evaluate(node => getComputedStyle(node).animationPlayState)).toBe("paused");
  }
  await page.reload();
  await expect(page.getByRole("button", { name: "Resume decorative motion" })).toBeVisible();
  await page.getByRole("button", { name: "Resume decorative motion" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "playing");
  await expect(page.locator("h1")).toBeVisible();
});
test("real GitHub profile and contribution data render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Behind the Scenes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Experience", exact: true })).toBeVisible();
  await expect(page.locator(".stack-tags")).toHaveCount(3);
  await expect(page.locator(".github-heading a")).toHaveAttribute("href", "https://github.com/Sushan2589");
  expect(await page.locator(".contribution-cell").count()).toBeGreaterThan(300);
  await expect(page.locator(".contribution-figure figcaption")).toContainText("contributions in the last year");
});
test("calendar parser preserves source data and rejects invalid profiles", () => {
  expect(githubUsername("https://github.com/Sushan2589")).toBe("Sushan2589");
  expect(githubUsername("https://github.com/../other" )).toBeNull();
  expect(githubUsername("#linkhere")).toBeNull();
  const parsed = parseContributions('<h2 id="js-contribution-activity-description">1,234 contributions in the last year</h2><td data-level="3" id="day-1" data-date="2026-10-01"></td><tool-tip for="day-1">5 contributions on October 1st.</tool-tip>');
  expect(parsed).toEqual({ total: 1234, days: [{ date: "2026-10-01", level: 3, label: "5 contributions on October 1st." }] });
  expect(parseContributions("unavailable")).toBeNull();
});
test("navigation and disclosure content work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await page.locator(".mobile-menu summary").click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.locator(".principle summary").first().click();
  await expect(page.locator(".principle p").first()).toBeVisible();
  if (experience.length > experiencePreviewCount) {
    await page.locator(".earlier-experience > summary").click();
    await expect(page.locator(".experience-entry:visible")).toHaveCount(experience.length);
  }
  await page.getByRole("link", { name: "Read case study", exact: true }).first().click();
  await expect(page).toHaveURL(/work\/password-manager$/);
  await expect(page.getByText("Authentication and vault encryption have separate responsibilities.")).toBeVisible();
  await context.close();
});
test("links, missing assets, and long text", async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const hrefs = await page.locator("a").evaluateAll(nodes => nodes.map(node => node.getAttribute("href")).filter((href): href is string => Boolean(href)));
  for (const href of new Set(hrefs)) {
    if (href.startsWith("#")) await expect(page.locator(href)).toHaveCount(1);
    else if (href.startsWith("/")) expect((await request.get(href.split("#")[0] || "/")).ok()).toBe(true);
  }
  await expect(page.locator(".illustration-label")).toHaveText(["INTERFACE ILLUSTRATION", "INTERFACE ILLUSTRATION"]);
  await expect(page.getByRole("link", { name: /Start a conversation/ })).toHaveAttribute("href", "mailto:sushandahal06@gmail.com");
  await expect(page.getByRole("button", { name: "Copy email address" })).toHaveCount(1);
  await page.locator(".project-card-body > p").first().evaluate(node => { node.textContent = "A longer project description about practical applications and thoughtful development. ".repeat(8); });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await request.get("/work/unknown-project")).status()).toBe(404);
});
