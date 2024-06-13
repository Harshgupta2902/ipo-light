"use client";
import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { markdownify } from "@/components/common/textConverter";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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
                <h1>{ipoDetails.name}</h1>

                <div className="row pt-24">
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
                <div className="pt-24">
                    {ipoDetails.lists.map((section, index) => (
                        <div key={index} className=" mt-[4rem]">
                            <h3 className="mb-5">{section.heading}</h3>
                            <ul className="max-w-md space-y-1 text-gray-500 list-inside">
                                {section.items.map((item, i) => (
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
            </div>
        </section>
    );
};
export default IpoDetails;
