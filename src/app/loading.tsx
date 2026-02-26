'use client';
import React from 'react';

export default function Loader() {
  return (
    <div className="space-y-16 px-5 md:px-10 py-10">
      {/* Hero Slider Skeleton */}
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-300 rounded-lg w-3/5 mx-auto"></div>
        <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto"></div>
        <div className="h-64 md:h-96 bg-gray-300 rounded-xl mt-6"></div>
      </div>

      {/* Categories Skeleton */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-6"></div>
        <div className="flex overflow-x-auto gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="min-w-[120px] h-32 bg-gray-200 rounded-xl flex-shrink-0"
            ></div>
          ))}
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-3"
            >
              <div className="h-40 bg-gray-200 rounded-xl w-full"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="flex justify-between mt-auto">
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}