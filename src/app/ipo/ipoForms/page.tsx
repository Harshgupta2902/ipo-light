"use client";

import axios from "axios";

import { endpoints } from "@/api/endpoints";
import FormsDataTable from "@/components/ipo/ipoForms/FormsDataTables";
import FormsFaq from "@/components/ipo/ipoForms/FormsFaq";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.ipoForms,
    );
    result = response.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }

  return (
    <>
      <FormsDataTable data={result} />
      <FormsFaq />
    </>
  );
};

export default Home;
