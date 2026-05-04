import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { AUTH_ROUTES, PROTECTED_ROUTES } from './constant/config/route';
import { matchRoute } from './lib/utils';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = matchRoute(pathname, AUTH_ROUTES);
  const isProtectedPage = matchRoute(pathname, PROTECTED_ROUTES);

  // Not logged in → block protected pages
  if (!token && isProtectedPage) {
    const url = new URL('/login', request.url);
    url.searchParams.set('reason', 'unauthorized');
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Logged in → block auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat/:path*', '/billing/:path*', '/login', '/signup'],
};
