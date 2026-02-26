import GetAllSubCategories from '@/app/_services/subCategory/GetSubCategory';
import { Subcategory } from '@/app/_types/products.type';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function SubCategory() {
  const response = await GetAllSubCategories();

  const subCategories: Subcategory[] = response?.data || [];

  return (
    <>
      <div className=" mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Our <span className="text-green-400 ">Sub Categories</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Discover top Categories available in our store
        </p>
      </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {subCategories?.map((subCat) => (
        

            <Link key={subCat._id}
      href={`/subcategories/${subCat._id}`}
      className="group block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-green-500 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition">
          {subCat.name}
        </h3>

        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
      </div>

      

        <div className="mt-5">
        <span className="text-sm font-medium text-green-600">
          Browse Products →
        </span>
      </div>
    </Link>


    ))}
</div>
    </>
  );
}
