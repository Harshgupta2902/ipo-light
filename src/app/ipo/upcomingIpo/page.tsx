"use client";

import axios from "axios";
import UpcomingDataTables from "../../../components/ipo/upcomingIpo/UpcomingDataTables";
import UpcomingFaq from "../../../components/ipo/upcomingIpo/upcomingFaq";
import { endpoints } from "@/api/endpoints";

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
      <UpcomingDataTables data={result} />
      <UpcomingFaq />
    </>
  );
};

export default Home;
