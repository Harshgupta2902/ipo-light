"use client";

import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../style/slider.css";
import ImageFallback from "../common/ImageFallback";
import { SliderProps } from "../interfaces";

const imageUrls: string[] = [
  "/AMC/image_0.png",
  "/AMC/image_1.png",
  "/AMC/image_2.png",
  "/AMC/image_3.png",
  "/AMC/image_4.png",
  "/AMC/image_5.png",
  "/AMC/image_6.png",
  "/AMC/image_7.png",
  "/AMC/image_8.png",
  "/AMC/image_9.png",
  "/AMC/image_10.png",
  "/AMC/image_11.png",
  "/AMC/image_12.png",
  "/AMC/image_13.png",
  "/AMC/image_14.png",
  "/AMC/image_15.png",
  "/AMC/image_16.png",
  "/AMC/image_17.png",
  "/AMC/image_18.png",
  "/AMC/image_19.png",
  "/AMC/image_20.png",
  "/AMC/image_21.png",
  "/AMC/image_22.png",
  "/AMC/image_23.png",
  "/AMC/image_24.png",
  "/AMC/image_25.png",
  "/AMC/image_26.png",
  "/AMC/image_27.png",
  "/AMC/image_28.png"
];



export default function Slider() {
  return (
    <>
      <Swiper
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}

        slidesPerView={12}
        spaceBetween={30}
        modules={[Autoplay]}
        speed={8000}
      >
        {imageUrls.map((url, index) => (
          <div key={index} className="container" style={{ backgroundColor: "black" }}>
            <SwiperSlide key={index} className="mx-[2rem]">
              <ImageFallback
                src={url}
                alt={`Slide ${index + 1}`}
                className="w-auto max-w-none object-covers max-sm:h-12"
                width="70"
                height="70"
                loading="lazy"
              />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  );
}
