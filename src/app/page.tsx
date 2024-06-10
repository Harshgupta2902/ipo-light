import SimpleSlider from "../components/home/Slider";
import MarketSector from "../components/home/market-sector";
import Invest from "../components/home/invest";

import { get } from "../api/api";
import { endpoints } from "../api/endpoints";
import StocksCard from "@/components/home/stocks-card";

const Home = async () => {

  let indicesResult = null;
  let gainersResult = null;
  let losersResult = null;
  let mostActiveResult = null;
  let approachingHighResult = null;
  let approachingLowResult = null;

  try {
    const [
      indicesData,
      gainersData,
      losersData,
      mostActiveData,
      approachingHighData,
      approachingLowData,
    ] = await Promise.all([
      get(endpoints.indices),
      get(endpoints.ganiers),
      get(endpoints.losers),
      get(endpoints.mostActive),
      get(endpoints.approachingHigh),
      get(endpoints.approachingLow),
    ]);

    indicesResult = indicesData.data;
    gainersResult = gainersData.data;
    losersResult = losersData.data;
    mostActiveResult = mostActiveData.data;
    approachingHighResult = approachingHighData.data;
    approachingLowResult = approachingLowData.data;

    console.log("Fetching data:", {
      indicesResult,
      gainersResult,
      losersResult,
      mostActiveResult,
      approachingHighResult,
      approachingLowResult,
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const topIndices = indicesResult.slice(0, 9);

  return (
    <main>
      <section className="pt-20">
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
                  <a href="#">
                    <p className="mb-4 a-blue">View All</p>
                  </a>
                </div>
                <div className="flex flex-wrap justify-center mt-0">
                  {topIndices.map((item: any) => (
                    <MarketSector
                      data={item.points}
                      lastPrice={item.lastClosePrice}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-20">
        <div className="container text-center">
          <div className="">
          <StocksCard 
              gainers={gainersResult.gainers}
              losers={losersResult.losers}
              active={mostActiveResult.active}
              approachingHigh={approachingHighResult.approachingHigh}
              approachingLow={approachingLowResult.approachingLow}
            />
          </div>
        </div>
      </section>
      <Invest />
    </main>
  );
};

export default Home;
