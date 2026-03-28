import { expect, type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';

/**
 * Forgot-password UI is reached from LoginPage; this object groups reset-specific expectations.
 */
export class ForgotPasswordPage extends LoginPage {
  constructor(page: Page) {
    super(page);
  }

  async expectResetFormVisible(): Promise<void> {
    await expect(this.forgotEmailInput).toBeVisible();
    await expect(
      this.page.getByRole('button', { name: /^Reset Password$/ })
    ).toBeVisible();
  }
}
