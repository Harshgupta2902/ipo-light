"use server"
import React from 'react';
import { endpoints } from '@/api/endpoints';
import ScreenerTable from '@/components/mutualfunds/screener-table';
import Pagination from '@/components/mutualfunds/Pagination';
import MfFilters from '@/components/mutualfunds/Filters';
import SearchResults from '@/components/mutualfunds/search_results';
import FilterChips from '@/components/mutualfunds/filter_chips';

const sectionsData = [
    {
        title: "Mutual Funds - Screener",
        imageSrc: "/screener.png",
        items: [
            "Filter by Fund Type (Equity, Debt, Hybrid, et  c.)",
            "Sort by Performance, Ratings, and Returns",
            "Compare Multiple Funds Side by Side",
        ],
    }
];

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

const fetchMfScreener = async (page: string, category?: string, risk?: string, sort?: string) => {
    try {
        let url = `${endpoints.getMfScreener}?page=${page}`;

        if (category) {
            url += `&category=${category}`;
        }

        if (risk) {
            url += `&risk=${risk}`;
        }

        if (sort) {
            url += `&sort=${sort}`;
        }

        const response = await fetch(url, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data", error);
        throw error;
    }
};




const MfScreenerHomePage = async ({ searchParams }: { searchParams: { page?: string, category?: string, risk?: string, sort?: string, } }) => {

    const page = searchParams.page || '0';
    const category = searchParams.category;
    const risk = searchParams.risk;
    const sort = searchParams.sort;

    let visibleData = null;
    let totalCount = 0;


    try {
        const response = await fetchMfScreener(page, category, risk, sort);
        visibleData = response.content;
        totalCount = response.total_results;
    } catch (error) {
        console.error("Error fetching data", error);
    }

    return (
        <section className='container'>
            {sectionsData.map((section, index) => (
                <section key={index}>
                    <div className="container">
                        <div className={`row gy-5 lg:gy-0`}>
                            <div className={`lg:col-8`}>
                                <h1 className="my-4 pt-6 text-5xl">{section.title}</h1>
                                <ul className="max-w-md space-y-1 text-gray-500 list-inside ">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <svg
                                                className="w-3.5 h-3.5 me-2 text-green-500"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            <h2 className="text-base font-medium" style={{ color: "#343434" }}>{item}</h2>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`lg:col-4`}>
                                <img
                                    alt="services-image"
                                    loading="lazy"
                                    width="450"
                                    height="450"
                                    style={{ mixBlendMode: "multiply" }}
                                    decoding="async"
                                    data-nimg="1"
                                    src={section.imageSrc}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            <div className="bg-white">
                <main className="mx-auto max-w-10xl">
                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <MfFilters />
                            <div className="lg:col-span-3">
                                <section >
                                    <div className="container">
                                        <div className="relative overflow-x-auto sm:rounded-lg">
                                            <SearchResults total={totalCount} />
                                            {/* <FilterChips /> */}
                                            <ScreenerTable visibleData={visibleData} />
                                            <Pagination
                                                currentPage={0}
                                                totalItems={totalCount}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

        </section>
    );

}

export default MfScreenerHomePage;