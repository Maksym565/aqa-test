import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  retries: 1,
  workers: 1,
  use: {
    headless: false,
    actionTimeout: 10000,
    navigationTimeout: 30 * 1000,
    baseURL: process.env.TEST_URL,
    trace: 'on',
    acceptDownloads: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-html', open: 'always' }],
  ],

  outputDir: 'test-results/',
});
