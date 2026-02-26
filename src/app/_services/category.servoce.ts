import { categoryType } from '../_types/products.type';

export async function getAllCategories(): Promise<  [] | null> {
  try {
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);

    let resData = await res.json();
    console.log(resData.data);
    return resData.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
