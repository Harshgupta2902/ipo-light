import axios from "axios";
import SimpleSlider from "../components/home/Slider";
import MarketSector from "../components/home/market-sector";
import Table from "../components/common/Table";
import Invest from "../components/home/invest";
import StockCard from "../components/home/stocks-card";
import { get } from "../api/api";
import { endpoints } from "../api/endpoints";

const data = [
  {
    productName: "The Sliding Mr. Bones (Next Stop, Pottersville)",
    color: "Malcolm Lockyer",
    category: "1961",
    price: "$10.99",
  },
  {
    productName: "Witchy Woman",
    color: "The Eagles",
    category: "1972",
    price: "$8.99",
  },
  {
    productName: "Shining Star",
    color: "Earth, Wind, and Fire",
    category: "1975",
    price: "$9.99",
  },
];
const headers = ["Product name", "Color", "Category", "Price"];

const Home = async () => {
  let result = null;

  try {
    const data = await get(endpoints.indices);
    result = data.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
  const topIndices = result.slice(0, 9);

  return (
    <main>
      <section className="pt-20">
        <div className="container">
          <div className="row text-center">
            <div className="mx-auto lg:col-8">
              <h1 className="font-primary font-bold">
                Let us solve your critical website development challenges
              </h1>
              <p className="mt-4 mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                nihil enim maxime corporis cumque <br /> totam aliquid nam sint
                inventore optio modi neque laborum officiis necessitatibus
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

      <section className="pt-20">
        <div className="container text-center">
          <div className="rounded bg-body py-6 px-6 shadow">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5  align-middle">
                  <Table headers={headers} data={data} />
                </div>
              </div>
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

      <section className="pt-20">
        <div className="container text-center">
          <div className="">
                <StockCard />
          </div>
        </div>
      </section>
      <section className="section bg-theme-light dark:bg-darkmode-theme-light">
        <div className="container">
          <div className="row mt-8 lg:mt-0 gy-5 lg:gy-0">
            <div className="md:col-12">
              <div className="rounded bg-body dark:bg-darkmode-secondary py-6 px-6 h-full">
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

      <Invest />
    </main>
  );
};

export default Home;
