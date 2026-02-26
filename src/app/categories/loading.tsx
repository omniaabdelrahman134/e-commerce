import React from 'react';

export default function CategoriesSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm animate-pulse flex flex-col overflow-hidden m-2">
      <div className="relative w-full h-60 bg-gray-200 rounded-t-xl" />

      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="h-6 w-3/4 bg-gray-300 rounded-md" />
        <div className="h-6 w-1/2 bg-gray-300 rounded-md" />
        <div className="mt-auto w-full h-10 bg-gray-300 rounded-xl" />
      </div>
    </div>
  );
}