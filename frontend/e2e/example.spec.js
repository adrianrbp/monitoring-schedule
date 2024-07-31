// const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';

test('homepage has expected title', async ({ page }) => {
  await page.goto('http://vue:8080'); // Replace with your app's URL
  await expect(page).toHaveTitle(/Your App Title/); // Replace with your expected title
});
