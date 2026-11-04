import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PREFIXES = [
    '/create-events',
    '/joined-events',
    '/manage-events',
    '/profile',
]

const EVENT_DETAIL_REGEX = /^\/events\/[^/]+/

function isProtectedPath(pathname: string): boolean {
    const isProtectedPage = PROTECTED_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    )

    const isEventDetail = EVENT_DETAIL_REGEX.test(pathname)

    return isProtectedPage || isEventDetail
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Normalize case for auth routes. Next.js App Router routes are
    // case-sensitive (folders are `signUp`/`signIn`), so `/SignUp` would
    // otherwise 404. Redirect any case variant to the canonical path.
    const lower = pathname.toLowerCase()
    if (lower === '/signup' && pathname !== '/signUp') {
        return NextResponse.redirect(new URL('/signUp', request.url))
    }
    if (lower === '/signin' && pathname !== '/signIn') {
        return NextResponse.redirect(new URL('/signIn', request.url))
    }

    // Check both Vercel HTTPS (__Secure-) and localhost HTTP cookie names
    const sessionToken =
        request.cookies.get('__Secure-better-auth.session_token')?.value ||
        request.cookies.get('better-auth.session_token')?.value

    const isLoggedIn = Boolean(sessionToken)

    // Proxy backend API requests: /api/backend/* -> https://hope-nest-surver.vercel.app/*
    if (pathname.startsWith('/api/backend')) {
        const backendPath = pathname.replace(/^\/api\/backend/, '') || '/'
        const backendUrl = `${process.env.BACKEND_URL}${backendPath}${request.nextUrl.search}`

        const hasBody = !['GET', 'HEAD'].includes(request.method)

        const rawCookie = request.headers.get('cookie') || ''
        const forwardedCookie =
            sessionToken && !rawCookie.includes('better-auth.session_token=')
                ? `${rawCookie}; better-auth.session_token=${sessionToken}`
                : rawCookie

        // Keep any existing Authorization header sent from frontend, or fallback to sessionToken
        const authHeader =
            request.headers.get('authorization') ||
            (sessionToken ? `Bearer ${sessionToken}` : '')

        const response = await fetch(backendUrl, {
            method: request.method,
            headers: {
                'content-type':
                    request.headers.get('content-type') || 'application/json',
                cookie: forwardedCookie,
                ...(authHeader ? { authorization: authHeader } : {}),
            },
            body: hasBody ? await request.text() : undefined,
        })

        const responseHeaders = new Headers(response.headers)
        responseHeaders.delete('content-encoding')
        responseHeaders.delete('content-length')
        responseHeaders.delete('transfer-encoding')

        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        })
    }

    if (!isLoggedIn && isProtectedPath(pathname)) {
        const loginUrl = new URL('/signIn', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }
    if (!isLoggedIn && isProtectedPath(pathname)) {
        const signUpUrl = new URL('/signUp', request.url)
        signUpUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(signUpUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/api/backend/:path*',
        '/create-events/:path*',
        '/joined-events/:path*',
        '/manage-events/:path*',
        '/profile/:path*',
        '/events/:path*',
        '/:path*',
    ],
}