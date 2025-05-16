import { test, expect } from '@playwright/test';

test.describe('E2E – Users flow', () => {
  test('Créer et lister un utilisateur', async ({ page }) => {
    await page.goto('/');

    const items = page.getByRole('listitem');

    const input = page.getByLabel('Nom :');
    await input.fill('Diane');

    const créer = page.getByRole('button', { name: 'Créer' });

    await Promise.all([
      page.waitForResponse(resp => resp.url().endsWith('/users') && resp.request().method() === 'POST'),
      créer.click(),
    ]);

    // Vérifier que le dernier élément correspond bien à "Diane"
    await expect(items.last()).toHaveText('Diane');
  });
});
