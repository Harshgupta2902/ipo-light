"use client";
import React, { useState, useEffect } from "react";

interface Fund {
    mfId: string;
    slug: string;
    name: string;
    values: {
        filter: string;
        doubleVal?: number;
        strVal?: string;
    }[];
    sector: string;
}

interface Props {
    data: Fund[];
}

const ScreenerTable: React.FC<Props> = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleData, setVisibleData] = useState<Fund[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(20);

    useEffect(() => {
        setVisibleData(data.slice(0, itemsPerPage));
    }, [data, itemsPerPage]);

    const loadMoreItems = () => {
        const currentLength = visibleData.length;
        const nextBatch = data.slice(currentLength, currentLength + itemsPerPage);
        setVisibleData([...visibleData, ...nextBatch]);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setItemsPerPage(20); // Reset itemsPerPage when searching

        // Filter based on both initially loaded data and additional data
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(query)
        );
        setVisibleData(filtered.slice(0, itemsPerPage));
    };

    const filteredData = visibleData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return (
        <section className="section">
            <div className="container">
                <>
                    <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                        <div></div>
                        <div className="relative">
                            <input
                                type="text"
                                id="table-search"
                                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
                                placeholder="Search for items"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Fund Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Assets Under Management (AUM)
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        3-Year Return (%)
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Expense Ratio
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Subsector
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Option
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((fund, index) => (
                                    <tr key={fund.mfId} className="bg-white border-b ">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <a href={""} className="text-blue-600 hover:underline">
                                                {fund.name}
                                            </a>
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

                    </div>
                    {data.length > visibleData.length && (
                        <div className="flex justify-center mt-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={loadMoreItems}
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            </div>
        </section>

    );
};

export default ScreenerTable;
