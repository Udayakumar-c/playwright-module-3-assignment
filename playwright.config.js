//@ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 }, 
  fullyParallel: false,
  retries: 0,
  reporter: [ 
    ['list'],
    ['html', { 
      outputFolder: 'playwright-report', 
      open: 'never' } ],
],
  use: {
    ...devices['Desktop Chrome'],
    headless: true,
    screenshot: 'on',          // evidence: screenshot for every test
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  outputDir: 'test-results',
}); 
