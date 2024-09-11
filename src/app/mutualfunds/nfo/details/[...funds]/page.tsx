import { endpoints } from '@/api/endpoints';
import Loader from '@/app/Loader';
import NotFound from '@/app/not-found';
import ExpenseRatio from '@/components/mutualfunds/details/expense_ratio';
import FundManagerDetails from '@/components/mutualfunds/details/FundManagerDetails';
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
                            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow">
                                <Image
                                    src={nfoData.logo_url}
                                    className="w-10 h-10 object-contain border rounded-sm p-1"
                                    width="40"
                                    height="40"
                                    alt={nfoData.stpDetails ? nfoData.stpDetails.amc_name : nfoData.fund_name}
                                    priority
                                />
                                <h1 className="text-xl font-bold leading-none text-gray-900">
                                    {nfoData.stpDetails ? nfoData.stpDetails.amc_name : nfoData.fund_name}
                                </h1>
                                <p className="text-sm text-gray-500 mb-4">
                                    {nfoData.stpDetails && nfoData.stpDetails.scheme_type}
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    {nfoData.nav}
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    {nfoData.aum}
                                </p>
                                <br />
                            </div>
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
