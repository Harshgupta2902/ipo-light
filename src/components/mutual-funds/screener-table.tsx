"use serve"

import Link from "next/link";
import React from "react";
import { Fund } from "../interfaces";


const ScreenerTable = ({ visibleData }: { visibleData: Fund[] }) => {
    return (
        <table className="w-full text-sm text-left content text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3" >
                        <div className="flex items-center">
                            Fund Name{" "}

                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3" >
                        <div className="flex items-center">
                            AUM

                        </div>

                    </th>
                    <th scope="col" className="px-6 py-3" >
                        <div className="flex item-center">
                            3-Year Return (%)

                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3" >
                        <div className="flex item-center">
                            Expense Ratio

                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Subsector
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Plan
                    </th>
                </tr>
            </thead>
            <tbody>
                {visibleData.map((fund) => (
                    <tr key={fund.mfId} className="bg-white border-b ">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            <Link
                                style={{
                                    textDecoration: "none",
                                    fontSize: "medium",
                                }} href={`/mutual-funds/details${fund.slug.replace("/mutualfunds", "")}`}
                                target={"_blank"}
                                rel="noopener"
                            >
                                {fund.name}
                            </Link>
                        </td>
                        <td className="px-6 py-4">
                            {fund.values
                                .find((item) => item.filter === "aum")
                                ?.doubleVal?.toLocaleString()}{" "}
                        </td>
                        <td className="px-6 py-4">
                            {fund.values
                                .find((item) => item.filter === "ret3y")
                                ?.doubleVal?.toFixed(2)}{" "}
                            %{" "}
                        </td>
                        <td className="px-6 py-4">
                            {fund.values
                                .find((item) => item.filter === "expRatio")
                                ?.doubleVal?.toFixed(2)}{" "}
                        </td>
                        <td className="px-6 py-4">
                            {
                                fund.values.find((item) => item.filter === "subsector")
                                    ?.strVal
                            }
                        </td>
                        <td className="px-6 py-4">
                            {fund.values.find((item) => item.filter === "option")?.strVal}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default ScreenerTable;