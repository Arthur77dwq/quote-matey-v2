import { expect, test } from '@playwright/test';

test('Website is running', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(
    'AI Quote Generator for Tradies | Quote Matey',
  );
});
