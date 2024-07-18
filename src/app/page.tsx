
import { endpoints } from "@/api/endpoints";
import HomePageDetails from "./HomePage";


const fetchData = async () => {
  try {
    const responses = await Promise.all([
      fetch(endpoints.indices).then(res => res.json()),
      fetch(endpoints.gainers).then(res => res.json()),
      fetch(endpoints.losers).then(res => res.json()),
      fetch(endpoints.mostActive).then(res => res.json()),
      fetch(endpoints.approachingHigh).then(res => res.json()),
      fetch(endpoints.approachingLow).then(res => res.json()),
    ]);

    return {
      indices: responses[0],
      gainers: responses[1],
      losers: responses[2],
      mostActive: responses[3],
      approachingHigh: responses[4],
      approachingLow: responses[5],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


const HomePage = async () => {

  let HomeData = null;


  try {
    HomeData = await fetchData();
  } catch (err) {
    console.error(`error ${err}`);

  }

  return (
    <HomePageDetails approachingHighResult={HomeData?.approachingHigh.data} approachingLowResult={HomeData?.approachingLow.data} gainersResult={HomeData?.gainers.data} indicesResult={HomeData?.indices.data} losersResult={HomeData?.losers.data} mostActiveResult={HomeData?.mostActive.data} />
  );
}

export default HomePage;
