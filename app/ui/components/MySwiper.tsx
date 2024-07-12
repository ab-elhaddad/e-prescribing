"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { CSSProperties, JSXElementConstructor } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";

export default function MySwiper({
  slides,
}: {
  slides: {
    Icon: JSXElementConstructor<{ className?: string; style?: CSSProperties }>;
    title: string;
  }[];
}) {
  return (
    <div className="container mx-80 px-40">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={1}
        slidesPerView={5}
        loop={true}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        // navigation
        // pagination={{ type: "fraction" }}
        // modules={[Navigation, Pagination]}
        // onSwiper={(swiper) => console.log(swiper)}
        // className="h-96 w-full rounded-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title} className="text-sky-600">
            <div className="flex flex-col h-full w-full items-center justify-center">
              <slide.Icon
                className="bg-white md:p-5 rounded-full mb-5 shadow-md text-xs md:text-[7rem]"
              />
              <p className="font-bold text-gray-700 text-xs md:text-lg">{slide.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
