export const AUTH_ROUTES = ['/login', '/signup'] as const;

export const PROTECTED_ROUTES = [
  '/api/chat',
  '/api/subscription',
  '/api/user',
  '/api/logs',
  '/chat',
  '/pricing/success',
  '/pricing/cancel',
] as const;
