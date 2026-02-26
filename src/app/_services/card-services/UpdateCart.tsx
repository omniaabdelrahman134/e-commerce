'use server'
import { count } from 'console';
import { getToken } from '../getToken';

export default async function UpdateCartItem({productId, count} : {productId: string , count: number}) {
  const token = await getToken();

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    method: 'PUT',
    headers: {
      token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({count : count}),
  });

  const payload = await response.json();

  console.log(payload);
  return payload
}
