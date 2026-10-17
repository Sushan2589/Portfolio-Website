import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("resume downloads the supplied PDF from the hero and footer", async ({ page }) => {
  await page.goto("/");
  const heroLink = page.locator(".intro-actions").getByRole("link", { name: /Download Resume/ });
  await expect(page.locator(".site-footer").getByRole("link", { name: "Download Resume", exact: true })).toHaveAttribute("href", "/resume.pdf");
  const [download] = await Promise.all([page.waitForEvent("download"), heroLink.click()]);
  expect(download.suggestedFilename()).toBe("Sushan-Dahal-Resume.pdf");
  expect(await download.failure()).toBeNull();
  const downloaded = await readFile((await download.path())!);
  expect(downloaded).toEqual(await readFile("public/resume.pdf"));
  await expect(page).toHaveURL(/\/$/);
});

test("section links from other pages scroll home without a URL fragment", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#contact")).toBeInViewport();
  await expect(page.locator("#contact")).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/projects$/);

  await page.goto("/work/password-manager");
  await page.getByRole("link", { name: /Let.s talk/ }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#contact")).toBeInViewport();
  await page.getByRole("link", { name: "Back to top", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
  await expect(page).toHaveURL(/\/$/);
});

test("missing pages explain the detour and automatically return home", async ({ page }) => {
  for (const path of ["/this-page-does-not-exist", "/work/unknown-project"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Looks like this page took a wrong turn.");
    await expect(page.getByRole("link", { name: "Back home", exact: true })).toHaveAttribute("href", "/");
    await expect(page).toHaveURL(/\/$/, { timeout: 8000 });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("hey, Sushan here");
  }
});

test("slow navigation shows feedback until the destination loads", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/*", async route => {
    if (new URL(route.request().url()).pathname === "/projects" && route.request().headers()["rsc"] === "1") await gate;
    await route.continue();
  });
  try {
    await page.goto("/");
    await page.getByRole("link", { name: "View all projects", exact: true }).click();
    await expect(page.locator(".navigation-feedback")).toBeVisible();
    await expect(page.locator(".navigation-feedback")).toHaveText("Loading page…");
    release();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole("heading", { level: 1, name: "All projects" })).toBeVisible();
    await expect(page.locator(".navigation-feedback")).toHaveCount(0);
    await page.getByRole("link", { name: "Back home", exact: true }).click();
    await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("#about")).toBeInViewport();
    await expect(page.locator(".navigation-feedback")).toHaveCount(0);
  } finally {
    release();
  }
});

test("loading feedback stays visible above the stories dialog", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/*", async route => {
    if (new URL(route.request().url()).pathname === "/work/password-manager" && route.request().headers()["rsc"] === "1") await gate;
    await route.continue();
  });
  try {
    await page.goto("/");
    await page.getByRole("button", { name: /Doomscroll my portfolio/ }).click();
    const viewer = page.getByRole("dialog");
    await viewer.getByRole("button", { name: "Next story", exact: true }).click();
    await viewer.getByRole("article", { name: "Password Manager", exact: true }).getByRole("link", { name: "The story behind the build" }).click();
    await expect(viewer.locator(".navigation-feedback")).toBeVisible();
    release();
    await expect(page).toHaveURL(/\/work\/password-manager$/);
    await expect(viewer).not.toBeVisible();
    await expect(page.locator(".navigation-feedback")).toHaveCount(0);
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  } finally {
    release();
  }
});
