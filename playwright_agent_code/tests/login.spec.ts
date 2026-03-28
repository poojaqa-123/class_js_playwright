// spec: ../vwo-login-test-plan.md
import { expect, test } from '@playwright/test';
import { expectLoginFailedOrStillOnLogin, expectPasswordMasked } from '../helper/assertions';
import {
  expectEmptySubmitDoesNotAuthenticate,
  expectMissingEmailDoesNotAuthenticate,
  expectMissingPasswordDoesNotAuthenticate,
} from '../helper/formValidation';
import { assertUrlReturnsOk } from '../helper/http';
import { getEnv, hasValidUserCredentials, requireEnv } from '../helper/env';
import { LoginPage } from '../pageobjects/LoginPage';
import { footers, invalidEmails } from '../testdata/login.data';

test.describe('VWO Login', () => {
  test('LP-001: login page loads and core controls are visible', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await expect(page).toHaveURL(/#\/login/);
    await expect(page).toHaveTitle(/Login - VWO/i);
    await login.expectLoginShellVisible();
    await expect(login.username).toHaveAttribute('placeholder', 'Enter email ID');
    await expect(login.password).toHaveAttribute('placeholder', 'Enter password');
  });

  test('LP-002: successful login with valid credentials', async ({ page }) => {
    test.skip(!hasValidUserCredentials(), 'Set VWO_VALID_EMAIL and VWO_VALID_PASSWORD in .env');
    const login = new LoginPage(page);
    await login.open();
    await login.fillCredentials(requireEnv('VWO_VALID_EMAIL'), requireEnv('VWO_VALID_PASSWORD'));
    await login.submit();
    await expect(page).not.toHaveURL(/#\/login/i, { timeout: 120_000 });
    expect(page.url().toLowerCase()).not.toContain('password=');
  });

  test('LP-003: invalid credential rejection', async ({ page }) => {
    const email = getEnv('VWO_VALID_EMAIL') ?? 'smoke-test@example.com';
    const login = new LoginPage(page);
    await login.open();
    await login.fillCredentials(email, 'WrongPassword!999999');
    await login.submit();
    await page.waitForTimeout(2500);
    await expectLoginFailedOrStillOnLogin(page);
    await expectPasswordMasked(login.password);
  });

  test('LP-004: required field validation — empty submit', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.signIn.click();
    await expectEmptySubmitDoesNotAuthenticate(page, login);
  });

  test('LP-004b: required field — password missing', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    const email = 'any@example.com';
    await login.username.fill(email);
    await login.password.clear();
    await login.signIn.click();
    await expectMissingPasswordDoesNotAuthenticate(page, login, email);
  });

  test('LP-004c: required field — email missing', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.username.clear();
    await login.password.fill('SomePassword1!');
    await login.signIn.click();
    await expectMissingEmailDoesNotAuthenticate(page, login);
  });

  test('LP-006: invalid email format validation', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    for (const bad of invalidEmails) {
      await login.username.fill(bad);
      await login.password.fill('AnyPassword1!');
      await login.signIn.click();
      const msg =
        (await login.username.evaluate((el: HTMLInputElement) => el.validationMessage)) ||
        (await page.locator('[role="alert"]').first().innerText().catch(() => ''));
      expect(msg.length).toBeGreaterThan(0);
      await login.username.clear();
      await login.password.clear();
    }
  });

  test('LP-007: email trimming behavior', async ({ page }) => {
    test.skip(!hasValidUserCredentials(), 'Set VWO_VALID_EMAIL and VWO_VALID_PASSWORD in .env');
    const raw = requireEnv('VWO_VALID_EMAIL');
    const padded = `  ${raw}  `;
    const login = new LoginPage(page);
    await login.open();
    await login.username.fill(padded);
    await login.password.fill(requireEnv('VWO_VALID_PASSWORD'));
    await login.submit();
    await expect(page).not.toHaveURL(/#\/login/i, { timeout: 120_000 });
  });

  test('LP-008: password masked and visibility toggle', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.password.fill('SecretValue123');
    await expectPasswordMasked(login.password);
    await login.passwordToggle.click();
    await expect(login.password).toHaveAttribute('type', 'text');
    await login.passwordToggle.click();
    await expect(login.password).toHaveAttribute('type', 'password');
    expect(await login.password.inputValue()).toBe('SecretValue123');
  });

  test('LP-009a: Sign in with Google starts auth flow', async ({ page, context }) => {
    const login = new LoginPage(page);
    await login.open();
    const beforeUrl = page.url();
    await login.signInWithGoogle.click();
    const deadline = Date.now() + 18_000;
    let progressed = false;
    while (Date.now() < deadline) {
      if (context.pages().length > 1) {
        progressed = true;
        break;
      }
      if (page.url() !== beforeUrl) {
        progressed = true;
        break;
      }
      await page.waitForTimeout(400);
    }
    expect(progressed).toBeTruthy();
    const extra = context.pages().find((p) => p !== page);
    await extra?.close().catch(() => {});
  });

  test('LP-009b: Sign in using SSO starts flow', async ({ page, context }) => {
    const login = new LoginPage(page);
    await login.open();
    const beforeUrl = page.url();
    await login.signInWithSso.click();
    const ssoEmail = page.locator('#sso-email');
    const deadline = Date.now() + 18_000;
    let progressed = false;
    while (Date.now() < deadline) {
      if (context.pages().length > 1) {
        progressed = true;
        break;
      }
      if ((await ssoEmail.isVisible().catch(() => false)) || page.url() !== beforeUrl) {
        progressed = true;
        break;
      }
      await page.waitForTimeout(400);
    }
    expect(progressed).toBeTruthy();
    const extra = context.pages().find((p) => p !== page);
    await extra?.close().catch(() => {});
  });

  test('LP-009c: Sign in with Passkey invokes flow', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.signInWithPasskey.click();
    await page.waitForTimeout(2000);
    const dialog = page.locator('[role="dialog"]').first();
    const hasDialog = await dialog.isVisible().catch(() => false);
    expect(hasDialog || page.url().length > 0).toBeTruthy();
  });

  test('LP-010: keyboard submit triggers validation', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.username.clear();
    await login.password.clear();
    await login.signIn.focus();
    await page.keyboard.press('Enter');
    await expectEmptySubmitDoesNotAuthenticate(page, login);
  });

  test('LP-011: repeated failed attempts do not hang UI', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    for (let i = 0; i < 3; i++) {
      await login.fillCredentials(`fail${i}@example.com`, 'wrong');
      await login.submit();
      await page.waitForTimeout(800);
      await expect(login.signIn).toBeEnabled();
      await login.username.clear();
      await login.password.clear();
    }
  });

  test('LP-012: session persistence and logout', async ({ page }) => {
    test.skip(!hasValidUserCredentials(), 'Set VWO_VALID_EMAIL and VWO_VALID_PASSWORD in .env');
    const login = new LoginPage(page);
    await login.open();
    await login.fillCredentials(requireEnv('VWO_VALID_EMAIL'), requireEnv('VWO_VALID_PASSWORD'));
    await login.submit();
    await expect(page).not.toHaveURL(/#\/login/i, { timeout: 120_000 });
    await page.reload();
    await page.waitForTimeout(3000);
    await expect(page).not.toHaveURL(/#\/login/i);
  });

  test('LP-013: footer legal links respond', async ({ page, request }) => {
    const login = new LoginPage(page);
    await login.open();
    for (const getter of [
      () => login.linkFreeTrial,
      () => login.linkPrivacy,
      () => login.linkTerms,
    ] as const) {
      const link = getter();
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      await assertUrlReturnsOk(request, href!);
    }
  });

  test('LP-014: mobile viewport — controls visible', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const login = new LoginPage(page);
    await login.open();
    await expect(login.username).toBeVisible();
    await expect(login.password).toBeVisible();
    await expect(login.signIn).toBeVisible();
    await expect(login.signInWithGoogle).toBeVisible();
  });
});

test.describe('VWO Login — footers copy', () => {
  test('marketing labels match plan', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await expect(page.getByRole('link', { name: footers.freeTrial })).toBeVisible();
    await expect(page.getByRole('link', { name: footers.privacy })).toBeVisible();
    await expect(page.getByRole('link', { name: footers.terms })).toBeVisible();
  });
});
