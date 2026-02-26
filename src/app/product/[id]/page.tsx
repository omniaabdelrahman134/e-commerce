'use client';

import AddToCartBtn from '@/app/_components/ProductCard/AddToCartBtn';
import { getAllProducts } from '@/app/_services/products.service';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetails(props: Props) {
  const { id } = await props.params;
  console.log(id);

  let productData = await getAllProducts(id);
  const product = Array.isArray(productData) ? productData[0] : productData;

  if (!product) {
    notFound();
  }

  return (
      <div className="max-w-6xl mx-auto my-24 px-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-white p-6 rounded-2xl shadow-lg">
        {/* Product Image */}
        <div className="relative w-full h-80 md:h-auto md:col-span-2 rounded-lg overflow-hidden">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="md:col-span-3 flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-gray-800 text-center md:text-left">
            {product.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600">{product.description}</p>

          <div className="flex flex-wrap gap-4 mt-4">
            <p className="font-semibold text-gray-800 text-lg">
              Price: <span className="text-green-600">{product.price}$</span>
            </p>
            <p className="font-semibold text-gray-800 text-lg">
              Quantity: <span className="text-blue-600">{product.quantity}</span>
            </p>
            <p className="font-semibold text-gray-800 text-lg">
              Rate: <span className="text-yellow-500">{product.ratingsAverage}</span>
            </p>
          </div>

          <div className="mt-6">
            <AddToCartBtn productId={product.id} fullWidth />
          </div>
        </div>
      </div>
    </div>
  );
}