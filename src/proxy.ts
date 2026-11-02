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
    const sessionToken = request.cookies.get('better-auth.session_token')?.value
    const isLoggedIn = Boolean(sessionToken)
    const { pathname } = request.nextUrl

    // Proxy backend API requests: /api/backend/* -> BACKEND_URL/*
    if (pathname.startsWith('/api/backend')) {
        const backendPath = pathname.replace(/^\/api\/backend/, '') || '/'
        const backendUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}${backendPath}${request.nextUrl.search}`

        const hasBody = !['GET', 'HEAD'].includes(request.method)

        const response = await fetch(backendUrl, {
            method: request.method,
            headers: {
                'content-type':
                    request.headers.get('content-type') || 'application/json',
                cookie: request.headers.get('cookie') || '',
            },
            body: hasBody ? await request.text() : undefined,
        })

        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: {
                ...Object.fromEntries(response.headers.entries()),
            },
        })
    }

    if (!isLoggedIn && isProtectedPath(pathname)) {
        const loginUrl = new URL('/signIn', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
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
    ],
}
