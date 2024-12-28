import { endpoints } from '@/api/endpoints';
import Loader from '@/app/Loader';
import NotFound from '@/app/not-found';
import ExpenseRatio from '@/components/mutualfunds/details/expense_ratio';
import FundManagerDetails from '@/components/mutualfunds/details/FundManagerDetails';
import { ArrowTrendingUpIcon, CurrencyRupeeIcon, ScaleIcon } from '@heroicons/react/24/solid';
import { headers } from 'next/headers';
import Image from 'next/image';


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


const fetchNfoDetails = async (fund: string) => {
    try {
        const response = await fetch(`${endpoints.getNfoDetails}/${fund}`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error('Data not found');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching MF details", error);
        throw error;
    }
}



export async function generateMetadata() {
    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace('/mutualfunds/nfo/details', "");

    let mfHomeData = null;
    try {
        mfHomeData = await fetchNfoDetails(`${pathname}`);
    } catch (err) {
        console.error(`Error fetching metadata: ${err}`);
    }

    const metaTitle = `${mfHomeData.scheme_name} | NFO | ${mfHomeData.sub_category} Fund | IpoTec `;
    const metaDescription = `${mfHomeData.scheme_name} is ${mfHomeData.sub_category} ${mfHomeData.scheme_type} mutual fund. Start Investing from ${mfHomeData.min_investment_amount}`;
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





const NfoDetails = async () => {

    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace('/mutualfunds/nfo/details/', "");

    let error = null;
    let chartPoints = null;
    let nfoData = null;

    try {
        nfoData = await fetchNfoDetails(`${pathname}`);
        if (nfoData.error) {
            error = nfoData.error;
        }
        if (nfoData.isin) {
            const response = await fetchIsin(nfoData.isin);
            if (response.isin) {
                chartPoints = response.isin;
            } else {
                chartPoints = response;
            }
        }
    } catch (err) {
        console.error(`Error fetching metadata: ${err}`);
    }
    if (error) return <NotFound />;
    if (nfoData.error) return <NotFound />;

    if (!nfoData) return <div><Loader /></div>;

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
                                                src={nfoData.logo_url}
                                                alt={nfoData.fund_house}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold leading-none">{nfoData.fund_house}</h3>
                                                <p className="text-sm">{`${nfoData.plan_type} ${nfoData.scheme_type}`}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">NAV</span>
                                                <span className="text-sm font-semibold">₹{nfoData.nav.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <ArrowTrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Risk</span>
                                                </div>
                                                <span className="text-sm font-semibold text-red-500">{nfoData.nfo_risk}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <CurrencyRupeeIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Min. Investment</span>
                                                </div>
                                                <span className="text-sm">₹{nfoData.min_investment_amount}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <ScaleIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Expense Ratio</span>
                                                </div>
                                                <span className="text-sm">{nfoData.expense_ratio}%</span>
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                Exit load: {nfoData.exit_load}
                                            </p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                Benchmark: {nfoData.benchmark_name}
                                            </p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                Fund Manager: {nfoData.fund_manager}
                                            </p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                Launch Date: {new Date(nfoData.launch_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </form>
                        <div className="lg:col-span-3">
                            <ExpenseRatio exitload={nfoData.exit_load} expense_ratio={nfoData.expense_ratio} stampduty={nfoData.stamp_duty} taxImp={nfoData.category_info.tax_impact} expratioList={nfoData.historic_fund_expense} exitLoadList={nfoData.historic_exit_loads} />
                            <FundManagerDetails fundManagersDetails={nfoData.fund_manager_details} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );

}

export default NfoDetails;
