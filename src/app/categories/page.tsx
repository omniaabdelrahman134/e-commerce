import Link from 'next/link';
import GetAllCategories from '../_services/Category/GetAllCategories';
import { categoryType } from '../_types/products.type';
import Image from 'next/image';
import SubCategory from '../subcategories/subCategory';
import CategoriesSkeleton from './loading';

export default async function Page() {
  const response = await GetAllCategories();
  const Categories: categoryType[] = response?.data || [];

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Our <span className="text-green-400">Categories</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Discover top categories available in our store
          </p>
        </div>

        {Categories.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p>No categories available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Categories.length === 0
              ? Array.from({ length: 8 }).map((_, index) => (
                  <CategoriesSkeleton key={index} />
                ))
              : Categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 flex flex-col overflow-hidden m-1"
                  >
                    <Link href={`categories/${cat._id}`} className="block">
                      <div className="relative w-full h-40 overflow-hidden rounded-t-lg group">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-center group-hover:scale-105 transition duration-300"
                          sizes="(max-width: 768px) 100vw, 20vw"
                        />
                      </div>
                    </Link>

                    <div className="p-4 flex flex-col items-center text-center">
                      <Link href={`categories/${cat._id}`}>
                        <h5 className="mt-2 mb-4 text-lg font-semibold tracking-tight text-gray-800 line-clamp-2">
                          {cat.name}
                        </h5>
                      </Link>

                      <Link
                        href={`categories/${cat._id}`}
                        className="mt-auto w-full px-3 py-1.5 bg-green-400 text-white rounded-lg hover:bg-green-600 transition text-center text-sm"
                      >
                        View Category
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>

      <div className="container px-6 py-8">
        <SubCategory />
      </div>
    </>
  );
}