import { endpoints } from "@/api/endpoints";
import MutualFundsDetailsClient from "./MutualFundsDetailsClient";


const fetchMfDetails = async (fundCode: any) => {
    try {
        const response = await fetch(`${endpoints.getMfHomePage}?mf=${fundCode}`);
        if (!response.ok) {
            throw new Error('Data not found');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching MF details", error);
        throw error;
    }
}

const MutualFundsDetails = async ({ params, searchParams }: { params: { fund: string[] }, searchParams: { tab?: string } }) => {
    const fundName = params.fund.join("-");
    const fundCode = fundName.split("-").pop();
    const initialTab = searchParams.tab || "Home";

    let mfHomeData = null;
    let error = null;

    try {
        mfHomeData = await fetchMfDetails(fundCode);
    } catch (err) {
        console.error(`error ${err}`);

    }

    return (
        <MutualFundsDetailsClient mfHomeData={mfHomeData} error={error} initialTab={initialTab} fundCode={fundCode}/>
    );
}

export default MutualFundsDetails;
