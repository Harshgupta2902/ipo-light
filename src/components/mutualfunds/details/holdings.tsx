"use client"

import React, { useState } from "react";

const keysToDisplay = [
    "company_name",
    "sector_name",
    "instrument_name",
    "corpus_per"
];
const Holdings = ({ holdings }: { holdings: any; }) => {
    const [showAll, setShowAll] = useState(false);
    const initialItemCount = 10;
    const displayedHoldings = showAll ? holdings : holdings.slice(0, initialItemCount);

    return (
        <div>
            <h2 className="text-lg font-bold">Holdings <span className="text-2xl font-normal">({holdings.length})</span></h2>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="align-middle content">
                        <table className="w-full content text-sm text-left  text-gray-500">
                            <thead className="text-md text-gray-700 bg-gray-50">
                                <tr>
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Sector</th>
                                    <th className="py-2">Instrument</th>
                                    <th className="py-2">Assets</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedHoldings.map((item: any, index: number) => (
                                    <tr key={index}>
                                        {keysToDisplay.map((key) => (
                                            <td key={key} className="py-3">
                                                {key === "corpus_per" ? `${item[key]}%` : `${item[key] === null ? "NA" : item[key]}`}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {holdings.length > initialItemCount && (
                                    <tr>
                                        <td colSpan={keysToDisplay.length} className="text-center py-3">
                                            <button
                                                onClick={() => setShowAll(!showAll)}
                                                className="px-4 rounded font-normal"
                                            >
                                                {showAll ? "Show Less" : "Show More"}
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Holdings;