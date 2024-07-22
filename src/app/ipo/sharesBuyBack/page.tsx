import { endpoints } from "@/api/endpoints";
import BuyBackDataTables from "@/components/ipo/sharesBuyBack/BuyBackDataTables";
import BuyBackFaq from "@/components/ipo/sharesBuyBack/BuyBackFaq";


const fetchBuybackIpo = async () => {
  try {
    const response = await fetch(endpoints.ipoBuyBack);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching BuybackIpo", error);
    throw error;
  }
};

const Home = async () => {
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

export default Home;
