'use client';

import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CategorySliderSkeleton, CategorySliderSkeletonOverlay } from './categoryLoader';
import Link from 'next/link';

type SliderProps = {
  allCategories: string[];
};

export default function CategorySlider({ allCategories }: SliderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!allCategories || allCategories.length === 0) {
    return <CategorySliderSkeleton />;
  }

  return (
    <section className="container mx-auto px-4 mt-10">
      <div className="relative">
        {!isLoaded && <CategorySliderSkeletonOverlay />}

        <Swiper
          modules={[Autoplay, Pagination, A11y]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          onSwiper={() => setIsLoaded(true)}
          className="pb-10"
        >
          {allCategories.map((imageSrc, index) => (
            <SwiperSlide key={index}>
              <Link href={`/categories`} className="block">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-white group cursor-pointer">
                <Image
                  src={imageSrc}
                  alt="category"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
