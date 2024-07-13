"use client";

import React, { useEffect, useState } from 'react';
import { endpoints } from "@/api/endpoints";
import UpcomingDataTable from "@/components/ipo/upcomingIpo/UpcomingDataTables";
import UpcomingFaq from "@/components/ipo/upcomingIpo/upcomingFaq";
import { get } from "@/api/api";

// const Home = async () => {
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
        console.log("APi call ended");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <UpcomingDataTable data={result} />
      <UpcomingFaq />
    </>
  );
};

export default Home;
