import { NextResponse, type NextRequest } from 'next/server';
import { getAuthSessionCookieName } from './src/lib/auth-session';
import { verifySessionCookie } from './src/lib/session-signature';

// Middleware handles *authentication* only: does the caller hold a valid,
// signed session? Authorization for /admin (the `admin` claim inside that
// cookie) is enforced by the admin page itself, so a signed-in non-admin gets
// a proper "Access Denied" screen instead of being bounced into a redirect
// loop with /auth/login — which redirects authenticated users straight back.
const PROTECTED_PATHS = ['/admin'];
const AUTH_PATHS = ['/auth/login', '/auth/register', '/auth/forgot-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookieName = getAuthSessionCookieName();
  const sessionCookie = request.cookies.get(sessionCookieName)?.value;
  // Only accept cookies whose HMAC signature we can verify. Bare/tampered
  // cookies are treated as unauthenticated.
  const verifiedValue = await verifySessionCookie(sessionCookie);
  const hasSession = verifiedValue !== null;

  if (AUTH_PATHS.some((path) => pathname.startsWith(path))) {
    if (hasSession) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path)) && !hasSession) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/login', '/auth/register', '/auth/forgot-password'],
};
