import { expect, type Page } from '@playwright/test';
import type { LoginPage } from '../pageobjects/LoginPage';

/**
 * VWO login often does not set `required` or populate `validationMessage` on click.
 * We treat "blocked" as: remain on `#/login` with primary controls still usable.
 */
export async function expectRemainsOnLoginForm(page: Page, login: LoginPage): Promise<void> {
  await page.waitForTimeout(1500);
  await expect(page).toHaveURL(/#\/login/);
  await expect(login.username).toBeVisible();
  await expect(login.password).toBeVisible();
  await expect(login.signIn).toBeVisible();
}

export async function expectEmptySubmitDoesNotAuthenticate(
  page: Page,
  login: LoginPage
): Promise<void> {
  await expectRemainsOnLoginForm(page, login);
  await expect(login.username).toHaveValue('');
  await expect(login.password).toHaveValue('');
}

export async function expectMissingPasswordDoesNotAuthenticate(
  page: Page,
  login: LoginPage,
  email: string
): Promise<void> {
  await expectRemainsOnLoginForm(page, login);
  await expect(login.username).toHaveValue(email);
  await expect(login.password).toHaveValue('');
}

export async function expectMissingEmailDoesNotAuthenticate(
  page: Page,
  login: LoginPage
): Promise<void> {
  await expectRemainsOnLoginForm(page, login);
  await expect(login.username).toHaveValue('');
  // VWO may clear the password field when email is missing; staying on login is the signal.
}
