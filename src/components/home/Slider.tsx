"use client";

import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../style/slider.css";
import ImageFallback from "../common/ImageFallback";


const imageUrls: string[] = [
  "zerodha_groww.png",
  "whiteoak_groww.png",
  "uti_groww.png",
  "union_groww.png",
  "trust_groww.png",
  "taurus_groww.png",
  "tata_groww.png",
  "sundaram_groww.png",
  "shriram_groww.png",
  "sbi_groww.png",
  "samco_groww.png",
  "quantum_groww.png",
  "quant_groww.png",
  "ppfas_groww.png",
  "pgim_groww.png",
  "nj_groww.png",
  "nippon_groww.png",
  "navi_groww.png",
  "motilal_groww.png",
  "mirae_groww.png",
  "mahindra_groww.png",
  "lic_groww.png",
  "kotak_groww.png",
  "jm_groww.png",
  "iti_groww.png",
  "invesco_groww.png",
  "indiabulls_groww.png",
  "icici_groww.png",
  "hsbc_groww.png",
  "helios_groww.png",
  "hdfc_groww.png",
  "franklin_groww.png",
  "edelweiss_groww.png",
  "dsp_groww.png",
  "canara_groww.png",
  "barodabnpparibasmutualfund_groww.png",
  "bank_groww.png",
  "bandhan_groww.png",
  "bajaj_groww.png",
  "axis_groww.png",
  "aditya_groww.png",
  "360_groww.png"
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
                src={`/AMC/${url}`}
                alt={`Slide ${index + 1}`}
                className="w-full h-20 object-cover p-1"
                width="60"
                height="60"
                loading="lazy"

              />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  );
}
