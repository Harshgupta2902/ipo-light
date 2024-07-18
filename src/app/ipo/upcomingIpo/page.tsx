"use client";
import { endpoints } from "@/api/endpoints";
import UpcomingDataTable from "@/components/ipo/upcomingIpo/UpcomingDataTables";
import UpcomingFaq from "@/components/ipo/upcomingIpo/upcomingFaq";
import { useEffect, useState } from "react";
import { get } from "@/api/api";
import Loader from "@/app/Loader";


const Home: React.FC = () => {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(endpoints.upcomingIpo);
        setResult(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {

      }
    };

    fetchData();
  }, [])

  return (
    <>
      {result ? <>
        <UpcomingDataTable data={result} />
        <UpcomingFaq />

      </> : <Loader />}
    </>
  );

};


export default Home;
