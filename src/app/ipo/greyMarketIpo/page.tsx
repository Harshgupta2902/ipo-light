"use server";

import axios from "axios";
import GmpDataTables from "../../../components/ipo/greyMarketIpo/GmpDataTables";
import OldGmpDataTables from "../../../components/ipo/greyMarketIpo/OldGmpDataTables";
import GmpFaq from "../../../components/ipo/greyMarketIpo/GmpFaq";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      "https://ipo.onlineinfotech.net/Apis/gmpData",
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
      <GmpDataTables data={result} />
      <OldGmpDataTables data={result} />
      <GmpFaq />
    </>
  );
};

export default Home;
