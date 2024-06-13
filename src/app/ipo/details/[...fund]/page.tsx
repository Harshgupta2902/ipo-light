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
    const pathname = usePathname();

    useEffect(() => {
        const fetchIpoDetails = async () => {
            try {
                const response = await get(
                    endpoints.ipoDetails +
                    "?slug=" +
                    pathname.replace("/ipo/details/", "")
                );
                const parsedTables = JSON.parse(response.response.tables); // Parse the tables string
                const updatedResponse = { ...response.response, tables: parsedTables }; // Update response with parsed tables
                setIpoDetails(updatedResponse);
                console.log(updatedResponse); // Make sure data is fetched correctly
            } catch (error) {
                console.error("Error fetching IPO details:", error);
            }
        };

        fetchIpoDetails();
    }, [pathname]);

    if (!ipoDetails) {
        return <div>Loading...</div>;
    }

    return (
        <section className="pt-20">
            <div className="row">
                {ipoDetails.tables.map((table, index) => (
                    <div key={index} className="col-6">
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
        </section>
    );
};
export default IpoDetails;
