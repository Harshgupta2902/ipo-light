import Image from "next/image";
import Link from "next/link";
import React from "react";


export interface Root {
    closed: Closed[]
    live: Live[]
    upcoming: Upcoming[]
}

export interface Closed {
    active: boolean
    category: string
    risk: string
    isin: string
    groww_scheme_code: string
    scheme_code: string
    scheme_name: string
    amc: string
    video_url: any
    open_date: string
    close_date: string
    resale_date: any
    allotment_date: string
    investment_objective: string
    brochure_link: any
    sid_url: any
    exit_load: any
    plan_id: string
    image_url: any
    search_id: string
    logo_url: string
    fund_house: string
    sub_category: string
    fund_name: string
}

export interface Live {
    active: boolean
    category: string
    risk: string
    isin: string
    groww_scheme_code: string
    scheme_code: string
    scheme_name: string
    amc: string
    video_url: any
    open_date: string
    close_date: string
    resale_date: any
    allotment_date: string
    investment_objective: string
    brochure_link: any
    sid_url: any
    exit_load: any
    plan_id: string
    image_url: any
    search_id: string
    logo_url: string
    fund_house: string
    sub_category: string
    fund_name: string
}

export interface Upcoming {
    CO_CODE: number
    SchemeCode: number
    Name: string
    FundType: string
    MinInvtAmt: number
    RIIDiscount: string
    RiskCategory: string
    OpenDate: string
    CloseDate: string
    ProspectusUrl: any
    classname: string
    PlanType: string
    grpCode: string
    schemeType: string
    grpName: string
}

const NFOTable = ({ live, closed, upcoming }: { live: Live[], closed: Closed[], upcoming: Upcoming[] }) => {
    return (
        <>
            {upcoming && <>
                <h2 className="pb-4 text-xl text-gray-900 font-light">Upcoming ({upcoming.length})</h2>
                <div className="relative overflow-x-auto sm:rounded border mb-16">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <tbody>
                            {upcoming.map((fund) => (
                                <tr key={fund.Name} className="bg-white border-b hover:bg-gray-50  ">
                                    <th scope="row" className="m-4 flex items-center font-medium text-gray-900 whitespace-nowrap">
                                        <div className="ps-3">
                                            <div className="text-sm">{fund.Name}</div>
                                            <div className="text-xs text-gray-500">{fund.RiskCategory} Risk
                                                <span className="ml-4">{fund.classname}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="text-sm text-gray-900">{fund.MinInvtAmt ? fund.MinInvtAmt : "NA"}</div>
                                        <div className="text-xs text-gray-500">Inv. Amount </div>
                                    </td>
                                    <td>
                                        <div className="text-sm text-gray-900">{formatDate(fund.OpenDate)}</div>
                                        <div className="text-xs text-gray-500">Open Date </div>
                                    </td>
                                    <td>
                                        <div className="text-sm text-gray-900">{formatDate(fund.CloseDate)}</div>
                                        <div className="text-xs text-gray-500">Closed Date </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>}


            {live && <>
                <h2 className="pb-4 text-xl text-gray-900 font-light">Open ({live.length})</h2>
                <div className="relative overflow-x-auto sm:rounded border mb-16">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <tbody>
                            {live.map((fund) => (
                                <tr key={fund.fund_name} className="bg-white border-b hover:bg-gray-50  ">
                                    <th scope="row" className="m-4 flex items-center font-medium text-gray-900 whitespace-nowrap">
                                        <Image
                                            alt={fund.fund_name}
                                            width="30"
                                            height="30"
                                            decoding="async"
                                            className="w-10 h-10 object-contain border rounded p-1"
                                            src={fund.logo_url}
                                        />
                                        <Link
                                            href={`nfo/details/${fund.search_id}`}
                                            target={"_blank"}
                                            prefetch={false}

                                        >
                                            <div className="ps-3">
                                                <div className="text-sm">{fund.fund_name}</div>
                                                <div className="text-xs text-gray-500">{fund.risk} Risk
                                                    <span className="ml-4">{fund.category}</span>
                                                </div>
                                            </div>

                                        </Link>
                                    </th>
                                    <td>
                                        <div className="text-sm text-gray-900">{formatDate(fund.open_date)}</div>
                                        <div className="text-xs text-gray-500">Open Date </div>
                                    </td>
                                    <td>
                                        <div className="text-sm text-gray-900">{formatDate(fund.close_date)}</div>
                                        <div className="text-xs text-gray-500">Closed Date </div>
                                    </td>
                                    <td>
                                        <div className="text-sm text-gray-900">{formatDate(fund.allotment_date)}</div>
                                        <div className="text-xs text-gray-500">Allotment Date </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </>}


            {closed && <>
                <h2 className="pb-4 text-xl text-gray-900 font-light">Closed ({closed.length})</h2>
                <div className="relative overflow-x-auto sm:rounded border mb-16">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <tbody>
                            {closed.map((fund) => (
                                <tr key={fund.fund_name} className="bg-white border-b hover:bg-gray-50  ">
                                    <th scope="row" className="m-4 flex items-center font-medium text-gray-900 whitespace-nowrap">
                                        <Image
                                            alt={fund.fund_name}
                                            width="30"
                                            height="30"
                                            decoding="async"
                                            className="w-10 h-10 object-contain border rounded p-1"
                                            src={fund.logo_url}
                                        />
                                        <Link
                                            href={`nfo/details/${fund.search_id}`}
                                            target={"_blank"}
                                            prefetch={false}

                                        >
                                            <div className="ps-3">
                                                <div className="text-sm">{fund.fund_name}</div>
                                                <div className="text-xs text-gray-500">{fund.risk} Risk
                                                    <span className="ml-4">{fund.category}</span>
                                                </div>
                                            </div>

                                        </Link>
                                    </th>
                                    <td>
                                        <div className="text-sm text-gray-900">{formatDate(fund.open_date)}</div>
                                        <div className="text-xs text-gray-500">Open Date </div>
                                    </td>
                                    <td>
                                        <div className="text-sm text-gray-900">{formatDate(fund.close_date)}</div>
                                        <div className="text-xs text-gray-500">Closed Date </div>
                                    </td>
                                    <td>
                                        <div className="text-sm text-gray-900">{formatDate(fund.allotment_date)}</div>
                                        <div className="text-xs text-gray-500">Allotment Date </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>}




        </>
    );
};
export default NFOTable;


const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) {
        return "NA";
    }

    const date = new Date(dateStr);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return "NA";
    }

    const day = date.getDate().toString().padStart(2, '0'); // Day with leading zero
    const month = date.toLocaleString('en-US', { month: 'short' }); // Abbreviated month name
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year

    return `${day} ${month} '${year}`;
};
