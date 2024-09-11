import Image from "next/image";
import Link from "next/link";
import React from "react";


export interface Root {
    closed: Closed[]
    live: Live[]
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

const NFOTable = ({ live, closed }: { live: Live[], closed: Closed[] }) => {
    return (
       <>
       <h2>Open ({live.length})</h2>
       <div className="relative overflow-x-auto sm:rounded border">
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
                                    href={`details/${fund.search_id}`}
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
                                <div className="text-sm text-gray-900">{fund.open_date ? fund.open_date : "NA"}</div>
                                <div className="text-xs text-gray-500">Open Date </div>
                            </td>
                            <td>
                                <div className="text-sm text-gray-900">{fund.close_date ? fund.close_date : "NA"}</div>
                                <div className="text-xs text-gray-500">Closed Date </div>
                            </td>
                            <td>
                                <div className="text-sm text-gray-900">{fund.allotment_date ? fund.allotment_date : "NA"}</div>
                                <div className="text-xs text-gray-500">Allotment Date </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

       </>
    );
};
export default NFOTable;