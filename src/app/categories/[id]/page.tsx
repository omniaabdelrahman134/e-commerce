import ProductCard from '@/app/_components/ProductCard/productCard';
import GetProductsByCat from '@/app/_services/Category/GetProductsByCat';
import GetSpecificCat from '@/app/_services/Category/GetSpecificCategory';
import { categoryType, ProductType } from '@/app/_types/products.type';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  const CatRes = await GetSpecificCat(id);
  const category: categoryType | null = CatRes?.data ?? null;

  if (!category) notFound();

  const products: ProductType[] = await GetProductsByCat(category);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">{category.name}</h1>
        <p className="text-gray-500">Explore products from {category.name}</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-400">
          No products found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}