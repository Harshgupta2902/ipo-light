import { endpoints } from "@/api/endpoints";
import UpcomingDataTable from "@/components/ipo/upcomingIpo/UpcomingDataTables";
import UpcomingFaq from "@/components/ipo/upcomingIpo/upcomingFaq";
import Loader from "@/app/Loader";


const fetchUpComingIpo = async () => {
  try {
    const response = await fetch(endpoints.upcomingIpo);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching upcomingIpo", error);
    throw error;
  }
};


const UpComingIpo = async () => {
  let result = null;
  try {
    result = await fetchUpComingIpo();
  } catch (err) {
    console.error(`error ${err}`);
  }

  return (
    <>
      {result ? <>
        <UpcomingDataTable data={result} />
        <UpcomingFaq />

      </> : <Loader />}
    </>
  );

};


export default UpComingIpo;
