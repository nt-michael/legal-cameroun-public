import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip paths with file extensions (images, fonts, etc.)
  if (pathname.includes('.')) return NextResponse.next();

  // /en/* → rewrite to /* without prefix, set lang=en
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const stripped = pathname.slice(3) || '/';
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    const res = NextResponse.rewrite(url);
    res.cookies.set('lang', 'en', { path: '/', maxAge: 31536000, sameSite: 'lax' });
    return res;
  }

  // /fr/* → rewrite to /* without prefix, set lang=fr
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const stripped = pathname.slice(3) || '/';
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    const res = NextResponse.rewrite(url);
    res.cookies.set('lang', 'fr', { path: '/', maxAge: 31536000, sameSite: 'lax' });
    return res;
  }

  // No prefix — check existing cookie
  const existingLang = request.cookies.get('lang')?.value;

  if (existingLang === 'en') {
    const url = request.nextUrl.clone();
    url.pathname = '/en' + pathname;
    return NextResponse.redirect(url, 307);
  }

  if (existingLang === 'fr') {
    return NextResponse.next();
  }

  // No cookie — detect from Accept-Language
  const acceptLang = request.headers.get('accept-language') ?? '';
  const primary = acceptLang.split(',')[0].trim().toLowerCase();

  if (primary.startsWith('en')) {
    const url = request.nextUrl.clone();
    url.pathname = '/en' + pathname;
    const res = NextResponse.redirect(url, 307);
    res.cookies.set('lang', 'en', { path: '/', maxAge: 31536000, sameSite: 'lax' });
    return res;
  }

  // French default
  const res = NextResponse.next();
  res.cookies.set('lang', 'fr', { path: '/', maxAge: 31536000, sameSite: 'lax' });
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
