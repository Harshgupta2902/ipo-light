import { endpoints } from "@/api/endpoints";
import BuyBackDataTables from "@/components/ipo/sharesBuyBack/BuyBackDataTables";
import BuyBackFaq from "@/components/ipo/sharesBuyBack/BuyBackFaq";


const fetchBuybackIpo = async () => {
  try {
    const timestamp = new Date().toISOString();
    const response = await fetch(`${endpoints.ipoBuyBack}?time=${timestamp}`);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching BuybackIpo", error);
    throw error;
  }
};

const BuyBackIpoHomePage = async () => {
  let result = null;

  try {
    result = await fetchBuybackIpo();
  } catch (err) {
    console.error(`error ${err}`);
  }

  return (
    <>
      <BuyBackDataTables data={result} />
      <BuyBackFaq />
    </>
  );
};

export default BuyBackIpoHomePage;
