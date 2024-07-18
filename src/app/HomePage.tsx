"use client"
import SimpleSlider from "@/components/home/Slider";
import React, { useEffect, useState } from 'react';
import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import Loader from "./Loader";
import dynamic from 'next/dynamic';



interface HomePageProps {
    indicesResult: any | null;
    gainersResult: any | null;
    losersResult: any | null;
    mostActiveResult: any | null;
    approachingHighResult: any | null;
    approachingLowResult: any | null
}


const MarketSector = dynamic(() => import("@/components/home/market-sector"), {
    loading: () => <Loader />,
});
const Invest = dynamic(() => import("@/components/home/invest"), {
    loading: () => <Loader />,
});
const StocksCard = dynamic(() => import("@/components/home/stocks-card"), {
    loading: () => <Loader />,
});

const HomePageDetails: React.FC<HomePageProps> = ({ indicesResult, gainersResult, losersResult, mostActiveResult, approachingHighResult, approachingLowResult }) => {

    return (
        <main>
            <section className="lg:pt-20 sm:pt-0">
                <div className="container">
                    <div className="row text-center">
                        <div className="mx-auto lg:col-8">
                            <h1 className="font-primary font-bold">
                                All-in-One Fintech Platform
                            </h1>
                            <p className="mt-4 mb-8">
                                Discover the ultimate fintech platform for all your financial needs. Access mutual funds, stocks, IPOs, and powerful financial calculators in one place. Simplify your investments and make informed decisions with our comprehensive tools and insights
                            </p>
                            <img
                                alt="banner-image"
                                width="750"
                                height="395"
                                decoding="async"
                                data-nimg="1"
                                className="mx-auto"
                                style={{ color: "transparent" }}
                                src="/banner.svg"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className="section">
                <div className="container">
                    <div className="row items-center justify-between">
                        <SimpleSlider />
                    </div>
                </div>
            </div>



            <section className="section bg-theme-light ">
                <div className="container">
                    <div className="row mt-8 lg:mt-0 gy-5 lg:gy-0">
                        <div className="md:col-12">
                            <div className="rounded bg-body py-6 px-6 h-full">
                                <div
                                    className="flex px-24"
                                    style={{ justifyContent: "space-between" }}
                                >
                                    <p className="mb-4">Market and Sector</p>
                                </div>
                                <div className="flex flex-wrap justify-center mt-0">
                                    {indicesResult && indicesResult.slice(0, 9).map((item: any, index: any) => (
                                        <div key={index} className="inline-flex flex-wrap items-center group">
                                            <MarketSector
                                                data={item.points}
                                                lastPrice={item.lastClosePrice}
                                                name={item.name}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StocksCard
                gainers={gainersResult?.gainers || []}
                losers={losersResult?.losers || []}
                active={mostActiveResult?.active || []}
                approachingHigh={approachingHighResult?.approachingHigh || []}
                approachingLow={approachingLowResult?.approachingLow || []}
            />
            <Invest />
        </main>
    );
};

export default HomePageDetails;

