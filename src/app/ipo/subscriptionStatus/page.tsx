"use client";

import axios from "axios";

import { endpoints } from "@/api/endpoints";
import SubsCriptionDataTable from "@/components/ipo/subscriptionStatus/SubsCriptionDataTables";
import SubscriptionFaq from "@/components/ipo/subscriptionStatus/SubsCriptionFaq";



const fetchSubscriptionIpo = async () => {
  try {
    const timestamp = new Date().toISOString();
    const response = await fetch(`${endpoints.iposubs}?time=${timestamp}`);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching SubscriptionIpo", error);
    throw error;
  }
};


const SubscriptionIpoHomePage = async () => {
  let result = null;
  try {
    result = await fetchSubscriptionIpo();
  } catch (err) {
    console.error(`error ${err}`);
  }

  return (
    <>

      <SubsCriptionDataTable data={result} />
      <SubscriptionFaq />
    </>
  );
};

export default SubscriptionIpoHomePage;
