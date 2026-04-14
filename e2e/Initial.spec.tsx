import { expect, test } from '@playwright/test';

test('Website is running', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(
    'QuoteMatey - Quote Faster, Win More Jobs | AI Quoting for Tradies',
  );
});
