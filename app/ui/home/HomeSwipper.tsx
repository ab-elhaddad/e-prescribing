"use client";

import MySwiper from "@/components/MySwiper";
import swiperSlides from "@/app/lib/swiperSlides";

export default function HomeSwipper() {
  return <MySwiper slides={swiperSlides} />;
}
