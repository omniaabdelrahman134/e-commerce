import ProductCard from '@/app/_components/ProductCard/productCard';
import GetProductsBySubCat from '@/app/_services/subCategory/GetProductBySubCat';
import GetSpecificSubCat from '@/app/_services/subCategory/GetSpecificSubCat';
import { ProductType, Subcategory } from '@/app/_types/products.type';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  const SubCatRes = await GetSpecificSubCat(id);
  const subcategory: Subcategory = SubCatRes?.data;

  if (!subcategory) return notFound();

const products : ProductType[] = await GetProductsBySubCat(id);

return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      {/* Brand Info */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">{subcategory.name}</h1>
        <p className="text-gray-500">Explore products from {subcategory.name}</p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center text-gray-400">
          No products found for this Sub Category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
