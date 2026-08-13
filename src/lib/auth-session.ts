export const AUTH_SESSION_COOKIE = 'dsa_auth_session';

export interface AuthSessionResult {
  ok: boolean;
  /** Server-derived admin claim. Never trust a client-side value for this. */
  admin: boolean;
  reason?: string;
}

export interface AuthSessionState {
  authenticated: boolean;
  admin: boolean;
  username: string | null;
}

export async function setAuthSessionCookie(
  value: string,
  options: { username?: string; adminCode?: string } = {}
): Promise<AuthSessionResult> {
  if (typeof window === 'undefined') return { ok: false, admin: false };
  try {
    const res = await fetch('/api/auth/session', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        value,
        username: options.username ?? value,
        adminCode: options.adminCode,
      }),
    });
    if (!res.ok) return { ok: false, admin: false };
    const data = (await res.json()) as { admin?: boolean; reason?: string };
    return { ok: true, admin: data.admin === true, reason: data.reason };
  } catch {
    // best-effort: middleware will simply route to /auth/login if the cookie
    // never lands.
    return { ok: false, admin: false };
  }
}

/** Ask the server what the current session actually is. */
export async function fetchAuthSession(): Promise<AuthSessionState> {
  const empty: AuthSessionState = { authenticated: false, admin: false, username: null };
  if (typeof window === 'undefined') return empty;
  try {
    const res = await fetch('/api/auth/session', {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-store',
    });
    if (!res.ok) return empty;
    const data = (await res.json()) as Partial<AuthSessionState>;
    return {
      authenticated: data.authenticated === true,
      admin: data.admin === true,
      username: typeof data.username === 'string' ? data.username : null,
    };
  } catch {
    return empty;
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
