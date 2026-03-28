export function getEnv(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() !== '' ? v.trim() : undefined;
}

export function requireEnv(name: string): string {
  const v = getEnv(name);
  if (!v) throw new Error(`Missing required env: ${name}`);
  return v;
}

export function hasValidUserCredentials(): boolean {
  return !!(getEnv('VWO_VALID_EMAIL') && getEnv('VWO_VALID_PASSWORD'));
}
