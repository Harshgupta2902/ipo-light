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



const Slider: React.FC<SliderProps> = ({ imageUrls }) => {
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

export default Slider;