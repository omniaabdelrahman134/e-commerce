import { Brand } from '@/app/_types/carrt-types/cartTypes';
import { ProductType } from '@/app/_types/products.type';

export default async function GetProductsByBrand(brand: Brand) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);

  if (!res.ok) {
    console.log('Products Error:', res.status);
    return [];
  }

  const data = await res.json();

  const products: ProductType[] = data.data || [];

  return products.filter(
    (p) => p.brand && p.brand.name.toLowerCase() === brand.name.toLowerCase(),
  );
}
