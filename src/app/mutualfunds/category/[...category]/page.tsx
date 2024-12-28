
import { endpoints } from "@/api/endpoints";
import NotFound from "@/app/not-found";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import CategoryFilter from "./category_filter";

const fetchAmcData = async (amc: string) => {
    try {
        const response = await fetch(`${endpoints.amc}/${amc.replaceAll('fund', "fund")}`);
        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching GmpIpo", error);
        throw error;
    }
};



const getSubcategoryUrls = () => {
    return categories.reduce((acc, category) => {
        category.subcategories.forEach(sub => {
            acc.push(sub.url);
        });
        return acc;
    }, [] as string[]);
};



export async function generateMetadata() {
    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace("/mutualfunds/category/", "");

    let amcData = null;
    try {
        amcData = await fetchAmcData(`${pathname}`);
    } catch (err) {
        console.error(`error ${err}`);
    }


    const metaTitle = amcData.content_list[0].title;
    const metaDescription = `Explore the details of the ${amcData.content_list[0].title && amcData.content_list[0].title} with IpoTec. Get Latest details of AMC and their fund-managers on IpoTec.`;
    return {
        title: metaTitle,
        description: metaDescription,
        robots: "index, follow",
        author: "IpoTec",
        copyright: "Copyright 2024 @ IpoTec",
        url: "https://www.ipotec.in/",
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            site: "https://www.ipotec.in/",
            images: "https://www.ipotec.in/og_image.png",
            type: "website",
            url: `https://www.ipotec.in${completepathname}`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: "https://www.ipotec.in/og_image.png"
        },
        alternates: {
            canonical: `https://www.ipotec.in${completepathname}`,
        },
    };
}



