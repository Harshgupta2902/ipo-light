"use client";
import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { markdownify } from "@/components/common/textConverter";
import { usePathname } from "next/navigation";

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
import { useEffect, useState } from "react";

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


interface IPOData {
    id: string;
    slug: string;
    tables: {
        name: string;
        data: string;
    }[];
    lists: {
        heading: string;
        items: string[];
    }[];
    link: string;
    created_at: string;
    updated_at: string;
    name: string;
    date: string;
    bse: string;
    bse_link: string;
    nse: string;
    nse_link: string;
}

const IpoDetails: React.FC = () => {
    const [ipoDetails, setIpoDetails] = useState<IPOData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const pathname = usePathname();

    useEffect(() => {
        const fetchIpoDetails = async () => {
            try {
                const response = await get(
                    endpoints.ipoDetails +
                    "?slug=" +
                    pathname.replace("/ipo/details/", "")
                );

                if (response.error) {
                    setError(response.error);
                    setIpoDetails(null);
                } else {
                    const parsedTables = JSON.parse(response.response.tables);
                    const parsedLists = JSON.parse(response.response.lists);
                    const updatedResponse = { ...response.response, tables: parsedTables, lists: parsedLists };
                    setIpoDetails(updatedResponse);
                    console.log(updatedResponse);
                }

            } catch (error) {
                console.error("Error fetching IPO details:", error);
            }
        };

        fetchIpoDetails();
    }, [pathname]);


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!ipoDetails) {
        return <div>Loading...</div>;
    }

    return (
        <section className="pt-20">
            <div className="container">
                <div className="flex justify-between border-b border-gray-200 items-center max-sm:items-start">
                    <div className="text-[48px] pl-6 font-clashSemibold text-[#0A0F1E] max-md:text-2xl">
                        {ipoDetails.name}
                    </div>

                    <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                        <svg className="w-6 h-5 me-2 -ms-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                        <p>{ipoDetails.date.trim() === "TBA" ? "Coming Soon" : ipoDetails.date}</p>

                    </button>
                </div>

                <main className="mx-auto max-w-8xl sm:px-6 lg:px-8 ">
                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <div className="lg:col-span-3">
                                {ipoDetails.lists.map((section: any, index: any) => (
                                    <div key={index} className=" mt-[4rem]">
                                        <h3 className="mb-5">{section.heading}</h3>
                                        <ul className="space-y-1 text-gray-500 list-inside">
                                            {section.items.map((item: any, i: any) => (
                                                <li key={i} className="flex items-center">
                                                    <svg
                                                        className="w-3.5 h-3.5 me-2 text-green-500 flex-shrink-0"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <form className="hidden lg:block">
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
                                                                    // checked={selectedFilters[section.id].includes(option.value)}
                                                                    // onChange={() => handleFilterChange(section.id, option.value)}
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
                        </div>
                    </section>
                </main>
                <div className="row">
                    {[...ipoDetails.tables.slice(1), ipoDetails.tables[0]].map((table, index) => (
                        <div key={index} className={`${index === ipoDetails.tables.length - 1 ? "" : "col-6"}`}>
                            <div className="container text-center">
                                <>
                                    <h3 className="mb-4">{table.name}</h3>
                                    <div className="rounded bg-body py-6 px-6 shadow">
                                        <div className="flex flex-col">
                                            <div className="-m-1.5 overflow-x-auto">
                                                <div className="p-1.5 align-middle">
                                                    <table
                                                        className="w-full text-sm text-left rtl:text-right text-gray-500 table"
                                                        dangerouslySetInnerHTML={{ __html: table.data }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};
export default IpoDetails;
