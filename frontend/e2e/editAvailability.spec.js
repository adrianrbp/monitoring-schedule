import { test, expect } from "@playwright/test";

test.describe("Shift and Availability Table", () => {
  test("should render the correct availability and save it", async ({
    page,
  }) => {
    await page.goto("/");

    // Select a service
    await page.selectOption('select[aria-label="Selecciona un Servicio"]', {
      label: "Service A",
    });

    // Select a week
    await page.selectOption('select[aria-label="Selecciona una Semana"]', {
      label: "Semana 32 del 2024",
    });

    await page.click('button:has-text("Editar Disponibilidad")');

    // Check the rendering of the shift table
    await expect(
      page.locator('[aria-label="Day Lunes 05 de Agosto"]')
    ).toBeVisible();

    // Check the rendering of checkboxes
    await expect(
      page.locator('[aria-label="Availability Monday 09:00 Engineer 1"]')
    ).toBeVisible();

    // Check some checkboxes
    await page.check('[aria-label="Availability Monday 09:00 Engineer 1"]');
    await page.check('[aria-label="Availability Monday 10:00 Engineer 2"]');

    // Save availability
    await page.click('button:has-text("Ver Turnos")');
  });
});
