"use client";
import React, { useState, useEffect } from "react";
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
import ScreenerTable from "./screener-table";



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


const ScreenerMfHomePage: React.FC<Screener> = ({ data }) => {
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

                    <main className="mx-auto max-w-10xl">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4 mx-[2rem] px-[6rem]">
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
                                    <section >
                                        <div className="container">
                                            <>
                                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                                    <ScreenerTable visibleData={visibleData} />
                                                </div>
                                                {visibleData.length > 0 && visibleData.length < filteredData.length && (
                                                    <div className="flex justify-center mt-4">
                                                        <button
                                                            className="px-4 py-2 bg-hover-blue text-white rounded-md"
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
                </div>
            </div>
        </section>
    );

};

export default ScreenerMfHomePage;





// "use client"

// import React from "react";

// const sectionsData = [
//   {
//     title: "Mutual Funds - Maximize Your Returns",
//     imageSrc: "/mf.png",
//     items: [
//       "Get up to 12% Higher Returns with Direct Plans",
//       "No Hidden Charges or Investment Fees",
//       "Switch from Regular to Direct Mutual Funds",
//     ],
//     buttonText: "Start Investing Now",
//     buttonUrl: "/mutual-funds",
//   },
//   {
//     title: "IPO - Initial Public Offering Insights",
//     imageSrc: "/ipo.png",
//     items: [
//       "Comprehensive IPO Information",
//       "Subscribe to Upcoming IPOs",
//       "Track and Analyze IPO Performance",
//       "Stay Updated on Latest IPO News",
//     ],
//     buttonText: "Check Latest IPO",
//     buttonUrl: "/ipo",
//   },
//   {
//     title: "Investment Calculators - Plan Your Finances",
//     imageSrc: "/calculator.png",
//     items: [
//       "SIP Calculator: Plan Your Systematic Investments",
//       "Lumpsum Calculator: Estimate Your One-Time Investment Returns",
//       "Retirement Calculator: Secure Your Future",
//     ],
//     buttonText: "Calculate Now",
//     buttonUrl: "/calculators",
//   },
// ];

// export default function Invest() {
//   return (
//     <>
//   {sectionsData.map((section, index) => (
//     <section
//       key={index}
//       className={`py-14 ${index % 2 === 1 ? "" : "bg-theme-light"}`}
//     >
//       <div className="container">
//         <div
//           className={`row gy-5 lg:gy-0 items-center ${index % 2 === 0
//             ? "flex-col-reverse lg:flex-row"
//             : "lg:flex-row-reverse"
//             }`}
//         >
//           <div
//             className={`lg:col-6 ${index % 2 === 0 ? "" : "lg:order-1 order-2"
//               }`}
//           >
//             <h2 className="mb-5">{section.title}</h2>

//             <ul className="max-w-md space-y-1 text-gray-500 list-inside ">
//               {section.items.map((item, i) => (
//                 <li key={i} className="flex items-center">
//                   <svg
//                     className="w-3.5 h-3.5 me-2 text-green-500"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
//                   </svg>
//                   <span style={{ color: "#343434" }}>{item}</span>
//                 </li>
//               ))}
//             </ul>
//             <a
//               className="btn btn-outline-primary mt-4"
//               href={section.buttonUrl}
//               aria-label={section.buttonText}
//             >
//               {section.buttonText}
//             </a>
//           </div>
//           <div
//             className={`lg:col-6 ${index % 2 === 0 ? "" : "lg:order-2 order-1"
//               }`}
//           >
//             <img
//               alt="services-image"
//               loading="lazy"
//               width="450"
//               height="450"
//               style={{ mixBlendMode: "multiply" }}
//               decoding="async"
//               data-nimg="1"
//               src={section.imageSrc}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   ))}
//     </>
//   );
// }
