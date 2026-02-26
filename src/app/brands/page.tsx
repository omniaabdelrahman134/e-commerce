import Image from 'next/image';
import Link from 'next/link';
import GetAllBrands from '../_services/Brands/brands';
import { Brand } from '../_types/carrt-types/cartTypes';
import BrandsSkeleton from './BrandsSkeleton';

export default async function Page() {
  try {
    const response = await GetAllBrands();
    const brands: Brand[] = response?.data || [];

    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Our <span  className="text-green-400 ">Brands</span></h1>
          <p className="text-gray-500 mt-2">
            Discover top brands available in our store
          </p>
        </div>

        {brands.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p>No brands available right now.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {brands.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
                <BrandsSkeleton key={index} />
              ))
            : brands.map((brand) => (
                <div
                  key={brand._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center group m-2"
                >
                  <div className="relative w-28 h-28 mb-4">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2">
                    {brand.name}
                  </h2>

                  <Link
                    href={`brands/${brand._id}`}
                    className="mt-auto px-5 py-2 bg-green-400 text-white rounded-xl hover:bg-green-600 transition w-full text-center"
                  >
                    View Products
                  </Link>
                </div>
              ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Something went wrong while loading brands.
        </p>
      </div>
    );
  }
}