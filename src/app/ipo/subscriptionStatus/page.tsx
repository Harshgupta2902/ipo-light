"use server";

import axios from "axios";

import SubsCriptionDataTables from "../../../components/ipo/subscriptionStatus/SubsCriptionDataTables";
import SubsCriptionFaq from "../../../components/ipo/subscriptionStatus/SubsCriptionFaq";
import { endpoints } from "@/api/endpoints";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.subscriptionData, {
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

      <SubsCriptionDataTables data={result} />
      <SubsCriptionFaq />
    </>
  );
};

export default Home;
