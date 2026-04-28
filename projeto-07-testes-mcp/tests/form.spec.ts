import { test, expect } from '@playwright/test';

test.describe('image form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/vanilla-js-web-app-example/');
  });

  test('submits the form and adds a new image card', async ({ page }) => {
    const titleField = page.getByRole('textbox', { name: 'Image Title' });
    const urlField = page.getByRole('textbox', { name: 'Image URL' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    await expect(titleField).toBeVisible();
    await expect(urlField).toBeVisible();
    await expect(submitButton).toBeVisible();

    const cardTitles = page.locator('h4.card-title');
    await expect(cardTitles).toHaveCount(3);

    await titleField.fill('Playwright Test Image');
    await urlField.fill('https://example.com/test-image.png');
    await submitButton.click();

    await expect(cardTitles).toHaveCount(4);
    await expect(page.locator('h4.card-title', { hasText: 'Playwright Test Image' })).toBeVisible();
  });

  test('shows validation error when title is missing', async ({ page }) => {
    const urlField = page.getByRole('textbox', { name: 'Image URL' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    await urlField.fill('https://example.com/valid.png');
    await submitButton.click();

    await expect(page.locator('#title:invalid')).toHaveCount(1);
    await expect(page.locator('#titleFeedback')).toBeVisible();
    await expect(page.locator('h4.card-title', { hasText: 'Playwright Test Image' })).toHaveCount(0);
  });

  test('shows validation error for invalid URL', async ({ page }) => {
    const titleField = page.getByRole('textbox', { name: 'Image Title' });
    const urlField = page.getByRole('textbox', { name: 'Image URL' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    await titleField.fill('Invalid URL Test');
    await urlField.fill('not-a-valid-url');
    await submitButton.click();

    await expect(page.locator('#imageUrl:invalid')).toHaveCount(1);
    await expect(page.locator('#urlFeedback')).toBeVisible();
    await expect(page.locator('h4.card-title', { hasText: 'Invalid URL Test' })).toHaveCount(0);
  });

  test('rejects whitespace-only inputs', async ({ page }) => {
    const titleField = page.getByRole('textbox', { name: 'Image Title' });
    const urlField = page.getByRole('textbox', { name: 'Image URL' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    await titleField.fill('   ');
    await urlField.fill('https://example.com/valid.png');
    await submitButton.click();

    await expect(page.locator('#title:invalid')).toHaveCount(1);
  });

  test('rejects URL with missing protocol', async ({ page }) => {
    const titleField = page.getByRole('textbox', { name: 'Image Title' });
    const urlField = page.getByRole('textbox', { name: 'Image URL' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    await titleField.fill('Missing Protocol Test');
    await urlField.fill('example.com/image.png');
    await submitButton.click();

    await expect(page.locator('#imageUrl:invalid')).toHaveCount(1);
  });

  test('accepts various valid URL formats', async ({ page }) => {
    const titleField = page.getByRole('textbox', { name: 'Image Title' });
    const urlField = page.getByRole('textbox', { name: 'Image URL' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    const cardTitles = page.locator('h4.card-title');
    const initialCount = (await cardTitles.count());

    await titleField.fill('HTTPS URL Test');
    await urlField.fill('https://example.com/image.png');
    await submitButton.click();
    await expect(cardTitles).toHaveCount(initialCount + 1);

    await titleField.fill('HTTP URL Test');
    await urlField.fill('http://example.com/image.jpg');
    await submitButton.click();
    await expect(cardTitles).toHaveCount(initialCount + 2);

    await titleField.fill('Complex URL Test');
    await urlField.fill('https://example.com/path/to/image.png?size=large&format=png');
    await submitButton.click();
    await expect(cardTitles).toHaveCount(initialCount + 3);
  });

  test('accepts title with special characters', async ({ page }) => {
    const titleField = page.getByRole('textbox', { name: 'Image Title' });
    const urlField = page.getByRole('textbox', { name: 'Image URL' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    const cardTitles = page.locator('h4.card-title');
    const initialCount = (await cardTitles.count());

    await titleField.fill('Test @ Image #1');
    await urlField.fill('https://example.com/image.png');
    await submitButton.click();

    await expect(cardTitles).toHaveCount(initialCount + 1);
    await expect(page.locator('h4.card-title', { hasText: 'Test @ Image #1' })).toBeVisible();
  });

  test('requires both fields before submission', async ({ page }) => {
    const titleField = page.getByRole('textbox', { name: 'Image Title' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    const cardTitles = page.locator('h4.card-title');
    const initialCount = (await cardTitles.count());

    await titleField.fill('Title Only');
    await submitButton.click();

    await expect(page.locator('#imageUrl:invalid')).toHaveCount(1);
    await expect(cardTitles).toHaveCount(initialCount);
  });

  test('clears form fields after successful submission', async ({ page }) => {
    const titleField = page.getByRole('textbox', { name: 'Image Title' });
    const urlField = page.getByRole('textbox', { name: 'Image URL' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    await titleField.fill('First Image');
    await urlField.fill('https://example.com/first.png');
    await submitButton.click();

    await expect(titleField).toHaveValue('');
    await expect(urlField).toHaveValue('');
  });

  test('handles very long title input', async ({ page }) => {
    const titleField = page.getByRole('textbox', { name: 'Image Title' });
    const urlField = page.getByRole('textbox', { name: 'Image URL' });
    const submitButton = page.getByRole('button', { name: 'Submit Form' });

    const longTitle = 'A'.repeat(100);
    const cardTitles = page.locator('h4.card-title');
    const initialCount = (await cardTitles.count());

    await titleField.fill(longTitle);
    await urlField.fill('https://example.com/image.png');
    await submitButton.click();

    await expect(cardTitles).toHaveCount(initialCount + 1);
  });
});
