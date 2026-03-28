import { chromium } from 'playwright';

const result = {
  startedAt: new Date().toISOString(),
  page: {},
  fields: [],
  buttons: [],
  links: [],
  emptySubmit: {
    nativeValidationMessages: [],
    alerts: [],
  },
  invalidCredentialAttempt: {
    attempted: false,
    urlAfterSubmit: '',
    alerts: [],
  },
  keyboard: {
    tabSequence: [],
  },
};

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const page = await context.newPage();

try {
  await page.goto('https://app.vwo.com', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(6000);

  result.page.url = page.url();
  result.page.title = await page.title();

  const fieldLoc = page.locator('input, textarea, select');
  const fieldCount = await fieldLoc.count();
  for (let i = 0; i < fieldCount; i++) {
    const el = fieldLoc.nth(i);
    result.fields.push({
      tag: await el.evaluate((n) => n.tagName.toLowerCase()),
      type: await el.getAttribute('type'),
      id: await el.getAttribute('id'),
      name: await el.getAttribute('name'),
      placeholder: await el.getAttribute('placeholder'),
      ariaLabel: await el.getAttribute('aria-label'),
      required: (await el.getAttribute('required')) !== null,
      visible: await el.isVisible(),
    });
  }

  const buttonLoc = page.locator('button, input[type="submit"], a[role="button"]');
  const buttonCount = await buttonLoc.count();
  for (let i = 0; i < buttonCount; i++) {
    const el = buttonLoc.nth(i);
    const inner = (await el.innerText().catch(() => '')).trim();
    result.buttons.push({
      text: inner || (await el.getAttribute('value')) || '',
      type: await el.getAttribute('type'),
      ariaLabel: await el.getAttribute('aria-label'),
      visible: await el.isVisible(),
    });
  }

  const linkLoc = page.locator('a[href]');
  const linkCount = await linkLoc.count();
  for (let i = 0; i < linkCount; i++) {
    const a = linkLoc.nth(i);
    const text = ((await a.innerText().catch(() => '')) || '').trim();
    const href = await a.getAttribute('href');
    const visible = await a.isVisible();
    if (text || href) result.links.push({ text, href, visible });
  }

  const submit = page
    .locator('button[type="submit"], input[type="submit"], button:has-text("Sign"), button:has-text("Log in"), button:has-text("Login")')
    .first();
  if (await submit.count()) {
    await submit.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(1000);

    const fieldCount2 = await fieldLoc.count();
    for (let i = 0; i < fieldCount2; i++) {
      const msg = await fieldLoc.nth(i).evaluate((n) => n.validationMessage || '');
      result.emptySubmit.nativeValidationMessages.push(msg);
    }

    const alertLoc = page.locator('[role="alert"], .error, [class*="error"], [data-testid*="error"]');
    const alertCount = await alertLoc.count();
    for (let i = 0; i < Math.min(alertCount, 15); i++) {
      const text = ((await alertLoc.nth(i).innerText().catch(() => '')) || '').trim();
      if (text) result.emptySubmit.alerts.push(text);
    }
  }

  const emailLike = page.locator('input[type="email"], input[name*="email" i], input[placeholder*="email" i]').first();
  const passwordLike = page.locator('input[type="password"], input[name*="password" i], input[placeholder*="password" i]').first();
  if ((await emailLike.count()) && (await passwordLike.count()) && (await submit.count())) {
    await emailLike.fill('invalid.user@example.com');
    await passwordLike.fill('DefinitelyWrongPassword!123');
    await submit.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(2000);
    result.invalidCredentialAttempt.attempted = true;
    result.invalidCredentialAttempt.urlAfterSubmit = page.url();

    const alertLoc = page.locator('[role="alert"], .error, [class*="error"], [data-testid*="error"]');
    const alertCount = await alertLoc.count();
    for (let i = 0; i < Math.min(alertCount, 15); i++) {
      const text = ((await alertLoc.nth(i).innerText().catch(() => '')) || '').trim();
      if (text) result.invalidCredentialAttempt.alerts.push(text);
    }
  }

  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(120);
    const active = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        name: el.getAttribute('name') || '',
        type: el.getAttribute('type') || '',
        ariaLabel: el.getAttribute('aria-label') || '',
        text: (el.textContent || '').trim().slice(0, 80),
      };
    });
    result.keyboard.tabSequence.push(active);
  }
} catch (err) {
  result.error = String(err?.message || err);
} finally {
  await browser.close();
}

console.log(JSON.stringify(result, null, 2));
