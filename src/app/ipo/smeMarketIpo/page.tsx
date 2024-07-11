"use client";

import axios from "axios";


import { endpoints } from "@/api/endpoints";
import SmeDataTable from "@/components/ipo/smeMarketIpo/SmeDataTables";
import SmeFaq from "@/components/ipo/smeMarketIpo/SmeFaq";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.smeipo,
    );
    result = response.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }

  return (
    <>
      <SmeDataTable data={result} />
      <SmeFaq />
    </>
  );
};

export default Home;
