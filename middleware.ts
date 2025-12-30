import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if the path starts with /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const adminToken = request.cookies.get('admin_token')

        // If no token, redirect to admin login page
        if (!adminToken) {
            // Allow access to the login page itself to avoid loop
            if (request.nextUrl.pathname === '/admin/login') {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
