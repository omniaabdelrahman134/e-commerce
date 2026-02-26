import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized', status: 401 });
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: {
      token: token.accessToken,
      'Content-type': 'application/json',
    },
  });
  const paylod = await res.json();
  return NextResponse.json(paylod);
}
