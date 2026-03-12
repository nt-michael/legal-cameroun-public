import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Don't override an existing preference
  if (request.cookies.has('lang')) return response;

  // Parse Accept-Language header (e.g. "en-US,en;q=0.9,fr;q=0.8")
  const acceptLang = request.headers.get('accept-language') ?? '';
  const primary = acceptLang.split(',')[0].trim().toLowerCase();
  const lang = primary.startsWith('en') ? 'en' : 'fr';

  response.cookies.set('lang', lang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  // Run on all pages except static assets and API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
