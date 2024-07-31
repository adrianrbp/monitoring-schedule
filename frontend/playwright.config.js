// const { defineConfig } = require('@playwright/test');
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e/test-results/',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  // reporter: [
  //   ['list'],
  //   ['html', { outputFile: 'e2e/test-results/report.html' }],
  // ],
});
