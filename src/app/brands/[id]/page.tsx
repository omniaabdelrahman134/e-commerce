import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Brand } from '../../_types/carrt-types/cartTypes'
import GetSpecificBrand from '@/app/_services/Brands/GetSpecificBrand';
import ProductCard from '@/app/_components/ProductCard/productCard';
import { ProductType } from '@/app/_types/products.type';
import GetProductsByBrand from '@/app/_services/Brands/getProductsByBrand';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BrandPage({ params }: Props) {
  const { id } = await params;

  const brandRes = await GetSpecificBrand(id);
  const brand: Brand = brandRes?.data;

  if (!brand) return notFound();

const products: ProductType[] = await GetProductsByBrand(brand);  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      {/* Brand Info */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">{brand.name}</h1>
        <p className="text-gray-500">
          Explore products from {brand.name}
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center text-gray-400">
          No products found for this brand.
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