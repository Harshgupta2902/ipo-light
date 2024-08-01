"use client";
import React, { useState, useEffect } from "react";
import ScreenerTable from "./screener-table";
import { endpoints } from "@/api/endpoints";


export interface Screener {
    content: Funds[]
    total_results: number
}

export interface Funds {
    id: string
    fund_name: string
    search_id: string
    category: string
    sub_category: string
    sub_sub_category?: string[]
    aum: number
    available_for_investment: number
    min_sip_investment: number
    sip_allowed: boolean
    lumpsum_allowed: boolean
    return3y?: number
    return1y?: number
    return5y?: number
    nav: any
    return1d: number
    min_investment_amount: number
    groww_rating?: number
    risk_rating: number
    scheme_name: string
    scheme_type: string
    fund_manager?: string
    fund_house: string
    scheme_code: string
    launch_date: string
    risk: string
    doc_type: string
    registrar_agent: any
    doc_required: boolean
    plan_type: string
    page_view: number
    direct_fund: string
    amc: string
    enable: any
    direct_search_id: string
    direct_scheme_name: string
    term_page_view: number
    logo_url: string
}

const sectionsData = [
    {
        title: "Mutual Funds - Screener",
        imageSrc: "/screener.png",
        items: [
            "Filter by Fund Type (Equity, Debt, Hybrid, etc.)",
            "Sort by Performance, Ratings, and Returns",
            "Compare Multiple Funds Side by Side",
        ],
    }
];


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


const ScreenerMfHomePage: React.FC<Screener> = ({ content, total_results }) => {

    let itemsPerPage = 15

    const [visibleData, setVisibleData] = useState<Funds[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);

    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMfScreener(currentPage);
                console.log(response);
                setVisibleData(response.content);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage]);

    const fetchMfScreener = async (page: number) => {
        try {
            const response = await fetch(`${endpoints.getMfScreener}?page=${page}`, {
                cache: "no-store",
            });
            if (!response.ok) {
                throw new Error("Data not found");
            }
            console.log(response);

            return await response.json();
        } catch (error) {
            console.error("Error fetching data", error);
            throw error;
        }
    };

    return (
        <section>
            {sectionsData.map((section, index) => (
                <section>
                    <div className="container">
                        <div className={`row gy-5 lg:gy-0`}>
                            <div className={`lg:col-8`}>
                                <h1 className="my-4 pt-6 text-5xl">{section.title}</h1>
                                <ul className="max-w-md space-y-1 text-gray-500 list-inside ">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <svg
                                                className="w-3.5 h-3.5 me-2 text-green-500"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            <h2 className="text-base font-medium" style={{ color: "#343434" }}>{item}</h2>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`lg:col-4`}>
                                <img
                                    alt="services-image"
                                    loading="lazy"
                                    width="450"
                                    height="450"
                                    style={{ mixBlendMode: "multiply" }}
                                    decoding="async"
                                    data-nimg="1"
                                    src={section.imageSrc}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            <div className="px-[6rem]">
                <div className="bg-white">
                    <main className="mx-auto max-w-10xl">
                        {/* <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4 mx-[2rem] px-[6rem]">
                            <p className="text-gray-600">
                                Showing {visibleData.length} of {filteredData.length} Funds
                            </p>
                            <input
                                type="text"
                                id="table-search"
                                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
                                placeholder="Search for Funds"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div> */}

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* <form className="p-8 hidden lg:block">
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
                                </form> */}

                                {/* Product grid */}
                                <div className="lg:col-span-3">
                                    <section >
                                        <div className="container">
                                            <div className="relative overflow-x-auto sm:rounded-lg">
                                                <ScreenerTable visibleData={visibleData} />
                                                <Pagination
                                                    currentPage={currentPage}
                                                    totalItems={total_results}
                                                    itemsPerPage={itemsPerPage}
                                                    onPageChange={handlePageChange}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </section>
    );

};

export default ScreenerMfHomePage;





interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-between items-center py-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};