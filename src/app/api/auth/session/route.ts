import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_MAX_AGE_SECONDS,
  signSessionClaims,
  verifySessionClaims,
} from '@/lib/session-signature';
import { AUTH_SESSION_COOKIE } from '@/lib/auth-session';
import { resolveAdminClaim } from '@/lib/admin';

function cookieOptions() {
  return {
    name: AUTH_SESSION_COOKIE,
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };
}

export async function POST(request: NextRequest) {
  let body: { value?: unknown; username?: unknown; adminCode?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const value = typeof body.value === 'string' ? body.value.trim() : '';
  if (!value || value.length > 256) {
    return NextResponse.json({ error: 'invalid_value' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username.trim() : value;
  if (username.length > 256) {
    return NextResponse.json({ error: 'invalid_username' }, { status: 400 });
  }

  // The admin flag is decided here, on the server, from the allowlist and the
  // optional access code. It is deliberately never read from the request body —
  // otherwise any client could simply ask to be an admin.
  const claim = resolveAdminClaim(username, body.adminCode);

  let signed: string;
  try {
    signed = await signSessionClaims({ v: value, u: username, admin: claim.admin });
  } catch (err) {
    console.error('Failed to sign session cookie:', err);
    return NextResponse.json({ error: 'session_unavailable' }, { status: 500 });
  }

  const response = NextResponse.json({
    ok: true,
    admin: claim.admin,
    // Surfaced so the admin screen can explain *why* it declined rather than
    // silently rendering "Access Denied".
    reason: claim.admin ? undefined : claim.reason,
  });
  response.cookies.set({
    ...cookieOptions(),
    value: signed,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

/** Report the current session as the server sees it — the source of truth. */
export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(AUTH_SESSION_COOKIE)?.value;
  const claims = await verifySessionClaims(cookie);

  if (!claims) {
    return NextResponse.json({ authenticated: false, admin: false });
  }

  return NextResponse.json({
    authenticated: true,
    admin: claims.admin === true,
    username: claims.u ?? null,
  });
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({ ...cookieOptions(), value: '', maxAge: 0 });
  return response;
}
