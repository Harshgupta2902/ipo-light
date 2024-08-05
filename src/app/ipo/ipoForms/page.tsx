import { endpoints } from "@/api/endpoints";
import FormsDataTable from "@/components/ipo/ipoForms/FormsDataTables";
import FormsFaq from "@/components/ipo/ipoForms/FormsFaq";

const fetchFormsIpo = async () => {
  try {
    const timestamp = new Date().toISOString();
    const response = await fetch(`${endpoints.ipoForms}?time=${timestamp}`);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching FormsIpo", error);
    throw error;
  }
};



const FormsIpoHomePage = async () => {
  let result = null;

  try {
    result = await fetchFormsIpo();
  } catch (err) {
    console.error(`error ${err}`);
  }

  return (
    <>
      <FormsDataTable data={result} />
      <FormsFaq />
    </>
  );
};

export default FormsIpoHomePage;
