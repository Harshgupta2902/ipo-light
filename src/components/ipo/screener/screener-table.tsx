"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Fund, Screener } from "@/components/interfaces";

const filters = [
    {
        id: 'sector',
        name: 'Sector',
        options: [
            { value: 'Commodity', label: 'Commodity' },
            { value: 'Debt', label: 'Debt' },
            { value: 'Equity', label: 'Equity' },
            { value: 'Hybrid', label: 'Hybrid' },
            { value: 'Other', label: 'Other' },
        ],
    },
    {
        id: 'option',
        name: 'Option',
        options: [
            { value: 'IDCW', label: 'IDCW' },
            { value: 'Growth', label: 'Growth' },
            { value: 'Bonus', label: 'Bonus' },
        ],
    }
]


const ScreenerTable: React.FC<Screener> = ({ data }) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleData, setVisibleData] = useState<Fund[]>([]);
    const [filteredData, setFilteredData] = useState<Fund[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(20);
    const [sortColumn, setSortColumn] = useState<string>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
        option: [],
        sector: [],
    });


    useEffect(() => {
        applyFiltersAndSort();
    }, [data, itemsPerPage, searchQuery, sortColumn, sortOrder, selectedFilters]);

    const loadMoreItems = () => {
        const currentLength = visibleData.length;
        const nextBatch = data.slice(currentLength, currentLength + itemsPerPage);
        setVisibleData([...visibleData, ...nextBatch]);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setItemsPerPage(20);
    };

    const handleNameSort = (column: string) => {
        const isCurrentColumn = column === sortColumn;
        const newOrder = isCurrentColumn && sortOrder === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(newOrder);
    };

    const handleSort = (column: string) => {
        const isCurrentColumn = column === sortColumn;
        const newOrder = isCurrentColumn && sortOrder === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(newOrder);
    };

    const handleFilterChange = (filterId: string, option: string) => {
        setSelectedFilters((prev) => {
            const updated = { ...prev };
            if (updated[filterId].includes(option)) {
                updated[filterId] = updated[filterId].filter((item) => item !== option);
            } else {
                updated[filterId].push(option);
            }
            return updated;
        });
    };

    const applyFiltersAndSort = () => {
        let filteredData = data;


        if (searchQuery) {
            filteredData = filteredData.filter((item) =>
                item.name.toLowerCase().includes(searchQuery)
            );
        }

        Object.keys(selectedFilters).forEach((filterKey) => {
            const selectedOptions = selectedFilters[filterKey];

            if (selectedOptions.length > 0) {
                if (filterKey === 'sector') {
                    filteredData = filteredData.filter((item) =>
                        selectedOptions.includes(item.sector)
                    );
                } else {
                    filteredData = filteredData.filter((item) =>
                        item.values.some(
                            (value) =>
                                value.filter === filterKey.toLowerCase() &&
                                selectedOptions.includes(value.strVal ?? "")
                        )
                    );
                }
            }
        });

        // Sort data
        if (sortColumn) {
            filteredData = filteredData.sort((a, b) => {
                let aValue: any = a[sortColumn as keyof Fund];
                let bValue: any = b[sortColumn as keyof Fund];

                if (typeof aValue === "object" && typeof bValue === "object") {
                    aValue = a.values.find((item) => item.filter === sortColumn)?.doubleVal;
                    bValue = b.values.find((item) => item.filter === sortColumn)?.doubleVal;
                }

                if (typeof aValue === "string" && typeof bValue === "string") {
                    return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                } else if (typeof aValue === "number" && typeof bValue === "number") {
                    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
                }
                return 0;
            });
        }

        setVisibleData(filteredData.slice(0, itemsPerPage));
        setFilteredData(filteredData);
    };


    return (
        <div className="bg-white">
            <>
                <Transition show={mobileFiltersOpen}>
                    <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <TransitionChild
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </TransitionChild>

                        <div className="fixed inset-0 z-40 flex">
                            <TransitionChild
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </DisclosureButton>
                                                        </h3>
                                                        <DisclosurePanel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={false}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </DisclosurePanel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>

                <main className="mx-auto max-w-10xl sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
                        <div>
                            <p className="text-gray-600">
                                Showing {visibleData.length} of {filteredData.length} Funds
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

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <form className="p-8 hidden lg:block">

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <DisclosurePanel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    checked={selectedFilters[section.id].includes(option.value)}
                                                                    onChange={() => handleFilterChange(section.id, option.value)}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </DisclosurePanel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">

                                <section className="section pt-0">
                                    <div className="container">
                                        <>
                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                                                <table className="w-full text-sm text-left  text-gray-500 ">
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
                                                        {visibleData.map((fund) => (
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
                            </div>
                        </div>
                    </section>
                </main>
            </>
        </div>
    );

};

export default ScreenerTable;
