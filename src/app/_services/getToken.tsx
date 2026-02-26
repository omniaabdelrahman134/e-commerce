'use server';
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();
  const authToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!authToken) {
    throw new Error("Not authorized: no token found");
  }

  // Decode the JWT
  const token = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!token) {
    throw new Error("Not authorized: invalid token");
  }

  // Return the accessToken we set in next-auth callbacks
  return token.accessToken as string;
}