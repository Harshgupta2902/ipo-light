"use server";

import axios from "axios";

import BuyBackDataTables from "../../../components/ipo/sharesBuyBack/BuyBackDataTables";
import BuyBackFaq from "../../../components/ipo/sharesBuyBack/BuyBackFaq";
import { endpoints } from "@/api/endpoints";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.buyBackData,
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
      <BuyBackDataTables data={result} />
      <BuyBackFaq />
    </>
  );
};

export default Home;
