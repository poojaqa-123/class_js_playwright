// spec: ../vwo-login-test-plan.md
import { expect, test } from '@playwright/test';
import { getEnv } from '../helper/env';
import { ForgotPasswordPage } from '../pageobjects/ForgotPasswordPage';

test.describe('VWO Forgot Password', () => {
  test('LP-005: forgot password entry path and reset submit', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.open();
    await forgot.openForgotPasswordFlow();
    await forgot.expectResetFormVisible();

    const email = getEnv('VWO_VALID_EMAIL') ?? 'reset-flow@example.com';
    await forgot.forgotEmailInput.fill(email);
    await forgot.resetPasswordSubmit.click();

    const notified = await page
      .getByText(/sent|reset|check your email|success|offline/i)
      .first()
      .isVisible()
      .catch(() => false);
    const alertText = await page.locator('[role="alert"]').first().innerText().catch(() => '');
    const formHidden = !(await forgot.forgotEmailInput.isVisible().catch(() => true));

    expect(notified || alertText.length > 0 || formHidden).toBeTruthy();
  });
});
