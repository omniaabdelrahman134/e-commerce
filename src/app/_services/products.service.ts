import { log } from 'console';
import { ProductType } from '../_types/products.type';

export async function getAllProducts(id: string): Promise<ProductType[] | null> {
  try {
    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: 'force-cache',
      },
    );

    let resData = await res.json();
    console.log("Products fetched:", resData.data); // make sure this is an array
    return resData.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
