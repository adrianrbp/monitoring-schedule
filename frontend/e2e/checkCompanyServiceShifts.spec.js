const { test, expect } = require("@playwright/test");

test.describe("Check Company Service Shifts", () => {
  test("Page has the correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Company Service Shifts/);
    const h1 = await page.locator("h1");
    await expect(h1).toHaveText("Company Service Shifts");
  });
});
