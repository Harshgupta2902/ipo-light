import { endpoints } from "@/api/endpoints";
import { headers } from "next/headers";
import Loader from "@/app/Loader";
import NavChart from "@/components/mutualfunds/details/nav_chart";
import Holdings from "@/components/mutualfunds/details/holdings";
import Image from "next/image";
import dynamic from 'next/dynamic';
import NotFound from "@/app/not-found";
import { ArrowTrendingUpIcon, CurrencyRupeeIcon, ScaleIcon } from '@heroicons/react/24/solid';

const FundManagerDetails = dynamic(() => import("@/components/mutualfunds/details/FundManagerDetails"));
const ExpenseRatio = dynamic(() => import("@/components/mutualfunds/details/expense_ratio"));
const AnnualizedReturns = dynamic(() => import("@/components/mutualfunds/details/annualized_returns"));

const fetchMfDetails = async (fund: string) => {
    try {
        const response = await fetch(`${endpoints.getMfDetails}/${fund}`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error('Data not found');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching MF details", error);
        throw error;
    }
}


function getYears(dateStr: string) {
    const date = new Date(dateStr);
    const currentDate = new Date();

    const yearsDifference = currentDate.getFullYear() - date.getFullYear();

    const hasNotReachedAnniversary = (currentDate.getMonth() < date.getMonth()) ||
        (currentDate.getMonth() === date.getMonth() && currentDate.getDate() < date.getDate());

    const finalYearsDifference = yearsDifference - (hasNotReachedAnniversary ? 1 : 0);

    return finalYearsDifference;
}


export async function generateMetadata() {
    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace('/mutualfunds/details/', "");

    let mfHomeData = null;
    try {
        mfHomeData = await fetchMfDetails(`${pathname}`);
    } catch (err) {
        console.error(`Error fetching metadata: ${err}`);
    }

    const metaTitle = mfHomeData.stpDetails ? mfHomeData.stpDetails.scheme_name : mfHomeData.fund_name;
    const metaDescription = `${mfHomeData.scheme_name} is ${mfHomeData.sub_category} ${mfHomeData.scheme_type} mutual fund with track record of ${getYears(mfHomeData.launch_date)} years, with overall return of ${mfHomeData.return_stats && mfHomeData.return_stats[0].return_since_created.toFixed(2)}%.`;
    const keywords = [
        mfHomeData.scheme_code,
        mfHomeData.super_category,
        mfHomeData.sub_category,
        mfHomeData.category,
        mfHomeData.fund_house,
        mfHomeData.scheme_type,
        mfHomeData.isin,
        mfHomeData.plan_type,
        mfHomeData.fund_manager,
        "mutual fund investment",
        "high risk mutual funds",
        "debt and equity funds",
    ];

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


const fetchIsin = async (isin: string) => {
    try {
        const response = await fetch(`${endpoints.getNav}/${isin}`);
        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching GmpIpo", error);
        throw error;
    }
};


const MutualFundsDetails = async () => {

    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace('/mutualfunds/details/', "");

    let chartPoints = null;

    let mfHomeData = null;
    let error = null;

    try {
        mfHomeData = await fetchMfDetails(`${pathname}`);
        if (mfHomeData.error) {
            error = mfHomeData.error;
        }
        if (mfHomeData.isin) {
            const response = await fetchIsin(mfHomeData.stpDetails ? mfHomeData.stpDetails.isin : mfHomeData.isin);
            if (response.isin) {
                chartPoints = response.isin;
            } else {
                chartPoints = response;
            }
        }
    } catch (err) {
        console.error(`error ${err}`);

    }
    if (error) return <NotFound />;
    if (mfHomeData.error) return <NotFound />;

    if (!mfHomeData) return <div><Loader /></div>;

    return (

        <div className="container">
            <main className="mx-auto max-w-8xl">
                <section aria-labelledby="products-heading" className="">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <form className="hidden lg:block">
                            <aside className="w-80">
                                <div className="rounded-lg border bg-card text-gray-900 text-card-foreground shadow-sm">
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <Image
                                                src={mfHomeData.logo_url}
                                                alt={mfHomeData.fund_house}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold leading-none">{mfHomeData.fund_house}</h3>
                                                <p className="text-sm">{`${mfHomeData.plan_type} ${mfHomeData.scheme_type}`}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">NAV</span>
                                                <span className="text-sm font-semibold">₹{mfHomeData.nav.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <ArrowTrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Risk</span>
                                                </div>
                                                <span className="text-sm font-semibold text-red-500">{mfHomeData.nfo_risk}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <CurrencyRupeeIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Min. Investment</span>
                                                </div>
                                                <span className="text-sm">₹{mfHomeData.min_investment_amount}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <ScaleIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Expense Ratio</span>
                                                </div>
                                                <span className="text-sm">{mfHomeData.expense_ratio}%</span>
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                Exit load: {mfHomeData.exit_load}
                                            </p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                Benchmark: {mfHomeData.benchmark_name}
                                            </p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                Fund Manager: {mfHomeData.fund_manager}
                                            </p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                Launch Date: {new Date(mfHomeData.launch_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </form>
                        <div className="lg:col-span-3">
                            {chartPoints ? <NavChart response={chartPoints} /> : <Loader />}
                            <Holdings holdings={mfHomeData.holdings} />
                            <AnnualizedReturns stats={mfHomeData.stats} />
                            <ExpenseRatio exitload={mfHomeData.exit_load} expense_ratio={mfHomeData.expense_ratio} stampduty={mfHomeData.stamp_duty} taxImp={mfHomeData.category_info.tax_impact} expratioList={mfHomeData.historic_fund_expense} exitLoadList={mfHomeData.historic_exit_loads} />
                            <FundManagerDetails fundManagersDetails={mfHomeData.fund_manager_details} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default MutualFundsDetails;
