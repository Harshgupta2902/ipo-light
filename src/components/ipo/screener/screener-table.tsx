"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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
    const [sortColumn, setSortColumn] = useState<string>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
        setItemsPerPage(20);

        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(query)
        );
        setVisibleData(filtered.slice(0, itemsPerPage));
    };

    const handleNameSort = (column: string) => {
        const isCurrentColumn = column === sortColumn;
        const newOrder = isCurrentColumn && sortOrder === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(newOrder);

        const sortedData = [...data].sort((a, b) => {

            const aValue = a[column as keyof Fund];
            const bValue = b[column as keyof Fund];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return newOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                return newOrder === "asc" ? aValue - bValue : bValue - aValue;
            }

            return 0;
        });

        setVisibleData(sortedData.slice(0, itemsPerPage));
    };

    const handleSort = (column: string) => {
        const isCurrentColumn = column === sortColumn;
        const newOrder = isCurrentColumn && sortOrder === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(newOrder);

        const sortedData = [...data].sort((a, b) => {
            let aValue: number | undefined;
            let bValue: number | undefined;

            const findValue = (fund: Fund, filter: string): number | undefined => {
                const value = fund.values.find(item => item.filter === filter);
                return value?.doubleVal;
            };

            aValue = findValue(a, column);
            bValue = findValue(b, column);

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return newOrder === "asc" ? aValue - bValue : bValue - aValue;
            }

            return 0;
        });

        setVisibleData(sortedData.slice(0, itemsPerPage));
    };


    const filteredData = visibleData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="section">
            <div className="container">
                <>
                    <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                        <div>
                            <p className="text-gray-600">
                                Showing {filteredData.length} of {data.length} Funds
                            </p>
                        </div>
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
                                    <th scope="col" className="cursor-pointer px-6 py-3" onClick={() => handleNameSort("name")}>
                                        <div className="flex items-center">
                                            Fund Name{" "}
                                            {sortColumn === "name" && (
                                                <span>
                                                    {sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th scope="col" className="cursor-pointer px-6 py-3" onClick={() => handleSort("aum")}>
                                        <div className="flex items-center">
                                            AUM {sortColumn === "aum" && (
                                                <span>
                                                    {sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                                                </span>
                                            )}
                                        </div>

                                    </th>
                                    <th scope="col" className="cursor-pointer px-6 py-3" onClick={() => handleSort("ret3y")}>
                                        <div className="flex item-center">
                                            3-Year Return (%) {sortColumn === "ret3y" && (
                                                <span>
                                                    {sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th scope="col" className="cursor-pointer px-6 py-3" onClick={() => handleSort("expRatio")}>
                                        <div className="flex item-center">
                                            Expense Ratio {sortColumn === "expRatio" && (
                                                <span>
                                                    {sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th scope="col" className="cursor-pointer px-6 py-3">
                                        Subsector
                                    </th>
                                    <th scope="col" className="cursor-pointer px-6 py-3">
                                        Plan
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((fund) => (
                                    <tr key={fund.mfId} className="bg-white border-b ">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link
                                                className="hover:text-blue-600 text-dark hover:underline"
                                                href={`/mutual-funds${fund.slug.replace("/mutualfunds", "")}`}
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
