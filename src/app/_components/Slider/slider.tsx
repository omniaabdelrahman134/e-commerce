'use client';

import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useState } from 'react';

import img1 from '@/assets/images/slider-2.jpeg';
import img2 from '@/assets/images/grocery-banner-2.jpeg';

import 'swiper/css';
import 'swiper/css/pagination';
import { SliderSkeleton, SliderSkeletonMain } from './sliderLoading';

type SliderProps = {
  images: string[];
};

export default function Slider({ images }: SliderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!images || images.length === 0) {
    return <SliderSkeleton />;
  }

  return (
    <section className="container mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">

        {/* ================= MAIN SLIDER ================= */}
        <div className="lg:col-span-3 h-[250px] sm:h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-md relative">

          {!isLoaded && <SliderSkeletonMain />}

          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            loop
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="h-full"
            onSwiper={() => setIsLoaded(true)}
          >
            {images.map((imageSrc, index) => (
              <SwiperSlide key={index} className="h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={imageSrc}
                    alt="slider image"
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= SIDE BANNERS ================= */}
        <div className="hidden lg:flex flex-col justify-between h-[450px] gap-6">

          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={img1}
              alt="banner 1"
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={img2}
              alt="banner 2"
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>

        </div>

      </div>
    </section>
  );
}