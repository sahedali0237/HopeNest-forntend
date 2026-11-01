import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages that always require the user to be logged in.
const PROTECTED_PREFIXES = [
  '/create-events',
  '/joined-events',
  '/manage-events',
  '/profile',
]

// Event detail page, e.g. /events/665f1c8e4b3a2d1f9c8e7d6a
const EVENT_DETAIL_REGEX = /^\/events\/[^/]+/

function isProtectedPath(pathname: string): boolean {
  const isProtectedPage = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )

  const isEventDetail = EVENT_DETAIL_REGEX.test(pathname)

  return isProtectedPage || isEventDetail
}

export function proxy(request: NextRequest) {
  // better-auth stores the session in the "better-auth.session_token" cookie.
  const sessionToken = request.cookies.get('better-auth.session_token')?.value
  const isLoggedIn = Boolean(sessionToken)
  const { pathname } = request.nextUrl

  if (!isLoggedIn && isProtectedPath(pathname)) {
    const loginUrl = new URL('/signIn', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/create-events/:path*',
    '/joined-events/:path*',
    '/manage-events/:path*',
    '/profile/:path*',
    '/events/:path*',
  ],
}
