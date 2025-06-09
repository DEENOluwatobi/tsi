import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only apply middleware to tutor dashboard routes
    if (request.nextUrl.pathname === '/tutor/dashboard') {
        // Check if there's a tutor auth token in localStorage (we'll handle this on client side)
        // For server-side middleware, we can't access localStorage, so we'll redirect to login
        // and let the client-side component handle the auth check
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/tutor/dashboard/:path*']
};