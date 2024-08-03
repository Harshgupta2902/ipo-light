import React from "react";

const keysToDisplay = [
    "title",
    "stat_1y",
    "stat_3y",
    "stat_5y",
    "stat_all"
];
const AnnualizedReturns = ({ stats }: { stats: any; }) => {

    return (
        <div>
            <h2 className="text-xl font-bold">Returns and rankings</h2>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="align-middle content">
                        <table className="w-full text-sm text-left  text-gray-500">
                            <thead className="text-md text-gray-700 bg-gray-50">
                                <tr>
                                    <th className="py-2"> </th>
                                    <th className="py-2">1Y</th>
                                    <th className="py-2">3Y</th>
                                    <th className="py-2">5Y</th>
                                    <th className="py-2">All</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.map((item: any, index: number) => (
                                    <tr key={index}>
                                        {keysToDisplay.map((key) => (
                                            <td key={key} className="py-3">
                                                {key === "title" ? `${item[key]}` : (
                                                    item[key] === null ? "NA%" : `${item[key]?.toFixed(2)}%`
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AnnualizedReturns;