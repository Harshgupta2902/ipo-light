"use client";

import { get, post } from "@/api/api";
import { usePathname } from "next/navigation";
import React from "react";

const Stocks = async () => {
    const pathname = usePathname();

    let result = null;

    if (pathname === "/scrap/mf") {
        try {
            const response = await post("https://api.tickertape.in/mf-screener/query", {
                match: { option: ["Growth"] },
                sortBy: "aum",
                sortOrder: -1,
                project: ["subsector", "option", "aum", "ret3y", "expRatio"],
                offset: 20,
                count: 1429,
                mfIds: [],
            });
            result = response.data;
        } catch (error) {
            console.error("Error fetching menu data:", error);
        }
    }
    else if (pathname === "/scrap/stock") {
        try {
            const response = await post("https://api.tickertape.in/screener/query", {
                match: {},
                sortBy: "mrktCapf",
                sortOrder: -1,
                project: ["subindustry", "mrktCapf", "lastPrice", "apef"],
                offset: 40,
                count: 5098,
                mfIds: [],
            });
            result = response.data;
        } catch (error) {
            console.error("Error fetching menu data:", error);
        }
    }

    return (
        <div>
            {pathname}
            {result ? (
                <pre>{JSON.stringify(result, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default Stocks;
