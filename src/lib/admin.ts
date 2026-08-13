import type { UserProfile } from '@/lib/store';

/**
 * Admin allowlist.
 *
 * `ADMIN_USERNAMES` is server-only and is the value that actually decides
 * access — it is read inside the session API route when minting the signed
 * cookie. `NEXT_PUBLIC_ADMIN_USERNAMES` is kept as a fallback so existing
 * deployments keep working, and so the sign-in screen can show a hint, but it
 * is shipped to the browser and must never be the sole gate.
 */
function getAdminUsernames(): string[] {
  const raw =
    process.env.ADMIN_USERNAMES ?? process.env.NEXT_PUBLIC_ADMIN_USERNAMES ?? 'admin';
  return raw
    .split(',')
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUsername(username: string): boolean {
  return getAdminUsernames().includes(username.trim().toLowerCase());
}

export function getAdminUsernamesHint(): string {
  return getAdminUsernames().join(', ');
}

/** Constant-time string comparison for the admin access code. */
function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export type AdminDenialReason = 'not_allowlisted' | 'bad_access_code' | 'not_configured';

/**
 * Decide — on the server — whether a sign-in should receive the admin claim.
 *
 * The username alone is not proof of anything: in offline mode anyone can type
 * "admin". So when `ADMIN_ACCESS_CODE` is configured it must also be presented.
 * When it isn't configured we allow the frictionless demo flow in development
 * but fail closed in production, so a deployed instance never hands out the CMS
 * to whoever guesses the username.
 */
export function resolveAdminClaim(
  username: string,
  accessCode?: unknown
): { admin: true } | { admin: false; reason: AdminDenialReason } {
  if (!isAdminUsername(username)) {
    return { admin: false, reason: 'not_allowlisted' };
  }

  const requiredCode = process.env.ADMIN_ACCESS_CODE;
  if (requiredCode) {
    const provided = typeof accessCode === 'string' ? accessCode : '';
    return timingSafeEqualString(provided, requiredCode)
      ? { admin: true }
      : { admin: false, reason: 'bad_access_code' };
  }

  if (process.env.NODE_ENV === 'production') {
    return { admin: false, reason: 'not_configured' };
  }

  return { admin: true };
}

/**
 * Client-side convenience gate. This is UX only — the authoritative check is
 * the server-issued `admin` claim carried in the signed session cookie.
 */
export function canAccessAdmin(profile: UserProfile | null): boolean {
  return profile !== null && isAdminUsername(profile.username);
}
