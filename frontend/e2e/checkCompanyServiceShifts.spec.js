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

    // Check if all days are rendered
    const days = [
      "Lunes 05 de Agosto",
      "Martes 06 de Agosto",
      "Miercoles 07 de Agosto",
      "Jueves 08 de Agosto",
      "Viernes 09 de Agosto",
      "Sabado 10 de Agosto",
      "Domingo 11 de Agosto",
    ];

    for (const day of days) {
      await expect(page.locator(`[aria-label="Day ${day}"]`)).toBeVisible();
      await expect(page.locator(`[aria-label="Header ${day}"]`)).toHaveText(
        day
      );
    }

    const timeBlocks = [
      { start: "09:00", end: "10:00", engineer: "Engineer 1" },
      { start: "10:00", end: "11:00", engineer: "Engineer 2" },
    ];

    // Check if time blocks and engineers are rendered correctly for a specific day
    for (const timeBlock of timeBlocks) {
      const specificTimeBlock = page.locator(
        `[aria-label="Time block Lunes 05 de Agosto ${timeBlock.start}"]`
      );

      await expect(specificTimeBlock).toBeVisible();
      await expect(
        specificTimeBlock.locator(`[aria-label="Hour ${timeBlock.start}"]`)
      ).toHaveText(`${timeBlock.start} - ${timeBlock.end}`);
      await expect(
        specificTimeBlock.locator(
          `[aria-label="Assigned Engineer ${timeBlock.engineer}"]`
        )
      ).toHaveText(timeBlock.engineer);
    }

    // Check for an unassigned time block
    const unassignedTimeBlock = page.locator(
      '[aria-label="Time block Martes 06 de Agosto 09:00"]'
    );
    await expect(unassignedTimeBlock).toBeVisible();
    await expect(
      unassignedTimeBlock.locator('[aria-label="Hour 09:00"]')
    ).toHaveText("09:00 - 10:00");
    await expect(
      unassignedTimeBlock.locator('[aria-label="Assigned Engineer ⚠"]')
    ).toHaveText("⚠");
  });
});
