'use client';

import React from 'react';

export default function CartSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 px-5 md:px-10 my-16 animate-pulse">
      {/* Cart Items Table Skeleton */}
      <div className="flex-1 space-y-4">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between mb-4">
              <div className="h-20 w-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 ml-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Skeleton */}
      <div className="w-full lg:w-1/3 space-y-4">
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}