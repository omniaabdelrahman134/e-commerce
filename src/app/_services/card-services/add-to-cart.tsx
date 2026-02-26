'use server'
import { getToken } from '../getToken';

export default async function AddToCart(productId: string) {
  const token = await getToken();

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    method: 'POST',
    headers : {
      token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      productId,
    }),
  });

  const payload = await response.json();

  console.log(payload);
  return payload
}