const AMCDetailPage = async () => {
    const headersList = headers();
    const pathname = headersList.get("x-url")?.replace("/mutualfunds/category/", "");

    const subcategoryUrls = getSubcategoryUrls();
    if (!pathname || !subcategoryUrls.includes(pathname)) {
        return <NotFound />;
    }

    let amcData = null;
    try {
        amcData = await fetchAmcData(`${pathname}`);
    } catch (err) {
        console.error(`error ${err}`);
    }


    return (
        <div className="container">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 font-normal">
                <form className="hidden lg:block">
                    <CategoryFilter categories={categories} activeTitle={pathname} />
                </form>
                <div className="lg:col-span-3">
                    <br />
                    {amcData.content_list[0].title && <h1 className="text-[32px]">{amcData.content_list[0].title}</h1>}
                    {amcData.content_list && !amcData.content_list[0].title.toLowerCase().includes("invest in") && (
                        <div className="content-item">
                            <div className="font-thin mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: `${amcData.content_list[0].content}` }} />
                            <br />
                            <br />
                        </div>
                    )}

                    {amcData.key_information && (
                        <div>
                            <h2 className="text-[22px]">Key Information</h2>
                            <div className="mt-6 border border">
                                <dl className="divide-y divide">
                                    {amcData.key_information.fund_house && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Mutual Fund Name</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.fund_house}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.amc_setup_date && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">AMC Setup Date</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.amc_setup_date}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.asset_management_company && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">AMC</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.asset_management_company}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.amc_incorporation_date && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">AMC Incorporatin Date</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.amc_incorporation_date}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.sponsor_name && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Sponsor Name</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <ul role="list" className="">
                                                    {amcData.key_information.sponsor_name.map((item: any, index: number) => (
                                                        <li className="flex items-center justify-between py-1 text-sm leading-6">
                                                            <span className="truncate font-medium">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </dd>
                                        </div>
                                    )}

                                    {amcData.key_information.trustee_organisation && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Trustee Organization</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.trustee_organisation}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.name_of_trustee && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Name of Trustees</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <ul role="list" className="">
                                                    {amcData.key_information.name_of_trustee.map((item: any, index: number) => (
                                                        <li className="flex items-center justify-between py-1 text-sm leading-6">
                                                            <span className="truncate font-medium">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </dd>
                                        </div>
                                    )}

                                    {amcData.key_information.chairman && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Chairman</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.chairman}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.cio && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">CIO</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.cio}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.md && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">MD and CEO</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.md}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.compliance_officer && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Compliance Officer</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.compliance_officer}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.investor_service_officer && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Investor Service Officer</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.investor_service_officer}</dd>
                                        </div>
                                    )}

                                    {amcData.key_information.total_aum && (
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Total AUM (as of end of last quarter)</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.total_aum}</dd>
                                        </div>
                                    )}

                                </dl>
                            </div>
                            <br />
                            <br />
                        </div>
                    )}

                    {amcData.fund_rows && amcData.fund_rows.content && (
                        <div className="flex flex-col">
                            {amcData.content_list[0].title && <h2 className="text-[22px]">List of {amcData.content_list[0].title} in India</h2>}
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="align-middle content ">
                                    <table className="w-full text-sm rounded-sm text-left">
                                        <tbody>
                                            {amcData.fund_rows.content.map((item: any, index: number) => (
                                                <tr key={index} className="bg-white border-b hover:bg-gray-50  ">
                                                    <td scope="row" className="flex items-center font-medium text-gray-900 whitespace-nowrap">
                                                        <Link href={`/mutualfunds/details/${item.search_id}`} style={{ textDecoration: "none" }} target="_blank">
                                                            <div className="text-gray-900 hover:scale-105 hover:text-[#0045DA]">{item.direct_scheme_name}</div>
                                                        </Link>
                                                    </td>
                                                    <td className="">
                                                        {item.category}
                                                    </td>
                                                    <td className="">
                                                        {item.risk}
                                                    </td>
                                                    <td className="">
                                                        {item.return1y === 0 ? "NA" : `${item.return1y}%`}
                                                    </td>
                                                    <td className="">
                                                        {item.aum}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="bg-white border-b hover:bg-gray-50  ">
                                                <td scope="row" className="flex items-center font-medium">
                                                    <Link href={`/mutualfunds/screener`} target="_blank">
                                                        <div className="hover:scale-105 text-[#0045DA]">{"See All"}</div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br /><br />

                        </div>
                    )}
                    {
                        amcData.content_list && amcData.content_list.slice(1).map((item: any, index: number) => {
                            let content = item.content;

                            // Check if "FAQ" or similar is present in the content
                            const faqIndex = content.toLowerCase().indexOf("faq");
                            let faqContent = "";

                            if (faqIndex !== -1) {
                                faqContent = content.substring(faqIndex);
                                content = content.substring(0, faqIndex);
                            }

                            return (
                                <div key={index} className="content-item">
                                    <h2 className="text-[22px]">{item.title}</h2>
                                    <div className="font-thin mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: `${content.replaceAll("https://groww.in/mutual-funds/", "/mutualfunds/details/")}` }} />
                                    <br />
                                    <br />
                                </div>
                            );
                        })}

                </div>
            </div>
        </div>
    );
};

export default AMCDetailPage;

const categories = [
    {
        name: "Debt",
        subcategories: [
            {
                name: "Low Duration",
                url: "best-low-duration-mutual-funds"
            },
            {
                name: "Medium Duration",
                url: "best-medium-duration-mutual-funds"
            },
            {
                name: "Dynamic Bond",
                url: "best-dynamic-mutual-funds"
            },
            {
                name: "Gilt",
                url: "best-gilt-mutual-funds"
            },
            {
                name: "Credit Risk",
                url: "best-credit-risk-mutual-funds"
            },
            {
                name: "Liquid",
                url: "best-liquid-mutual-funds"
            },
            {
                name: "Ultra Shorts",
                url: "best-ultra-short-mutual-funds"
            }
        ]
    },
    {
        name: "Hybrid",
        subcategories: [
            {
                name: "Aggressive",
                url: "best-aggressive-mutual-funds"
            },
            {
                name: "Conservative",
                url: "best-conservative-mutual-funds"
            },
            {
                name: "Arbitrage",
                url: "best-arbitrage-mutual-funds"
            }
        ]
    },
    {
        name: "Equity",
        subcategories: [
            {
                name: "Multi Cap",
                url: "best-multi-cap-mutual-funds"
            },
            {
                name: "Large Cap",
                url: "best-large-cap-mutual-funds"
            },
            {
                name: "Mid Cap",
                url: "best-mid-cap-mutual-funds"
            },
            {
                name: "Small Cap",
                url: "best-small-cap-mutual-funds"
            },
            {
                name: "ELSS",
                url: "best-elss-mutual-funds"
            },
            {
                name: "Dividend Yield",
                url: "best-dividend-yield-mutual-funds"
            },
            {
                name: "Sector",
                url: "best-sector-mutual-funds"
            },
            {
                name: "Contra",
                url: "best-contra-mutual-funds"
            },
            {
                name: "Value",
                url: "best-value-mutual-funds"
            }
        ]
    }
];