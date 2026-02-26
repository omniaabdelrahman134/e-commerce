import {jwtDecode} from "jwt-decode";

type DecodedToken = {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

export default async function GetUserOrders(accessToken: string) {
  if (!accessToken) throw new Error("No access token provided");

  // Decode user ID from JWT
  const decoded = jwtDecode<DecodedToken>(accessToken);
  const userId = decoded.id;

  // Fetch orders from backend
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // ✅ send token
      },
      cache: "no-store", // optional, always fetch fresh
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch orders: ${error}`);
  }

  const payload = await res.json();
  console.log("Orders fetched:", payload);
  return payload;
}