"use client";
import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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

interface Root {
    upcomingData: UpcomingDaum[];
    smeData: SmeDaum[];
    gmpData: GmpDaum[];
    buyBackData: BuyBackDaum[];
}

interface UpcomingDaum {
    Company: string;
    slug: string;
    Open: string;
    Close: string;
}

interface SmeDaum {
    Company: string;
    slug: string;
    Open: string;
    Close: string;
}

export interface GmpDaum {
    ipo_name: string;
    date: string;
    slug: string;
}

export interface BuyBackDaum {
    company_name: string;
    open: string;
    close: string;
    slug: string;
}

const IpoDetails: React.FC = () => {
    const [ipoDetails, setIpoDetails] = useState<IPOData | null>(null);
    const [additionalData, setAdditionalData] = useState<Root | null>(null);
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

                if (response.message === "failed") {
                    setError(response.message);
                    setIpoDetails(null);
                } else {
                    const parsedTables = JSON.parse(response.result.tables);
                    const parsedLists = JSON.parse(response.result.lists);
                    const updatedResponse = {
                        ...response.result,
                        tables: parsedTables,
                        lists: parsedLists,
                    };
                    setIpoDetails(updatedResponse);
                    console.log(updatedResponse);
                }
            } catch (error) {
                console.error("Error fetching IPO details:", error);
            }
        };
        const fetchAdditionalIpo = async () => {
            try {
                const response1 = await get(endpoints.additionalIpo);

                setAdditionalData(response1);
                console.log(additionalData);
            } catch (error) {
                console.error("Error fetching IPO details:", error);
            }
        };

        fetchIpoDetails();
        fetchAdditionalIpo();
    }, [pathname]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!ipoDetails) {
        return <div>Loading...</div>;
    }

    return (
        <section className="lg:pt-20">
            <div className="container">
                <div className="flex justify-between border-b border-gray-200 items-center max-sm:items-start">
                    <div className="text-[48px] lg:pl-6 font-clashSemibold text-[#0A0F1E] max-md:text-2xl">
                        {ipoDetails.name}
                    </div>

                    <button
                        type="button"
                        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                    >
                        <svg
                            className="w-6 h-5 me-2 -ms-1 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                        <p>
                            {ipoDetails.date.trim() === "TBA"
                                ? "Coming Soon"
                                : ipoDetails.date}
                        </p>
                    </button>
                </div>

                <main className="mx-auto max-w-8xl sm:px-6 lg:px-8 ">
                    <section aria-labelledby="products-heading " className="mt-[4rem]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <div className="lg:col-span-3">
                                {ipoDetails.lists.map((section: any, index: any) => (
                                    <div key={index} className="mb-[4rem]">
                                        <h3 className="mb-5">{section.heading}</h3>
                                        <ul className="space-y-1 text-gray-500 list-inside">
                                            {section.items.map((item: any, i: any) => (
                                                <li key={i} className="flex">
                                                    <svg
                                                        className="w-3.5 h-3.5 me-2 mt-[6px] text-green-500"
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
                                <div className="row">
                                    {[...ipoDetails.tables.slice(1), ipoDetails.tables[0]].map(
                                        (table, index) => (
                                            <div
                                                key={index}
                                                className={`${index === ipoDetails.tables.length - 1 ? "" : "lg:col-6"
                                                    } `}
                                            >
                                                <div className="container text-center">
                                                    <>
                                                        <h3 className="mb-4">{table.name}</h3>
                                                        <div className="rounded bg-body py-6 px-6 shadow">
                                                            <div className="flex flex-col">
                                                                <div className="-m-1.5 overflow-x-auto">
                                                                    <div className="p-1.5 align-middle">
                                                                        <table
                                                                            className="w-full text-sm text-left rtl:text-right text-gray-500 table"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: table.data,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <form className="hidden lg:block">
                                {additionalData &&
                                    additionalData.upcomingData &&
                                    additionalData.upcomingData.length > 0 && (
                                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                            <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                                Latest IPOs
                                            </h5>
                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {additionalData.upcomingData.map(
                                                        (item: UpcomingDaum) => (
                                                            <li className="py-3 sm:py-4" key={item.slug}>
                                                                <>
                                                                    <Link
                                                                        className="text-sm font-medium text-gray-900 truncate"
                                                                        href={`/ipo/details/${item.slug}`}
                                                                        target={"_blank"}
                                                                        rel="noopener noreferrer"
                                                                        prefetch={false}
                                                                    >
                                                                        {item.Company}
                                                                    </Link>
                                                                    <p className="text-sm text-gray-500 truncate">
                                                                        {`${item.Open === "TBA"
                                                                                ? "Coming Soon"
                                                                                : `${item.Open} - ${item.Close}`
                                                                            }`}
                                                                    </p>
                                                                </>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                {additionalData &&
                                    additionalData.smeData &&
                                    additionalData.smeData.length > 0 && (
                                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                            <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                                SME IPOs
                                            </h5>
                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {additionalData.smeData.map((item: SmeDaum) => (
                                                        <li className="py-3 sm:py-4" key={item.slug}>
                                                            <>
                                                                <Link
                                                                    className="text-sm font-medium text-gray-900 truncate"
                                                                    href={`/ipo/details/${item.slug}`}
                                                                    target={"_blank"}
                                                                    rel="noopener noreferrer"
                                                                    prefetch={false}
                                                                >
                                                                    {item.Company}
                                                                </Link>
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    {`${item.Open === "TBA"
                                                                            ? "Coming Soon"
                                                                            : `${item.Open} - ${item.Close}`
                                                                        }`}
                                                                </p>
                                                            </>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                {additionalData &&
                                    additionalData.gmpData &&
                                    additionalData.gmpData.length > 0 && (
                                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                            <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                                GMP IPOs
                                            </h5>
                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {additionalData.gmpData.map((item: GmpDaum) => (
                                                        <li className="py-3 sm:py-4" key={item.slug}>
                                                            <>
                                                                <Link
                                                                    className="text-sm font-medium text-gray-900 truncate"
                                                                    href={`/ipo/details/${item.slug}`}
                                                                    target={"_blank"}
                                                                    rel="noopener noreferrer"
                                                                    prefetch={false}
                                                                >
                                                                    {item.ipo_name}
                                                                </Link>
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    {`${item.date === "TBA"
                                                                            ? "Coming Soon"
                                                                            : `${item.date}`
                                                                        }`}
                                                                </p>
                                                            </>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                {additionalData &&
                                    additionalData.buyBackData &&
                                    additionalData.buyBackData.length > 0 && (
                                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                            <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                                BuyBack IPOs
                                            </h5>
                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {additionalData.buyBackData.map(
                                                        (item: BuyBackDaum) => (
                                                            <li className="py-3 sm:py-4" key={item.slug}>
                                                                <>
                                                                    <Link
                                                                        className="text-sm font-medium text-gray-900 truncate"
                                                                        href={`/ipo/details/${item.slug}`}
                                                                        target={"_blank"}
                                                                        rel="noopener noreferrer"
                                                                        prefetch={false}
                                                                    >
                                                                        {item.company_name}
                                                                    </Link>
                                                                    <p className="text-sm text-gray-500 truncate">
                                                                        {`${item.open === "TBA"
                                                                                ? "Coming Soon"
                                                                                : `${item.open} - ${item.close}`
                                                                            }`}
                                                                    </p>
                                                                </>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                            </form>
                        </div>
                    </section>
                </main>
            </div>
        </section>
    );
};
export default IpoDetails;
