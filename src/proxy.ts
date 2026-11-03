import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const english = pathname === '/en' || pathname.startsWith('/en/')
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-az-locale', english ? 'en' : 'vi')
  requestHeaders.set('x-az-path', pathname + request.nextUrl.search)
  if (pathname === '/vi' || pathname.startsWith('/vi/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }
  if (english) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || '/'
    if (/^\/(?:admin|api|_next|images|brand|fonts)(?:\/|$)/.test(url.pathname)) return NextResponse.next({ request: { headers: requestHeaders } })
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  }
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = { matcher: ['/((?!api|admin|_next|.*\\..*).*)', '/en/:path*', '/vi/:path*'] }
