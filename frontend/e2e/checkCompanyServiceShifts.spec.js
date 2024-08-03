const { test, expect } = require("@playwright/test");

test.describe("Check Company Service Shifts", () => {
  test("Page has the correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Company Service Shifts/);

    const mainTitle = await page.locator("h1");
    await expect(mainTitle).toHaveText("Company Service Shifts");
  });

  test("Shows dropdown with options", async ({ page }) => {
    await page.goto("/");

    // Select a service
    await page.selectOption("select#companyService", "Service A");
    // Select a week
    await page.selectOption("select#week", "Week 32 in 2024");

    // Show Subtitle
    const weekRangeDatesTitle = await page.locator("h2");
    await expect(weekRangeDatesTitle).toHaveText(
      "From 04/08/2024 to 10/08/2024"
    );
  });
});
