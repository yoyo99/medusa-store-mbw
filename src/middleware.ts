import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rediriger la racine vers /fr
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }
}

export const config = {
  matcher: '/',
}
