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
    return (
        <div className="relative overflow-x-auto sm:rounded border">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <tbody>
                    {visibleData.map((fund) => (
                        <tr key={fund.fund_name} className="bg-white border-b hover:bg-gray-50  ">
                            <th scope="row" className="m-4 flex items-center font-medium text-gray-900 whitespace-nowrap">
                                <img src={fund.logo_url} alt={fund.fund_name} className="w-10 h-10 object-contain border rounded p-1" />
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
                                <div className="text-sm text-gray-900">{fund.return1y ? fund.return1y : "NA"}%</div>
                                <div className="text-xs text-gray-500">1Y </div>
                            </td>
                            <td>
                                <div className="text-sm text-gray-900">{fund.return3y ? fund.return3y : "NA"}%</div>
                                <div className="text-xs text-gray-500">3Y </div>
                            </td>
                            <td>
                                <div className="text-sm text-gray-900">{fund.return5y ? fund.return5y : "NA"}%</div>
                                <div className="text-xs text-gray-500">5Y </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ScreenerTable;