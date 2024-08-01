import { endpoints } from "@/api/endpoints";
import ScreenerMfHomePage from "@/components/mutualfunds/screener-home-page";
import React from "react";


const fetchMfScreener = async () => {
    try {
        const response = await fetch(endpoints.getMfScreener, {
            cache: "no-store",
        }); if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching GmpIpo", error);
        throw error;
    }
};


const Screener = async () => {
    let result = null;
    try {
        result = await fetchMfScreener();
    } catch (err) {
        console.error(`error ${err}`);
    }

    return (
        <div>
            <ScreenerMfHomePage content={result.content} total_results={result.total_results} />
        </div>
    );
};
export default Screener;