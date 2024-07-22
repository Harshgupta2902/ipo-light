import { endpoints } from "@/api/endpoints";
import SmeDataTable from "@/components/ipo/smeMarketIpo/SmeDataTables";
import SmeFaq from "@/components/ipo/smeMarketIpo/SmeFaq";


const fetchSmeIpo = async () => {
  try {
    const response = await fetch(endpoints.smeipo);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching SmeIpo", error);
    throw error;
  }
};



const SmeIpoHomePage = async () => {
  let result = null;
  try {
    result = await fetchSmeIpo();
  } catch (err) {
    console.error(`error ${err}`);
  }

  return (
    <>
      <SmeDataTable data={result} />
      <SmeFaq />
    </>
  );
};

export default SmeIpoHomePage;
