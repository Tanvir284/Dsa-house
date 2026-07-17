export const AUTH_SESSION_COOKIE = 'dsa_auth_session';

export async function setAuthSessionCookie(value: string): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    await fetch('/api/auth/session', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
  } catch {
    // best-effort: middleware will simply route to /auth/login if the cookie
    // never lands.
  }
}

export async function clearAuthSessionCookie(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    await fetch('/api/auth/session', {
      method: 'DELETE',
      credentials: 'same-origin',
    });
  } catch {
    // ignore
  }
}

export function getAuthSessionCookieName(): string {
  return AUTH_SESSION_COOKIE;
}
