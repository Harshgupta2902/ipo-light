"use client";

import axios from "axios";

import { endpoints } from "@/api/endpoints";
import SubsCriptionDataTable from "@/components/ipo/subscriptionStatus/SubsCriptionDataTables";
import SubscriptionFaq from "@/components/ipo/subscriptionStatus/SubsCriptionFaq";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.iposubs,
    );
    result = response.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }

  return (
    <>

      <SubsCriptionDataTable data={result} />
      <SubscriptionFaq />
    </>
  );
};

export default Home;
