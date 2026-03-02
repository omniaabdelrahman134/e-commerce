'use client';

import { ProductType } from '@/app/_types/products.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AddToCartBtn from './AddToCartBtn';
import AddToWishlistBtn from './AddtoWishlist';

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  const discount = product.priceAfterDiscount
    ? (((product.price - product.priceAfterDiscount) / product.price) * 100).toFixed(0)
    : null;

  return (
    <div className="group m-3 p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col relative">
      <Link href={`/product/${product.id}`} className="flex-1">
        {/* Product Image */}
        <div className="relative w-full h-60 sm:h-72 md:h-60 lg:h-64 mb-4 overflow-hidden rounded-lg">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <h2 className="text-lg sm:text-xl font-semibold mb-1 line-clamp-2">
          {product.title.split(' ', 2).join('')}
        </h2>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-600 font-medium">Price:</span>
          {product.priceAfterDiscount ? (
            <>
              <span className="line-through text-red-500">{product.price}</span>
              <span className="text-green-700 font-bold">{product.priceAfterDiscount}</span>
            </>
          ) : (
            <span className="text-gray-900 font-semibold">{product.price} EGP</span>
          )}
        </div>

        <p className="text-gray-500 text-sm">
          Brand: <span className="text-gray-700 font-medium">{product.brand.name}</span>
        </p>
        <p className="text-gray-500 text-sm mb-3">
          Category: <span className="text-gray-700 font-medium">{product.category.name}</span>
        </p>

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-600 text-white text-sm font-semibold shadow-lg">
            -{discount}%
          </div>
        )}
      </Link>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 mt-3">
        <AddToCartBtn productId={product.id} />
        <AddToWishlistBtn productId={product.id} />
      </div>
    </div>
  );
}