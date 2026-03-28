import type { Page } from '@playwright/test';
import { loginRoutes } from '../testdata/login.data';

function baseUrl(): string {
  return process.env.VWO_BASE_URL?.replace(/\/$/, '') ?? 'https://app.vwo.com';
}

/**
 * Opens VWO app and waits until the login form is ready.
 */
export async function gotoLogin(page: Page): Promise<void> {
  const root = baseUrl();
  await page.goto(`${root}/`, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await page
    .locator('#login-username')
    .waitFor({ state: 'visible', timeout: 90_000 })
    .catch(async () => {
      await page.goto(`${root}/${loginRoutes.loginHash}`, { waitUntil: 'domcontentloaded' });
      await page.locator('#login-username').waitFor({ state: 'visible', timeout: 60_000 });
    });
}

export function isLoginUrl(url: string): boolean {
  return url.includes('login') || url.includes(loginRoutes.loginHash);
}
