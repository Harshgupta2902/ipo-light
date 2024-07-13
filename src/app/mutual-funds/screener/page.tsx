"use client"

import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import ScreenerTable from "@/components/ipo/screener/screener-table";
import React from "react";

const Screener = async () => {
    let result = null;

    try {
        const response = await get(endpoints.getMfScreener);
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