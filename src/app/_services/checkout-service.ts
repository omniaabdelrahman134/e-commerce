'use server'
import { shipping } from '../_types/products.type';
import { getToken } from './getToken';

export default async function checkoutSession(productId: string, shippingAddress  :shipping) {
  const token = await getToken();

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productId}?url=http://localhost:3000`, {
    method: 'POST',
    headers: {
      token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      shippingAddress,
    }),
  });

  const payload = await response.json();

  console.log(payload);
  return payload
}
