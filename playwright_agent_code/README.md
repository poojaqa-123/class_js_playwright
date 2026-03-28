# VWO Playwright suite

End-to-end tests for `app.vwo.com` login, forgot-password, and accessibility smoke.

## Prerequisites

- Node.js 18+
- Network access to `https://app.vwo.com`

## Setup

```bash
cd playwright_agent_code
npm install
npx playwright install
```

## Environment

Copy `.env.example` to `.env` and set values as needed:

| Variable | Required for | Description |
|----------|--------------|-------------|
| `VWO_BASE_URL` | Optional | Default: `https://app.vwo.com` |
| `VWO_VALID_EMAIL` | Happy path, trim, session tests | Real account email |
| `VWO_VALID_PASSWORD` | Same as above | Real account password |
| `VWO_SSO_EMAIL` | Reserved | SSO exploration if you extend tests |

`.env` is listed in `.gitignore`; do not commit secrets.

## Run tests

```bash
npm test
```

Useful variants:

```bash
npx playwright test --project=chromium
npx playwright test --headed
npx playwright test --ui
```

HTML report after a run:

```bash
npm run report
```

## Layout

- `tests/` — spec files
- `pageobjects/` — page models
- `testdata/` — static data (no secrets)
- `helper/` — navigation, env, assertions, HTTP helpers
