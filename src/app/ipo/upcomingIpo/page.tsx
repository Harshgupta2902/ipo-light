"use client";

import axios from "axios";

import { endpoints } from "@/api/endpoints";
import UpcomingDataTable from "@/components/ipo/upcomingIpo/UpcomingDataTables";
import UpcomingFaq from "@/components/ipo/upcomingIpo/upcomingFaq";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.upcomingIpo,);
    result = response.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }

  return (
    <>
      <UpcomingDataTable data={result} />
      <UpcomingFaq />
    </>
  );
};

export default Home;
