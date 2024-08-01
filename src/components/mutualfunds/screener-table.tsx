"use serve"

import Link from "next/link";
import React from "react";



export interface Screener {
    content: Funds[]
    total_results: number
}

export interface Funds {
    id: string
    fund_name: string
    search_id: string
    category: string
    sub_category: string
    sub_sub_category?: string[]
    aum: number
    available_for_investment: number
    min_sip_investment: number
    sip_allowed: boolean
    lumpsum_allowed: boolean
    return3y?: number
    return1y?: number
    return5y?: number
    nav: any
    return1d: number
    min_investment_amount: number
    groww_rating?: number
    risk_rating: number
    scheme_name: string
    scheme_type: string
    fund_manager?: string
    fund_house: string
    scheme_code: string
    launch_date: string
    risk: string
    doc_type: string
    registrar_agent: any
    doc_required: boolean
    plan_type: string
    page_view: number
    direct_fund: string
    amc: string
    enable: any
    direct_search_id: string
    direct_scheme_name: string
    term_page_view: number
    logo_url: string
}

const ScreenerTable = ({ visibleData }: { visibleData: Funds[] }) => {
    console.log(visibleData);


    return (
        <div className="relative overflow-x-auto sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <tbody>
                    {visibleData.map((fund) => (
                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                            <th scope="row" className="flex items-center font-medium text-gray-900 whitespace-nowrap">
                                <img className="w-10 h-10 rounded-full" src="https://assets-netstorage.groww.in/mf-assets/logos/birla_groww.png" alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{fund.fund_name}</div>
                                    <div className="font-normal text-gray-500">bonnie@flowbite.com</div>
                                </div>
                            </th>
                            <td className="">
                                Designer
                            </td>
                            <td className="">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>
                            <td className="">
                                <a href="#" className="font-medium text-blue-600">Edit user</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


    return (
        <table className="w-full text-sm text-left content text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3" >
                        <div className="flex items-center">
                            Fund Name{" "}

                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3" >
                        <div className="flex items-center">
                            AUM

                        </div>

                    </th>
                    <th scope="col" className="px-6 py-3" >
                        <div className="flex item-center">
                            3-Year Return (%)

                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3" >
                        <div className="flex item-center">
                            Expense Ratio

                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Subsector
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Plan
                    </th>
                </tr>
            </thead>
            <tbody>
                {/* {visibleData.map((fund) => (
                    <tr key={fund.mfId} className="bg-white border-b ">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            <Link
                                style={{
                                    textDecoration: "none",
                                    fontSize: "medium",
                                }} href={`/mutualfunds/details${fund.slug.replace("/mutualfunds", "")}`}
                                target={"_blank"}

                            >
                                {fund.name}
                            </Link>
                        </td>
                        <td className="px-6 py-4">
                            {fund.values
                                .find((item) => item.filter === "aum")
                                ?.doubleVal?.toLocaleString()}{" "}
                        </td>
                        <td className="px-6 py-4">
                            {fund.values
                                .find((item) => item.filter === "ret3y")
                                ?.doubleVal?.toFixed(2)}{" "}
                            %{" "}
                        </td>
                        <td className="px-6 py-4">
                            {fund.values
                                .find((item) => item.filter === "expRatio")
                                ?.doubleVal?.toFixed(2)}{" "}
                        </td>
                        <td className="px-6 py-4">
                            {
                                fund.values.find((item) => item.filter === "subsector")
                                    ?.strVal
                            }
                        </td>
                        <td className="px-6 py-4">
                            {fund.values.find((item) => item.filter === "option")?.strVal}
                        </td>
                    </tr>
                ))} */}
            </tbody>
        </table>
    );
};
export default ScreenerTable;