import type { APIRequestContext } from '@playwright/test';

export async function assertUrlReturnsOk(
  request: APIRequestContext,
  url: string
): Promise<void> {
  const absolute = url.startsWith('http') ? url : `https:${url}`;
  const res = await request.head(absolute).catch(() => null);
  const status = res?.status() ?? 0;
  if (status === 405 || status === 0) {
    const get = await request.get(absolute);
    if (get.status() >= 400) {
      throw new Error(`GET ${absolute} failed: ${get.status()}`);
    }
    return;
  }
  if (status >= 400) {
    throw new Error(`HEAD ${absolute} failed: ${status}`);
  }
}
