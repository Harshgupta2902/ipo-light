
import { endpoints } from "@/api/endpoints";
import NotFound from "@/app/not-found";
import { headers } from "next/headers";
import AMCFilter from "./amc_filter";
import Image from "next/image";
import Link from "next/link";

const fetchAmcData = async (amc: string) => {
    try {
        const response = await fetch(`${endpoints.amc}/${amc.replaceAll('fund', "funds")}`);
        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching GmpIpo", error);
        throw error;
    }
};

export async function generateMetadata() {
    const headersList = headers();
    const pathname = headersList.get("x-url")?.replace("/mutualfunds/amc/", "");
    const amcLowercase = amc.map(name => name.link.toLowerCase());
    const amcName = pathname?.replaceAll("-", " ") ?? "";
    if (!amcLowercase.includes(amcName)) {
        return <NotFound />;
    }

    let amcData = null;
    try {
        amcData = await fetchAmcData(`${pathname}`);
    } catch (err) {
        console.error(`error ${err}`);
    }


    const metaTitle = amcData.key_information.fund_house;
    const metaDescription = `Explore the details of the ${amcData.key_information && amcData.key_information.fund_house} with IpoTec. Get Latest details of AMC and their fund-managers on IpoTec.`;
    const keywords = [
        amcData.key_information.fund_house,
        amcData.key_information.asset_management_company,
        amcData.key_information.trustee_organisation,
        amcData.key_information.ceo,
        amcData.key_information.cio,
        amcData.key_information.investor_service_officer,
        amcData.key_information.compliance_officer,
    ].filter(Boolean);

    return {
        title: metaTitle,
        description: metaDescription,
        robots: "index, follow",
        author: "IpoTec",
        keywords: keywords,
        copyright: "Copyright 2024 @ IpoTec",
        url: "https://www.ipotec.in/",
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            site: "https://www.ipotec.in/",
            images: "https://www.ipotec.in/og_image.png",
            type: "website",
            url: `https://www.ipotec.in${pathname}`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: "https://www.ipotec.in/og_image.png"
        },
        alternates: {
            canonical: `https://www.ipotec.in${pathname}`,
        },
    };
}


