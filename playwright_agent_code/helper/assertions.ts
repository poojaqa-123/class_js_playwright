import { expect, type Locator, type Page } from '@playwright/test';
import { isLoginUrl } from './navigation';

export async function expectPasswordMasked(input: Locator): Promise<void> {
  await expect(input).toHaveAttribute('type', 'password');
}

/**
 * After failed login, expect we remain on login or see inline/toast error (wording varies by network/backend).
 */
export async function expectLoginFailedOrStillOnLogin(page: Page): Promise<void> {
  const url = page.url();
  const alert = page.locator('[role="alert"]');
  const hasAlert = await alert.first().isVisible().catch(() => false);
  if (!isLoginUrl(url) && !hasAlert) {
    throw new Error(`Expected login URL or error UI; got ${url}`);
  }
}
