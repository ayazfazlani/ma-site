import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth'; // Ensure this uses 'jose' for Edge runtime compatibility

export async function middleware(request: NextRequest) {
  // If the user tries to access the admin portal (excluding specific auth actions)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Check if they are trying to access /admin/login specifically
    if (request.nextUrl.pathname === '/admin/login') {
        const token = request.cookies.get('admin_session')?.value;
        if (token) {
            // Already logged in, redirect them out of login page
            const isValid = await verifyToken(token);
            if (isValid) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        }
        return NextResponse.next();
    }

    // For all other /admin routes, enforce authentication
    const token = request.cookies.get('admin_session')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
      // Invalid or expired token
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Same check for standalone /login page mapping 
  if (request.nextUrl.pathname === '/login') {
    const token = request.cookies.get('admin_session')?.value;
    if (token) {
        const isValid = await verifyToken(token);
        if (isValid) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
