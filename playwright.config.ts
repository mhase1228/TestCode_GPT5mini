import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 30_000,
  use: {
    headless: true,
    baseURL: 'https://hotel-example-site.takeyaqa.dev/ja/',
    viewport: { width: 1280, height: 800 }
  },
  testDir: './tests',
  retries: 0
};

export default config;
