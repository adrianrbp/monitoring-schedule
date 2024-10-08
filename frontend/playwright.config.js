import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./e2e/test-results/",
  use: {
    baseURL: "http://localhost:8080",
  },
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ["list"],
    ["junit", { outputFile: "playwright-tests.xml" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    //   ['html', { outputFile: 'e2e/test-results/report.html' }],
  ],
});
