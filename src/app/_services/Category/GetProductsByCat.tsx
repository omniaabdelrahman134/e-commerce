import { categoryType, ProductType } from '@/app/_types/products.type';

export default async function GetProductsByCat(category: categoryType) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);

  if (!res.ok) {
    console.log('Products Error:', res.status);
    return [];
  }

  const data = await res.json();
  
  const products: ProductType[] = data.data || [];

  return products.filter(
    (p) => p.category && p.category.name.toLowerCase() === category.name.toLowerCase(),
  );
}
