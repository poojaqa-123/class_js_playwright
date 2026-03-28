# VWO Login Page Test Plan (Playwright)

## Scope
- Target: `https://app.vwo.com` login experience.
- Focus: authentication entry points, validation, error handling, and critical navigation links on login and password recovery.
- Assumption: test starts from a fresh browser context (no cookies/local storage/session).

## Observed Baseline (Captured via Playwright Probe)
- Landing URL resolves to `https://app.vwo.com/#/login`.
- Page title is `Login - VWO`.
- Visible primary controls observed:
  - Email input: `#login-username` with placeholder `Enter email ID`.
  - Password input: `#login-password` with placeholder `Enter password`.
  - Password visibility toggle button (`aria-label="Toggle password visibility"`).
  - `Forgot Password?` button.
  - `Sign in` submit button.
  - `Sign in with Google`, `Sign in using SSO`, `Sign in with Passkey`.
- Visible legal/navigation links observed:
  - `Start a FREE TRIAL`
  - `Privacy policy`
  - `Terms`
- Note from this environment: submit attempts produced toast/error text `You seem to be offline. Please check your network!`, so invalid-credential server error text could not be validated here.

## Environment and Test Data
- Browser matrix: Chromium (primary), Firefox, WebKit.
- Viewports: desktop (1440x900), mobile (390x844).
- Accounts/data:
  - Valid user account (active).
  - Invalid email format (for client-side validation).
  - Unregistered email (for server-side auth response).
  - Wrong password for a valid email.
  - SSO-enabled org account (if tenant supports SSO).
- Security considerations:
  - Store credentials in environment variables.
  - Avoid logging plaintext secrets in traces/reports.

## Critical User Flows
1. Login using email + password (happy path).
2. Login failure with invalid credentials.
3. Forgot password flow from `Forgot Password?` button.
4. Auth alternatives visible on login: Google, SSO, and Passkey.
5. Legal/new-user navigation via visible links (trial/privacy/terms).

## Scenario List (Prioritized)

### P0 - Must Pass

#### LP-001: Login page loads and core controls are visible
1. Navigate to `https://app.vwo.com`.
2. Wait for login UI to be interactive (network idle + visible form container).
3. Verify presence of:
   - `#login-username` with placeholder `Enter email ID`.
   - `#login-password` with placeholder `Enter password`.
   - Password visibility toggle.
   - `Sign in` submit button.
   - `Forgot Password?` button.
   - `Sign in with Google`, `Sign in using SSO`, `Sign in with Passkey`.
   - Footer links: `Start a FREE TRIAL`, `Privacy policy`, `Terms`.
4. Verify page is usable (no blocking JS error overlay).
Expected:
- Inputs and CTA are visible/enabled.
- No uncaught runtime errors preventing login usage.

#### LP-002: Successful login with valid credentials
1. Enter valid email and password.
2. Submit with button click.
3. Verify transition to authenticated area (URL change and logged-in shell marker).
Expected:
- Login succeeds.
- User lands on post-login page (dashboard/workspace/account selector).

#### LP-003: Invalid credential rejection
1. Enter valid email + wrong password.
2. Submit.
3. Validate error feedback.
Expected:
- Login is blocked.
- Error message appears (non-generic where possible).
- Password field remains protected; no secret exposed in UI.

#### LP-004: Required field validation
1. Submit with both fields empty.
2. Submit with only email filled.
3. Submit with only password filled.
Expected:
- Native/browser validation appears for missing input(s) or equivalent field-level validation appears.
- Submission is prevented until mandatory fields are provided.

#### LP-005: Forgot password entry path
1. Click `Forgot Password?` button.
2. Verify navigation to reset flow.
3. Submit a known valid email.
Expected:
- Reset form loads (expected hidden-field ID becomes visible: `#forgot-password-username`).
- Success confirmation is shown (without account enumeration leakage).

### P1 - Important

#### LP-006: Invalid email format validation
1. Enter malformed email (e.g. `user@`, `abc`, `x@y`).
2. Enter any password and submit.
Expected:
- Client-side validation blocks submission or clear server validation appears.

#### LP-007: Input trimming and normalization
1. Enter email with leading/trailing spaces.
2. Submit with valid password.
Expected:
- Email is trimmed/normalized (if product behavior intends this).
- User can still authenticate when logical credentials are valid.

#### LP-008: Password field behavior
1. Type password.
2. Verify field remains masked.
3. If show/hide icon exists, toggle and verify behavior.
Expected:
- Masking is default.
- Toggle does not alter actual value.

#### LP-009: Social/SSO entry points (conditional)
1. Click each observed provider entry point in isolation:
   - `Sign in with Google`
   - `Sign in using SSO`
   - `Sign in with Passkey`
2. Verify redirect starts correct auth handshake URL/domain.
Expected:
- Correct provider auth flow opens.
- No broken or dead-end links.

#### LP-010: Keyboard-only login usability
1. Navigate fields with `Tab`/`Shift+Tab` and capture focused element sequence.
2. Submit with `Enter`.
Expected:
- Logical focus order.
- Visible focus indicators.
- Keyboard submit triggers same validation/auth behavior as click.

### P2 - Nice to Have / Hardening

#### LP-011: Error messaging stability under repeated failures
1. Attempt multiple failed logins rapidly.
2. Observe message consistency and UI responsiveness.
Expected:
- Errors remain clear and deterministic.
- UI does not freeze or degrade unexpectedly.

#### LP-012: Session persistence and logout roundtrip
1. Login successfully.
2. Refresh page and verify authenticated state persistence.
3. Logout and verify return to login page.
4. Use browser back button.
Expected:
- Session behavior matches product policy.
- Protected routes are inaccessible after logout.

#### LP-013: Link integrity checks on login page
1. Validate visible links on login page:
   - `Start a FREE TRIAL`
   - `Privacy policy`
   - `Terms`
2. Verify each link opens expected destination with `2xx/3xx` response.
Expected:
- All links are functional and point to correct destination.

#### LP-014: Mobile layout sanity
1. Run login page scenarios on mobile viewport.
2. Validate no overlap/clipping/hidden CTA.
Expected:
- Form is fully usable on mobile dimensions.

## Non-Functional Checks (Login Page)
- Performance: form interactive under acceptable threshold on stable network.
- Accessibility quick checks:
  - Inputs have accessible labels.
  - Error messages are programmatically associated with fields.
  - Sufficient contrast on primary CTA and validation text.
  - Screen reader names for buttons/links are meaningful.
- Security smoke:
  - Password not present in URL/query params.
  - No sensitive auth data leaked in console/network logs.

## Playwright Implementation Notes
- Use resilient locators:
  - Prefer `getByRole`, `getByLabel`, `getByPlaceholder`, stable `data-testid`.
- Keep tests independent:
  - New context per test or explicit cleanup.
- Mark conditional tests for tenant-specific features:
  - Example: social login, SSO buttons.
- Avoid brittle assertions on exact error wording; assert intent + visibility.
- Add trace/screenshot only on failure for diagnostics.

## Suggested File Layout
- `playwright_agent_code/login.spec.ts` - core login happy/negative scenarios.
- `playwright_agent_code/forgot-password.spec.ts` - reset flow checks.
- `playwright_agent_code/login.a11y.spec.ts` - accessibility smoke on login UI.

## Open Items to Confirm During First Run
- Server-side invalid-credential error text when network is healthy.
- Forgot-password route URL and final confirmation message copy.
- Full keyboard tab order in headed mode (headless run showed focus moving to social buttons first).
- Whether captcha/rate-limit challenge appears after repeated failures.
- Whether captcha/rate-limit challenge appears after repeated failures.