const AMCDetailPage = async () => {
    const headersList = headers();
    const pathname = headersList.get("x-url")?.replace("/mutualfunds/amc/", "");
    const amcLowercase = amc.map(name => name.link.toLowerCase());
    const amcName = pathname?.replaceAll("-", " ") ?? "";
    if (!amcLowercase.includes(amcName)) {
        return <NotFound />;
    }

    let amcData = null;
    try {
        amcData = await fetchAmcData(`${pathname}`);
    } catch (err) {
        console.error(`error ${err}`);
    }

    const amcIndex = amcLowercase.indexOf(amcName);
    const amcImage = amc[amcIndex]?.image;
    const amcTitle = amc[amcIndex]?.link;

    return (
        <div className="container">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 font-normal">
                <form className="hidden lg:block">
                    <AMCFilter amc={amc} />
                </form>
                <div className="lg:col-span-3">
                    <br />
                    <div className="flex items-center">
                        <Image
                            src={amcImage}
                            className="w-15 h-15 object-contain border rounded-sm p-1"
                            width="60"
                            height="60"
                            alt={amcImage}
                            priority
                        />
                        <h1 className="pl-4 text-[32px]">{amcTitle}</h1>
                    </div>
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
                            <h2 className="text-[22px]">List of {amcTitle} in India</h2>
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="align-middle content ">
                                    <table className="w-full text-sm rounded-sm text-left">
                                        <tbody>
                                            {amcData.fund_rows.content.map((item: any, index: number) => (
                                                <tr key={index} className="bg-white border-b hover:bg-gray-50  ">
                                                    <td scope="row" className=" !py-1 flex items-center font-medium text-gray-900 whitespace-nowrap">
                                                        <Link href={``} style={{ textDecoration: "none" }}>
                                                            <div className="text-gray-900 hover:underline hover:text-[#0F5151]">{item.direct_scheme_name}</div>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br /><br />

                        </div>
                    )}

                    {amcData.content_list && amcData.content_list.slice(1).map((item: any, index: number) => (
                        !item.title.toLowerCase().includes("invest in") && (
                            <div key={index} className="content-item">
                                <h2 className="text-[22px]">{item.title}</h2>
                                <div className="font-thin mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: `${item.content.replaceAll("https://groww.in/mutual-funds/", "/mutualfunds/details/")}` }} />
                                <br />
                                <br />
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AMCDetailPage;

const amc = [
    {
        link: "Bajaj Finserv Mutual Fund",
        image: "/AMC/bajaj_groww.png",
    },
    {
        link: "Helios Mutual Fund",
        image: "/AMC/helios_groww.png",
    },
    {
        link: "WhiteOak Capital Mutual Fund",
        image: "/AMC/whiteoak_groww.png",
    },
    {
        link: "ITI Mutual Fund",
        image: "/AMC/iti_groww.png",
    },
    {
        link: "TRUST Mutual Fund",
        image: "/AMC/trust_groww.png",
    },
    {
        link: "NJ Mutual Fund",
        image: "/AMC/nj_groww.png",
    },
    {
        link: "Samco Mutual Fund",
        image: "/AMC/samco_groww.png",
    },
    {
        link: "Mahindra Manulife Mutual Fund",
        image: "/AMC/mahindra_groww.png",
    },
    {
        link: "Canara Robeco Mutual Fund",
        image: "/AMC/canara_groww.png",
    },
    {
        link: "Quant Mutual Fund",
        image: "/AMC/quant_groww.png",
    },
    {
        link: "ICICI Prudential Mutual Fund",
        image: "/AMC/icici_groww.png",
    },
    {
        link: "JM Financial Mutual Fund",
        image: "/AMC/jm_groww.png",
    },
    {
        link: "LIC Mutual Fund",
        image: "/AMC/lic_groww.png",
    },
    {
        link: "Franklin Templeton Mutual Fund",
        image: "/AMC/franklin_groww.png",
    },
    {
        link: "Aditya Birla Sun Life Mutual Fund",
        image: "/AMC/aditya_groww.png",
    },
    {
        link: "Mirae Asset Mutual Fund",
        image: "/AMC/mirae_groww.png",
    },
    {
        link: "Bank of India Mutual Fund",
        image: "/AMC/bank_groww.png",
    },
    {
        link: "Motilal Oswal Mutual Fund",
        image: "/AMC/motilal_groww.png",
    },
    {
        link: "PGIM India Mutual Fund",
        image: "/AMC/pgim_groww.png",
    },
    {
        link: "360 ONE Mutual Fund",
        image: "/AMC/360_groww.png",
    },
    {
        link: "Nippon India Mutual Fund",
        image: "/AMC/nippon_groww.png",
    },
    {
        link: "Union Mutual Fund",
        image: "/AMC/union_groww.png",
    },
    {
        link: "Bandhan Mutual Fund",
        image: "/AMC/bandhan_groww.png",
    },
    {
        link: "Navi Mutual Fund",
        image: "/AMC/navi_groww.png",
    },
    {
        link: "SBI Mutual Fund",
        image: "/AMC/sbi_groww.png",
    },
    {
        link: "DSP Mutual Fund",
        image: "/AMC/dsp_groww.png",
    },
    {
        link: "Tata Mutual Fund",
        image: "/AMC/tata_groww.png",
    },
    {
        link: "Edelweiss Mutual Fund",
        image: "/AMC/edelweiss_groww.png",
    },
    {
        link: "Invesco Mutual Fund",
        image: "/AMC/invesco_groww.png",
    },
    {
        link: "Sundaram Mutual Fund",
        image: "/AMC/sundaram_groww.png",
    },
    {
        link: "HDFC Mutual Fund",
        image: "/AMC/hdfc_groww.png",
    },
    {
        link: "HSBC Mutual Fund",
        image: "/AMC/hsbc_groww.png",
    },
    {
        link: "PPFAS Mutual Fund",
        image: "/AMC/ppfas_groww.png",
    },
    {
        link: "Baroda BNP Paribas Mutual Fund",
        image: "/AMC/barodabnpparibasmutualfund_groww.png",
    },
    {
        link: "Quantum Mutual Fund",
        image: "/AMC/quantum_groww.png",
    },
    {
        link: "Taurus Mutual Fund",
        image: "/AMC/taurus_groww.png",
    },
    {
        link: "Shriram Mutual Fund",
        image: "/AMC/shriram_groww.png",
    },
    {
        link: "Groww Mutual Fund",
        image: "/AMC/360_groww.png",
    },
    {
        link: "Kotak Mahindra Mutual Fund",
        image: "/AMC/kotak_groww.png",
    },
    {
        link: "Zerodha Mutual Fund",
        image: "/AMC/zerodha_groww.png",
    },
    {
        link: "Axis Mutual Fund",
        image: "/AMC/axis_groww.png",
    },
    {
        link: "UTI Mutual Fund",
        image: "/AMC/uti_groww.png",
    },
];
