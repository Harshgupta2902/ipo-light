import { endpoints } from '@/api/endpoints';
import Loader from '@/app/Loader';
import NotFound from '@/app/not-found';
import AnnualizedReturns from '@/components/mutualfunds/details/annualized_returns';
import ExpenseRatio from '@/components/mutualfunds/details/expense_ratio';
import FundManagerDetails from '@/components/mutualfunds/details/FundManagerDetails';
import Holdings from '@/components/mutualfunds/details/holdings';
import NavChart from '@/components/mutualfunds/details/nav_chart';
import dynamic from 'next/dynamic';
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
