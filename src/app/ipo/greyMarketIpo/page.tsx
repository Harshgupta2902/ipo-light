"use client";

import axios from "axios";

import { endpoints } from "@/api/endpoints";
import GmpDataTables from "@/components/ipo/greyMarketIpo/GmpDataTables";
import OldGmpDataTables from "@/components/ipo/greyMarketIpo/OldGmpDataTables";
import GmpFaq from "@/components/ipo/greyMarketIpo/GmpFaq";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.gmpIpo,
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
