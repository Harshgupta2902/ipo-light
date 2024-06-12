import { post } from "@/api/api";
import ScreenerTable from "@/components/ipo/screener/screener-table";
import React from "react";

const Screener = async () => {
    let result = null;

    try {
        const response = await post("https://api.tickertape.in/mf-screener/query", {
            match: {},
            sortBy: "aum",
            sortOrder: -1,
            project: ["subsector", "option", "aum", "ret3y", "expRatio"],
            offset: 20,
            count: 4994,
            mfIds: [],
        }    
    );
        result = response.data;
    } catch (error) {
        console.error("Error fetching menu data:", error);
    }
    return (
        <div>
            <ScreenerTable data={result.result} />
        </div>
    );
};
export default Screener;
