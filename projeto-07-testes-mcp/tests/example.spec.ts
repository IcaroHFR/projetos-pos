import { test, expect } from '@playwright/test';

test('should load the demo app and show the expected title', async ({ page }) => {
  await page.goto('/vanilla-js-web-app-example/');
  await expect(page).toHaveTitle(/Vanilla JS Web App Example/i);
  await expect(page.locator('text=Image Title')).toBeVisible();
  await expect(page.locator('text=Submit')).toBeVisible();
  await expect(page.locator('text=AI Alien')).toBeVisible();
});
