'use server'
import { getToken } from '../getToken';

export default async function DeleteCartItem(productId: string) {
  const token = await getToken();

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    method: 'DELETE',
    headers: {
      token,
      'Content-type': 'application/json',
    },
  });

  const payload = await response.json();

  console.log(payload);
  return payload
}
