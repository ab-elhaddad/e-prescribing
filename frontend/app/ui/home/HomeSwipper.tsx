"use client";

import MySwiper from "@/app/ui/custom/MySwiper";
import swiperSlides from "@/app/lib/swiperSlides";

export default function HomeSwipper() {
  return <MySwiper slides={swiperSlides} />;
}
