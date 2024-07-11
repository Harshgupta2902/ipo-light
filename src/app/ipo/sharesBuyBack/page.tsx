"use server";

import axios from "axios";

import { endpoints } from "@/api/endpoints";
import BuyBackDataTables from "@/components/ipo/sharesBuyBack/BuyBackDataTables";
import BuyBackFaq from "@/components/ipo/sharesBuyBack/BuyBackFaq";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.ipoBuyBack,
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
