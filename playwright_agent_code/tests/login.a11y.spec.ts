// spec: ../vwo-login-test-plan.md
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';

test.describe('VWO Login — accessibility', () => {
  test('login route has no serious or critical axe violations', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();
    const serious = results.violations.filter((v) =>
      v.impact === 'serious' || v.impact === 'critical'
    );
    expect(
      serious,
      serious.map((v) => `${v.id}: ${v.help}`).join('\n')
    ).toEqual([]);
  });

  test('primary inputs are exposed to the accessibility tree', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    const userRole = await login.username.getAttribute('role');
    const pwdRole = await login.password.getAttribute('role');
    expect(userRole === null || userRole === 'textbox').toBeTruthy();
    await expect(login.signIn).toBeVisible();
    await expect(login.forgotPassword).toBeVisible();
  });
});
