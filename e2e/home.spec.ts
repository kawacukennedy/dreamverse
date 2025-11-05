import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/DreamVerse/)
  await expect(page.locator('text=Welcome to DreamVerse')).toBeVisible()
})