import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';

    const isPublicPage = path.startsWith('/admin/auth');
    const isPublicApi = ['/api/admin/login', '/api/admin/register', '/api/admin/phone-verify', '/api/admin/logout', '/api/admin/get-all-sellers'].includes(path);

    // If logged in and trying to access a public page, redirect to dashboard
    if (token && isPublicPage) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl));
    }

    // If not logged in and trying to access a protected path
    if (!token && !isPublicPage && !isPublicApi) {
        if (path.startsWith('/api/')) {
            return new NextResponse(JSON.stringify({ message: 'Authentication required' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }
        return NextResponse.redirect(new URL('/admin/auth/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};