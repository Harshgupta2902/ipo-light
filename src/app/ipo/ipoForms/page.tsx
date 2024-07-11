"use client";

import axios from "axios";
import FormsDataTables from "../../../components/ipo/ipoForms/FormsDataTables";
import FormsFaq from "../../../components/ipo/ipoForms/FormsFaq";
import { endpoints } from "@/api/endpoints";

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
      <FormsDataTables data={result} />
      <FormsFaq />
    </>
  );
};

export default Home;
