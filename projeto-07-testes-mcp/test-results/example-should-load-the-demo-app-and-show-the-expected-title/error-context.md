# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> should load the demo app and show the expected title
- Location: tests/example.spec.ts:3:5

# Error details

```
Test timeout of 5000ms exceeded.
```

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Vanilla JS Web App Example/i
Received string:  "TDD Frontend Example"

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    8 × unexpected value "TDD Frontend Example"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e5]:
    - generic [ref=e7]:
      - generic "Image Title Icon" [ref=e8]: 💥
      - generic [ref=e9]: Image Title
      - textbox "Image Title" [ref=e10]
    - generic [ref=e12]:
      - generic "Image URL Icon" [ref=e13]: 📸
      - generic [ref=e14]: Image URL
      - textbox "Image URL" [ref=e15]:
        - /placeholder: https://img.com/erick.png
    - button "Submit Form" [ref=e17] [cursor=pointer]
  - main [ref=e18]:
    - generic [ref=e19]:
      - article [ref=e20]:
        - figure "AI Alien" [ref=e22]:
          - img "Image of an AI Alien" [ref=e23]
          - heading "AI Alien" [level=4] [ref=e25]
      - article [ref=e26]:
        - figure "Predator Night Vision" [ref=e28]:
          - img "Image of Predator Night Vision" [ref=e29]
          - heading "Predator Night Vision" [level=4] [ref=e31]
      - article [ref=e32]:
        - figure "ET Bilu" [ref=e34]:
          - img "Image of ET Bilu" [ref=e35]
          - heading "ET Bilu" [level=4] [ref=e37]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('should load the demo app and show the expected title', async ({ page }) => {
  4  |   await page.goto('/vanilla-js-web-app-example/');
> 5  |   await expect(page).toHaveTitle(/Vanilla JS Web App Example/i);
     |                      ^ Error: expect(page).toHaveTitle(expected) failed
  6  |   await expect(page.locator('text=Image Title')).toBeVisible();
  7  |   await expect(page.locator('text=Submit')).toBeVisible();
  8  |   await expect(page.locator('text=AI Alien')).toBeVisible();
  9  | });
  10 | 
```