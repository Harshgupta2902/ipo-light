"use server";

import axios from "axios";
import Link from "next/link";

import UpcomingIpo from "@/components/ipo/home/HomeDataTables";

import HomeFaq from "@/components/ipo/home/HomeFaq";
import ImageFallback from "@/components/common/ImageFallback";
import { endpoints } from "@/api/endpoints";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.homePage,
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    result = response.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }

  return (
    <>
      <section className={`py-24 `}>
        <div className="container">
          <div
            className={`row items-centerflex-col lg:flex-row`}
          >
            <div className="lg:col-8 md:col-8 mb-8 ">
              <h1 className="mb-4 text-h3 lg:text-h1">
                Invest in the Future
                <br /> Fill IPO and Unlock Potential Growth
              </h1>
              <p className="mb-8">
                Discover the latest IPOs. Get thorough information and insights
                to help you make wise investment decisions
              </p>

              <Link
                className="btn btn-primary"
                href={"https://rti.kfintech.com/ipostatus/"}
                target={"_blank"}
                rel="noopener"
              >
                {"Check Ipo Allotment Status"}
              </Link>
            </div>
            <div className={`lg:col-4 lg:order-2 order-1`}>
              <ImageFallback
                src={"/banner.svg"}
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
      <UpcomingIpo data={result} />

      <HomeFaq />
    </>
  );
};

export default Home;
