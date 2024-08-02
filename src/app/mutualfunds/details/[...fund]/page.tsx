import { endpoints } from "@/api/endpoints";
import MutualFundsDetailsClient from "./MutualFundsDetailsClient";
import { headers } from "next/headers";


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


// export async function generateMetadata({ params }: { params: { fund: string[] } }) {
//     const pathname = params.fund.join("-");
//     const fundCode = pathname.split("-").pop();
//     let mfHomeData = null;
//     try {
//         mfHomeData = await fetchMfDetails(fundCode);

//     } catch (err) {
//         console.error(`Error fetching metadata: ${err}`);
//     }

//     const metaData = mfHomeData.summary.meta;

//     const metaTitle = metaData.fullName ? metaData.fullName : pathname;
//     const metaDescription = `Explore the ${metaData.fullName} (${metaData.plan} Plan) with comprehensive details on performance, risk classification, benchmark index, and investment strategy. Invest wisely with ${metaData.amc}.`;
//     const keywords = [
//         metaData.fullName,
//         metaData.sector,
//         metaData.subsector,
//         metaData.amc,
//         metaData.benchmarkIndex,
//         "mutual fund investment",
//         "high risk mutual funds",
//         "debt and equity funds",
//     ];
//     console.log(metaTitle);

//     return {
//         title: metaTitle,
//         description: metaDescription,
//         robots: "index, follow",
//         author: "IpoTech",
//         keywords: keywords,
//         copyright: "Copyright 2024 @ IpoTech",
//         url: "https://www.ipotec.in/",
//         openGraph: {
//             title: metaTitle,
//             description: metaDescription,
//             site: "https://www.ipotec.in/",
//             images: "https://www.ipotec.in/logo.png",
//             type: "website",
//             url: `https://www.ipotec.in${pathname}`,
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: metaTitle,
//             description: metaDescription,
//             images: "https://www.ipotec.in/og_image.png"
//         },
//         alternates: {
//             canonical: `https://www.ipotec.in${pathname}`,
//         },
//     };
// }



const MutualFundsDetails = async () => {


    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace('/mutualfunds/details/', "");
    console.log(pathname);

    // const metaData = await fetchMetadata(pathname ?? "/");

    let mfHomeData = null;
    let error = null;

    try {
        mfHomeData = await fetchMfDetails(`${pathname}`);
    } catch (err) {
        console.error(`error ${err}`);

    }


    return (
        
        <MutualFundsDetailsClient mfHomeData={mfHomeData} error={error} />
    );
}

export default MutualFundsDetails;
