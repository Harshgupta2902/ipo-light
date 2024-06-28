"use server";

import axios from "axios";
import FormsDataTables from "../../../components/ipo/ipoForms/FormsDataTables";
import FormsFaq from "../../../components/ipo/ipoForms/FormsFaq";
import { endpoints } from "@/api/endpoints";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      endpoints.formsData,
      {
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
      <FormsDataTables data={result} />
      <FormsFaq />
    </>
  );
};

export default Home;
