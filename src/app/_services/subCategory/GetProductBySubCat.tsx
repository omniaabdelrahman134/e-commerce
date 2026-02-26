// src/app/_services/subCategory/GetProductsBySubCat.ts
import { ProductType } from '@/app/_types/products.type';


export default async function GetProductsBySubCat(subcategoryId: string): Promise<ProductType[]> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory=${subcategoryId}`);

    if (!res.ok) {
      console.error('Failed to fetch products:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    const products: ProductType[] = data.data || [];

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}