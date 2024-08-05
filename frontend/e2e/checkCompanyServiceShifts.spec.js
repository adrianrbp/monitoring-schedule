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
    await page.selectOption('select[aria-label="Selecciona un Servicio"]', {
      label: "Service A",
    });

    // Select a week
    await page.selectOption('select[aria-label="Selecciona una Semana"]', {
      label: "Semana 32 del 2024",
    });

    // Show Subtitle
    const dateRange = await page.locator("text=Del 05/08/2024 al 11/08/2024");
    await expect(dateRange).toBeVisible();
  });
});
