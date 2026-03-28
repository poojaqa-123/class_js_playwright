/**
 * Static test data for VWO login — no secrets. Credentials come from .env.
 */
export const loginRoutes = {
  loginHash: '#/login',
} as const;

export const invalidEmails = ['user@', 'not-an-email', 'x@y'] as const;

export const footers = {
  freeTrial: 'Start a FREE TRIAL',
  privacy: 'Privacy policy',
  terms: 'Terms',
} as const;
