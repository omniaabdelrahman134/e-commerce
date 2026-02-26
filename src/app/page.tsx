import img1 from '@/assets/images/slider-image-1.jpeg';
import img2 from '@/assets/images/slider-image-2.jpeg';
import img3 from '@/assets/images/slider-image-3.jpeg';
import CategorySlider from './_components/categorySlider/CategorySlider';
import ProductCard from './_components/ProductCard/productCard';
import Slider from './_components/Slider/slider';
import { getAllCategories } from './_services/category.servoce';
import { getAllProducts } from './_services/products.service';
import { ProductType } from './_types/products.type';

const images = [img1.src, img2.src, img3.src];

export default async function Home() {
  const allCategories: Array<{ image: string }> = (await getAllCategories()) || [];
  const getProducts = await getAllProducts('');

  if (!getProducts) {
    return (
      <h1 className="text-3xl font-bold text-center my-24 animate-fadeIn">
        No Products Found
      </h1>
    );
  }

  return (
    <div className="space-y-16 px-5 md:px-10">
      {/* Hero Slider Section */}
      <div className="animate-fadeInDown mt-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-6">
          Welcome to <span className="text-green-500">FreshCart</span>
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Discover the best products from top brands and categories
        </p>
        <Slider images={images} />
      </div>

      {/* Categories Section */}
      <div className="animate-fadeInUp">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center relative before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-1 before:rounded-full before:bg-green-500">
          Explore <span className="text-green-500">Categories</span>
        </h2>
        <CategorySlider
          allCategories={allCategories?.map((category) => category.image) || []}
        />
      </div>

      {/* Products Section */}
      <div className="animate-fadeInUp">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center relative before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-1 before:rounded-full before:bg-green-500">
          Our <span className="text-green-500">Products</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getProducts.map((product: ProductType) => (
            <div
              key={product.id}
              className="transform transition duration-500 hover:scale-105 hover:shadow-xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}