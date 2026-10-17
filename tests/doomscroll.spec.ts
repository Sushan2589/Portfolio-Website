import { expect, test } from "@playwright/test";

test("portrait stories support keyboard navigation, case studies, and focus restoration", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const launcher = page.getByRole("button", { name: /Doomscroll my portfolio/ });
  await launcher.click();
  const viewer = page.getByRole("dialog", { name: "Doomscroll my portfolio" });
  await expect(viewer).toBeVisible();
  const bounds = await viewer.boundingBox();
  expect(bounds!.width).toBeLessThan(bounds!.height);
  await expect(viewer.getByRole("button", { name: "Previous story", exact: true })).toBeDisabled();
  await page.keyboard.press("ArrowDown");
  await expect(viewer.getByRole("button", { name: "Go to Password Manager", exact: true })).toHaveAttribute("aria-current", "step");
  const passwordStory = viewer.getByRole("article", { name: "Password Manager", exact: true });
  await expect(passwordStory.getByRole("link", { name: "The story behind the build" })).toHaveAttribute("href", "/work/password-manager");
  await viewer.getByRole("button", { name: "Go to Your next move", exact: true }).click();
  await expect(viewer.getByRole("button", { name: "Next story", exact: true })).toBeDisabled();
  await viewer.getByRole("button", { name: "One more scroll?", exact: true }).click();
  await expect(viewer.getByRole("button", { name: "Go to Meet Sushan", exact: true })).toHaveAttribute("aria-current", "step");
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(launcher).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await launcher.click();
  await viewer.getByRole("button", { name: "Next story", exact: true }).click();
  await expect(viewer.getByRole("button", { name: "Go to Password Manager", exact: true })).toHaveAttribute("aria-current", "step");
  await passwordStory.getByRole("link", { name: "The story behind the build" }).click();
  await expect(page).toHaveURL(/\/work\/password-manager$/);
  await expect(page.getByRole("heading", { level: 1, name: "Password Manager" })).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  expect(errors).toEqual([]);
});

test("mobile stories fill the screen, swipe, and connect back to the portfolio", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: /Doomscroll my portfolio/ }).tap();
  const viewer = page.getByRole("dialog");
  const bounds = await viewer.boundingBox();
  expect(bounds!.width).toBe(390);
  expect(bounds!.height).toBe(844);
  const client = await context.newCDPSession(page);
  await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 180, y: 680 }] });
  for (const y of [610, 540, 470, 400, 330, 260, 190]) {
    await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 180, y }] });
    await page.waitForTimeout(35);
  }
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(viewer.getByRole("button", { name: "Go to Password Manager", exact: true })).toHaveAttribute("aria-current", "step");
  await viewer.getByRole("button", { name: "Go to Your next move", exact: true }).tap();
  await expect(viewer.getByRole("button", { name: "Let's connect", exact: true })).toBeVisible();
  await viewer.getByRole("button", { name: "Let's connect", exact: true }).tap();
  await expect(viewer).not.toBeVisible();
  await expect(page.locator("#contact")).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test("stories respect reduced motion and local pause controls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: /Doomscroll my portfolio/ }).click();
  const viewer = page.getByRole("dialog");
  expect(await viewer.evaluate(node => node.getAnimations({ subtree: true }).length)).toBe(0);
  await viewer.getByRole("button", { name: "Next story", exact: true }).click();
  await expect(viewer.getByRole("button", { name: "Go to Password Manager", exact: true })).toHaveAttribute("aria-current", "step");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await viewer.getByRole("button", { name: "Pause story animations", exact: true }).click();
  await expect.poll(() => viewer.evaluate(node => node.getAnimations({ subtree: true })
    .filter(animation => animation instanceof CSSAnimation)
    .every(animation => animation.playState === "paused" || animation.playState === "finished"))).toBe(true);
  await expect(viewer.getByRole("button", { name: "Play story animations", exact: true })).toHaveAttribute("aria-pressed", "true");
});

test("compact phones and landscape screens keep longer stories readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [{ width: 320, height: 568 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.getByRole("button", { name: /Doomscroll my portfolio/ }).click();
    const viewer = page.getByRole("dialog");
    expect(await viewer.locator("article").evaluateAll(nodes => nodes.every(node => node.scrollHeight <= node.clientHeight + 1))).toBe(true);
    await viewer.getByRole("button", { name: "Go to Vidya", exact: true }).click();
    await expect(viewer.getByRole("button", { name: "Go to Vidya", exact: true })).toHaveAttribute("aria-current", "step");
    await viewer.getByRole("button", { name: "Next story", exact: true }).click();
    await expect(viewer.getByRole("button", { name: "Go to How I think", exact: true })).toHaveAttribute("aria-current", "step");
    await viewer.getByRole("button", { name: "Close portfolio stories", exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
