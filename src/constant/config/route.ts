export const AUTH_ROUTES = ['/login', '/signup', '/reset-password'] as const;

export const PROTECTED_ROUTES = [
  '/api/chat',
  '/api/subscription',
  '/api/user',
  '/api/logs',
  '/dashboard',
  '/pricing/success',
  '/pricing/cancel',
] as const;
