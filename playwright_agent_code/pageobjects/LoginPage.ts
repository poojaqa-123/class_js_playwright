import { expect, type Locator, type Page } from '@playwright/test';
import { gotoLogin } from '../helper/navigation';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly passwordToggle: Locator;
  readonly forgotPassword: Locator;
  readonly signIn: Locator;
  readonly signInWithGoogle: Locator;
  readonly signInWithSso: Locator;
  readonly signInWithPasskey: Locator;
  readonly linkFreeTrial: Locator;
  readonly linkPrivacy: Locator;
  readonly linkTerms: Locator;
  readonly forgotEmailInput: Locator;
  readonly resetPasswordSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#login-username');
    this.password = page.locator('#login-password');
    this.passwordToggle = page.getByRole('button', { name: /toggle password visibility/i });
    this.forgotPassword = page.getByRole('button', { name: /^Forgot Password\?$/ });
    this.signIn = page.getByRole('button', { name: /^Sign in$/ });
    this.signInWithGoogle = page.locator('#js-google-signin-btn');
    this.signInWithSso = page.getByRole('button', { name: /Sign in using SSO/i });
    this.signInWithPasskey = page.getByRole('button', { name: /Sign in with Passkey/i });
    this.linkFreeTrial = page.getByRole('link', { name: /Start a FREE TRIAL/i });
    this.linkPrivacy = page.getByRole('link', { name: /Privacy policy/i });
    this.linkTerms = page.getByRole('link', { name: /^Terms$/ });
    this.forgotEmailInput = page.locator('#forgot-password-username');
    this.resetPasswordSubmit = page.getByRole('button', { name: /^Reset Password$/ });
  }

  async open(): Promise<void> {
    await gotoLogin(this.page);
  }

  async fillCredentials(email: string, pwd: string): Promise<void> {
    await this.username.fill(email);
    await this.password.fill(pwd);
  }

  async submit(): Promise<void> {
    await this.signIn.click();
  }

  async expectLoginShellVisible(): Promise<void> {
    await expect(this.page).toHaveTitle(/Login - VWO/i);
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.signIn).toBeVisible();
    await expect(this.forgotPassword).toBeVisible();
    await expect(this.signInWithGoogle).toBeVisible();
    await expect(this.signInWithSso).toBeVisible();
    await expect(this.signInWithPasskey).toBeVisible();
    await expect(this.linkFreeTrial).toBeVisible();
    await expect(this.linkPrivacy).toBeVisible();
    await expect(this.linkTerms).toBeVisible();
  }

  async openForgotPasswordFlow(): Promise<void> {
    await this.forgotPassword.click();
    await expect(this.forgotEmailInput).toBeVisible({ timeout: 15_000 });
  }

  async submitForgotPasswordEmail(email: string): Promise<void> {
    await this.forgotEmailInput.fill(email);
    const submit = this.page.getByRole('button', { name: /^Reset Password$/ });
    await submit.click();
  }
}
