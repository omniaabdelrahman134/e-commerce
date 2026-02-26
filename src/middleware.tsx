import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const protectedPages = ['/profile', '/wishList', '/brands'];
const authPages = ['/login', '/register'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (protectedPages.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else { 
      let redirectUrl = new URL('/login', process.env.NEXTAUTH_URL);
      redirectUrl.searchParams.set('callBackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (authPages.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      let redirectUrl = new URL('/login', process.env.NEXTAUTH_URL);
      redirectUrl.searchParams.set('callBackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}
