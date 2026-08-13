// Edge-compatible HMAC-SHA256 signing utilities for the auth session cookie.
// Uses the Web Crypto API so it can run inside Next.js middleware.

const encoder = new TextEncoder();

// Signed cookie format: `${base64url(payload)}.${base64url(hmac)}`
// The payload is the raw session value (e.g. user id or username) — no PII
// beyond what the client already provides.

function base64UrlEncode(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = '';
  for (let i = 0; i < arr.byteLength; i++) binary += String.fromCharCode(arr[i]);
  // btoa exists in edge runtime and browsers
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (str.length % 4)) % 4);
  const binary = atob(padded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

function bytesToString(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

// Development-only fallback. This value is public (it lives in the repo), so it
// must never be used to sign real sessions — anyone could forge a cookie with it.
const DEV_FALLBACK_SECRET = 'dsa-house-temporary-secret-fallback-key-32-chars-long';

function getSecret(): string {
  const secret = process.env.AUTH_SESSION_SECRET;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!secret || secret.length < 16) {
    const reason = !secret
      ? 'AUTH_SESSION_SECRET environment variable is not set'
      : 'AUTH_SESSION_SECRET must be at least 16 characters long';

    // Fail closed in production rather than silently signing with a secret that
    // is checked into the repository.
    if (isProduction) {
      throw new Error(
        `${reason}. Refusing to sign session cookies with the public development fallback in production.`
      );
    }

    console.warn(`⚠️ ${reason}. Falling back to the development-only secret.`);
    return DEV_FALLBACK_SECRET;
  }

  return secret;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function hmacSign(payloadBytes: Uint8Array): Promise<Uint8Array> {
  const key = await importKey(getSecret());
  // Copy into a fresh ArrayBuffer-backed view to satisfy the strict
  // BufferSource typing (Uint8Array<ArrayBufferLike> vs ArrayBuffer).
  const buf = new Uint8Array(payloadBytes.byteLength);
  buf.set(payloadBytes);
  const sig = await crypto.subtle.sign('HMAC', key, buf);
  return new Uint8Array(sig);
}

/**
 * Claims carried inside the signed cookie.
 *
 * `admin` is derived on the server from the allowlist + access code — it is
 * never accepted from the client. Because the payload is HMAC-signed and the
 * cookie is httpOnly, the browser can neither read nor forge it.
 */
export interface SessionClaims {
  /** Raw session value: the Supabase user id when available, else the username. */
  v: string;
  /** Username, used for display and for the admin allowlist check. */
  u?: string;
  /** Server-derived admin flag. */
  admin?: boolean;
  /** Issued-at, epoch seconds. */
  iat?: number;
}

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function signSessionClaims(claims: SessionClaims): Promise<string> {
  const payloadBytes = encoder.encode(
    JSON.stringify({ ...claims, iat: claims.iat ?? Math.floor(Date.now() / 1000) })
  );
  const sig = await hmacSign(payloadBytes);
  return `${base64UrlEncode(payloadBytes)}.${base64UrlEncode(sig)}`;
}

export async function signSessionValue(value: string): Promise<string> {
  return signSessionClaims({ v: value, u: value });
}

// Constant-time comparison over two same-length Uint8Arrays.
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) return false;
  let diff = 0;
  for (let i = 0; i < a.byteLength; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function verifySessionCookie(cookie: string | undefined | null): Promise<string | null> {
  if (!cookie) return null;
  const dot = cookie.indexOf('.');
  if (dot <= 0 || dot === cookie.length - 1) return null;
  const payloadB64 = cookie.slice(0, dot);
  const sigB64 = cookie.slice(dot + 1);

  let payloadBytes: Uint8Array;
  let sigBytes: Uint8Array;
  try {
    payloadBytes = base64UrlDecode(payloadB64);
    sigBytes = base64UrlDecode(sigB64);
  } catch {
    return null;
  }

  let expected: Uint8Array;
  try {
    expected = await hmacSign(payloadBytes);
  } catch {
    // Misconfigured secret (see getSecret). Treat as unauthenticated rather than
    // throwing out of middleware and 500-ing every protected route.
    return null;
  }
  if (!timingSafeEqual(sigBytes, expected)) return null;
  return bytesToString(payloadBytes);
}

/**
 * Verify the cookie and return its claims.
 *
 * Cookies written before the payload became structured hold a bare string; they
 * still verify (so existing sessions aren't invalidated by the upgrade) but they
 * carry no admin claim, which is the safe default.
 */
export async function verifySessionClaims(
  cookie: string | undefined | null
): Promise<SessionClaims | null> {
  const raw = await verifySessionCookie(cookie);
  if (raw === null) return null;

  let claims: SessionClaims;
  if (raw.startsWith('{')) {
    try {
      const parsed = JSON.parse(raw) as Partial<SessionClaims>;
      if (typeof parsed?.v !== 'string' || !parsed.v) return null;
      claims = {
        v: parsed.v,
        u: typeof parsed.u === 'string' ? parsed.u : undefined,
        admin: parsed.admin === true,
        iat: typeof parsed.iat === 'number' ? parsed.iat : undefined,
      };
    } catch {
      return null;
    }
  } else {
    // Legacy bare-value cookie.
    claims = { v: raw, u: raw, admin: false };
  }

  // Reject cookies older than the cookie's own max-age. The browser normally
  // drops these on its own, but a copied cookie should not outlive the session.
  if (typeof claims.iat === 'number') {
    const ageSeconds = Math.floor(Date.now() / 1000) - claims.iat;
    if (ageSeconds > SESSION_MAX_AGE_SECONDS || ageSeconds < -60) return null;
  }

  return claims;
}
