
import { endpoints } from "@/api/endpoints";
import NotFound from "@/app/not-found";
import { headers } from "next/headers";
import AMCFilter from "./amc_filter";
import Image from "next/image";
import { markdownify } from "@/components/common/textConverter";

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


const AMCDetailPage = async () => {
    const headersList = headers();
    const pathname = headersList.get("x-url")?.replace("/mutualfunds/amc/", "");
    const amcLowercase = amc.map(name => name.link.toLowerCase());
    console.log("pathname:::::::::::::", pathname);
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
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Mutual Fund Name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{amcData.key_information.fund_house}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">AMC Setup Date</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">AMC</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">AMC Incorporatin Date</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Sponsor Name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Trustee Organization</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Name of Trustees</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Chairman</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">CIO</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">MD and CEO</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>

                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Complaince Officer</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Investor Service Officer</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Total AUM (as of end of last quarter)</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>

                                </dl>
                            </div>
                            <br />
                            <br />
                        </div>
                    )}


                    {amcData.content_list && amcData.content_list.slice(1).map((item: any, index: number) => (
                        !item.title.toLowerCase().includes("invest in") && (
                            <div key={index} className="content-item">
                                <h2 className="text-[22px]">{item.title}</h2>
                                <div className="font-thin mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: `${item.content}` }} />
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
