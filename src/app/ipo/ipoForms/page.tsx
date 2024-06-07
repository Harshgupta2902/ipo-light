"use server";

import axios from "axios";
import FormsDataTables from "../../../components/ipo/ipoForms/FormsDataTables";
import FormsFaq from "../../../components/ipo/ipoForms/FormsFaq";

const Home = async () => {
  let result = null;

  try {
    const response = await axios.get(
      "https://ipo.onlineinfotech.net/Apis/formsData",
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
