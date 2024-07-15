"use client"
import SimpleSlider from "../components/home/Slider";
import MarketSector from "../components/home/market-sector";
import Invest from "../components/home/invest";
import React, { useEffect, useState } from 'react';
import { get } from "../api/api";
import { endpoints } from "../api/endpoints";
import StocksCard from "@/components/home/stocks-card";
import MarketSectorShimmer from "@/components/shimmers/market-sector-shimmer";
import Loader from "./Loader";

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


const Home: React.FC = () => {
  const [indicesResult, setIndicesResult] = useState<any>(null);
  const [gainersResult, setGainersResult] = useState<any>(null);
  const [losersResult, setLosersResult] = useState<any>(null);
  const [mostActiveResult, setMostActiveResult] = useState<any>(null);
  const [approachingHighResult, setApproachingHighResult] = useState<any>(null);
  const [approachingLowResult, setApproachingLowResult] = useState<any>(null);
  const [loadingIndices, setLoadingIndices] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          get(endpoints.indices),
          get(endpoints.gainers),
          get(endpoints.losers),
          get(endpoints.mostActive),
          get(endpoints.approachingHigh),
          get(endpoints.approachingLow),
        ]);

        setIndicesResult(responses[0].data);
        setGainersResult(responses[1].data);
        setLosersResult(responses[2].data);
        setMostActiveResult(responses[3].data);
        setApproachingHighResult(responses[4].data);
        setApproachingLowResult(responses[5].data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingIndices(false);
      }
    };

    fetchData();
  }, []);

  const topIndices = indicesResult?.slice(0, 9) || [];
  if (loadingIndices) return <Loader />;

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
                loading="lazy"
                width="750"
                height="395"
                decoding="async"
                data-nimg="1"
                className="mx-auto"
                style={{ color: "transparent" }}
                src="https://bigspring-nextjs.vercel.app/images/banner.svg"
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
                  {/* <a href="#">
                    <p className="mb-4 a-blue">View All</p>
                  </a> */}
                </div>
                <div className="flex flex-wrap justify-center mt-0">
                  {loadingIndices ? (
                    Array.from({ length: 9 }).map((_, index) => (
                      <div key={index} className="inline-flex flex-wrap items-center group">
                        <MarketSectorShimmer />
                      </div>
                    ))
                  ) : (
                    topIndices.map((item: any, index: any) => (
                      <div key={index} className="inline-flex flex-wrap items-center group">
                        <MarketSector
                          data={item.points}
                          lastPrice={item.lastClosePrice}
                          name={item.name}
                        />
                      </div>
                    ))
                  )}
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

export default Home;
