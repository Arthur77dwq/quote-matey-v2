import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('token');

  const url = new URL('/', request.url);
  if (!token) {
    if (request.url.includes('/chat')) {
      url.searchParams.set('reason', 'unauthorized');
      url.searchParams.set('target', request.url);
      return NextResponse.redirect(url);
    }
  } else {
    if (request.url.includes('/login') || request.url.includes('/signup')) {
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply only to specified routes.
export const config = {
  matcher: ['/chat', '/login', '/signup', '/reset-password'],
};
