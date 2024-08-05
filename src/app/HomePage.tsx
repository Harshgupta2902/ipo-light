import SimpleSlider from "@/components/home/Slider";
import React from 'react';
import Loader from "./Loader";
import dynamic from 'next/dynamic';
import Image from "next/image";



interface HomePageProps {
    indicesResult: any | null;
    gainersResult: any | null;
    losersResult: any | null;
    mostActiveResult: any | null;
    approachingHighResult: any | null;
    approachingLowResult: any | null
}


// const MarketSector = dynamic(() => import("@/components/home/market-sector"), {
//     loading: () => <Loader />,
// });
const Invest = dynamic(() => import("@/components/home/invest"), {
    loading: () => <Loader />,
});
// const StocksCard = dynamic(() => import("@/components/home/stocks-card"), {
//     loading: () => <Loader />,
// });

const HomePageDetails: React.FC<HomePageProps> = ({ indicesResult, gainersResult, losersResult, mostActiveResult, approachingHighResult, approachingLowResult }) => {

    return (
        <main>
            <section className="lg:pt-1 sm:pt-1">
                <div className="container">
                    <div className="row text-center">
                        <div className="mx-auto lg:col-8">
                            <h1 className="font-primary font-bold">
                                All-in-One Fintech Platform
                            </h1>
                            <p className="mt-4 mb-8">
                                Discover the ultimate fintech platform for all your financial needs. Access mutual funds, stocks, IPOs, and powerful financial calculators in one place. Simplify your investments and make informed decisions with our comprehensive tools and insights
                            </p>
                            <Image
                                alt="banner-image"
                                width="750"
                                height="395"
                                decoding="async"
                                className="mx-auto"
                                style={{ color: "transparent" }}
                                src="/home/banner.svg"
                                priority
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

            <Invest />
        </main>
    );
};

export default HomePageDetails;

