import Link from "next/link";
import UpcomingIpo from "@/components/ipo/home/HomeDataTables";
import HomeFaq from "@/components/ipo/home/HomeFaq";
import ImageFallback from "@/components/common/ImageFallback";
import { endpoints } from "@/api/endpoints";

const fetchIpoHomePage = async () => {
  try {
    const response = await fetch(endpoints.homePage);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Ipo HomePage", error);
    throw error;
  }
};

const Home = async () => {
  let result = null;
  try {
    result = await fetchIpoHomePage();
  } catch (err) {
    console.error(`error ${err}`);
  }

  return (
    <>
      <section >
        <div className="container">
          <div className={`row items-centerflex-col lg:flex-row`}>
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
              >
                {"Check Ipo Allotment Status"}
              </Link>
            </div>
            <div className={`lg:col-4 lg:order-2 order-1`}>
              <ImageFallback
                src={"/ipo_banner.svg"}
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
      <UpcomingIpo
        smeData={result.smeData}
        upcomingData={result.upcomingData}
      />
      <HomeFaq />
    </>
  );
};

export default Home;
