import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

    const isAdminRoute = pathname.startsWith('/admin');
    const isLoginPage = pathname === '/admin/login';
    const isDashboard = pathname === '/admin/dashboard';
    const isPublicRoute = !isAdminRoute || pathname === '/';

    if (isLoggedIn) {
        // Logged-in users should not access login page
        if (isLoginPage || pathname === '/') {
            return NextResponse.redirect(new URL('/admin/dashboard/home/banners', request.url));
        }

        // Allow access to /admin/*
        return NextResponse.next();
    } else {
        // Non-logged-in users accessing protected /admin/* (except login)
        if (isAdminRoute && !isLoginPage) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Allow access to public site and /admin/login
        return NextResponse.next();
    }
}
