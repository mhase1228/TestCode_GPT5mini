import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  });
});
