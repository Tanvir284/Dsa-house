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

function getSecret(): string {
  // Require an explicit secret in production; fall back to a fixed dev secret
  // only when NODE_ENV !== 'production' so local dev keeps working without
  // extra setup.
  const secret = process.env.AUTH_SESSION_SECRET;
  if (secret && secret.length >= 16) return secret;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SESSION_SECRET must be set (>=16 chars) in production');
  }
  return 'dev-only-insecure-fallback-secret-change-me';
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

export async function signSessionValue(value: string): Promise<string> {
  const payloadBytes = encoder.encode(value);
  const sig = await hmacSign(payloadBytes);
  return `${base64UrlEncode(payloadBytes)}.${base64UrlEncode(sig)}`;
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

  const expected = await hmacSign(payloadBytes);
  if (!timingSafeEqual(sigBytes, expected)) return null;
  return bytesToString(payloadBytes);
}
