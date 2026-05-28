import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { AUTH_ROUTES, PROTECTED_ROUTES } from './constant/config/route';
import { matchRoute } from './lib/utils';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const nextUrl = request.nextUrl;
  const pathname = nextUrl.pathname;

  const isAuthPage = matchRoute(pathname, AUTH_ROUTES);
  const isProtectedPage = matchRoute(pathname, PROTECTED_ROUTES);

  const url = new URL('/', request.url);
  const paramRequirement = !(
    nextUrl.searchParams.get('subscription_id') &&
    nextUrl.searchParams.get('ba_token') &&
    nextUrl.searchParams.get('token')
  );

  if (nextUrl.pathname.includes('/pricing/success'))
    if (paramRequirement)
      return NextResponse.redirect(new URL('/pricing', request.url));

  if (nextUrl.pathname.includes('/pricing/cancel'))
    if (
      !(
        nextUrl.searchParams.get('plan') &&
        nextUrl.searchParams.get('next_billing_date')
      )
    )
      return NextResponse.redirect(new URL('/pricing', request.url));

  if (!token) {
    if (request.url.includes('/chat')) {
      url.searchParams.set('reason', 'unauthorized');
      url.searchParams.set('target', pathname);
      return NextResponse.redirect(url);
    }

    // Not logged in → block protected pages
    if (isProtectedPage) {
      const url = new URL('/login', request.url);
      url.searchParams.set('reason', 'unauthorized');
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Logged in → block auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/subscription/:path',
    '/api/user/:path',
    '/api/chat',
    '/chat',
    '/pricing/:path*',
    '/login',
    '/signup',
  ],
};
