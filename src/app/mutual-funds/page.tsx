import ImageFallback from "@/components/common/ImageFallback";
import Link from "next/link";
import React from "react";
import SimpleSlider from "@/components/home/Slider";

export default function MutualFundsHomePage() {
    return (
        <main>
            <section className="lg:pt-20 sm:pt-0">
                <div className="container">
                    <div className={`row items-center flex-col lg:flex-row`}>
                        <div className="lg:col-8 md:col-8 mb-8 ">
                            <h1 className="mb-4 text-h3 lg:text-h1">
                                Mutual Funds Investment <br /> For All
                            </h1>
                            <p className="mb-8">
                                Explore diversified mutual fund options tailored to your
                                financial goals. Gain insights and make informed investment
                                decisions with our comprehensive platform. Check mutual fund
                                performance and start investing today.
                            </p>
                        </div>
                        <div className={`lg:col-4 lg:order-2 order-1`}>
                            <ImageFallback
                                src={"/mf-home.png"}
                                className="mx-auto"
                                width="800"
                                height="420"
                                alt="banner image"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="section">
                <div className="container">
                    <div className="row items-center justify-between">
                        <SimpleSlider imageUrls={imageUrls} />
                    </div>
                </div>
            </div>

            <section className="lg:pt-20 sm:pt-0">
                <div className="container">
                    <div className="flex justify-between items-center max-sm:items-start">
                        <div className="text-[48px] font-clashSemibold text-[#0A0F1E] max-md:text-2xl">
                            Explore Mutual Funds
                        </div>

                        <a
                            className="flex items-center py-4 px-8 rounded-[10px] btn btn-primary text-white font-inter text-base font-medium hover:bg-primary cursor-pointer max-sm:px-4 max-sm:py-2 max-sm:text-xs max-sm:rounded"
                            href={"/mutual-funds/screener"}
                        >
                            <span className="shrink-0">Explore More</span>
                        </a>
                    </div>

                </div>
            </section>
        </main>
    );
}

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
