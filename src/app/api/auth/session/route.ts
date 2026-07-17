import { NextRequest, NextResponse } from 'next/server';
import { signSessionValue } from '@/lib/session-signature';
import { AUTH_SESSION_COOKIE } from '@/lib/auth-session';

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  let body: { value?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const value = typeof body.value === 'string' ? body.value.trim() : '';
  if (!value || value.length > 256) {
    return NextResponse.json({ error: 'invalid_value' }, { status: 400 });
  }

  const signed = await signSessionValue(value);
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: AUTH_SESSION_COOKIE,
    value: signed,
    path: '/',
    maxAge: MAX_AGE_SECONDS,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: AUTH_SESSION_COOKIE,
    value: '',
    path: '/',
    maxAge: 0,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
