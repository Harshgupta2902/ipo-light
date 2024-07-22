import { endpoints } from "@/api/endpoints";
import GmpDataTables from "@/components/ipo/greyMarketIpo/GmpDataTables";
import OldGmpDataTables from "@/components/ipo/greyMarketIpo/OldGmpDataTables";
import GmpFaq from "@/components/ipo/greyMarketIpo/GmpFaq";


const fetchGmpIpo = async () => {
  try {
    const response = await fetch(endpoints.gmpIpo);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching GmpIpo", error);
    throw error;
  }
};


const GmpIpoHomePage = async () => {
  let result = null;

  try {
    result = await fetchGmpIpo();
  } catch (err) {
    console.error(`error ${err}`);
  }

  return (
    <>
      <GmpDataTables data={result} />
      <OldGmpDataTables data={result} />
      <GmpFaq />
    </>
  );
};

export default GmpIpoHomePage;
