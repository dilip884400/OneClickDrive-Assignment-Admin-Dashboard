import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('admin')?.value
  const isLoginPage = request.nextUrl.pathname === '/login'

  if (request.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/login', '/'],
}
