"use server";

import axios from "axios";

import SmeDataTables from "../../../components/ipo/smeMarketIpo/SmeDataTables";
import SmeFaq from "../../../components/ipo/smeMarketIpo/SmeFaq";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      "https://ipo.onlineinfotech.net/Apis/smeData",
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
    result = response.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }

  return (
    <>
      <SmeDataTables data={result} />
      <SmeFaq />
    </>
  );
};

export default Home;
