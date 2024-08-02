import { endpoints } from "@/api/endpoints";
import { headers } from "next/headers";
import Loader from "@/app/Loader";
import HomePageDetails from "@/components/mutualfunds/HomePageDetails";

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
    if (!mfHomeData) return <div><Loader /></div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <div className="container">
            <main className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                <section aria-labelledby="products-heading" className="">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <form className="hidden lg:block">
                            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow">
                                <img src={mfHomeData.logo_url} alt={mfHomeData.stpDetails.amc_name} className="w-10 h-10 object-contain border rounded-sm p-1" />

                                <h1 className="text-xl font-bold leading-none text-gray-900">
                                    {mfHomeData.stpDetails.amc_name}
                                </h1>
                                <p className="text-sm text-gray-500 mb-4">
                                    {mfHomeData.stpDetails.scheme_type}
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    {mfHomeData.nav}
                                </p>
                                {/* <p className="text-xl font-bold text-black">
                                {mfHomeData?.info.navClose.toFixed(2)}{" "}
                                {mfHomeData?.info.navCh1d > 0 ? (
                                    <FaCaretUp className="text-green-500 inline-block ml-1" />
                                ) : (
                                    <FaCaretDown className="text-red-500 inline-block ml-1" />
                                )}
                                <span
                                    className={`text-sm text-${mfHomeData?.info.navCh1d > 0 ? "green" : "red"
                                        }-500 inline-block ml-1`}
                                >
                                    {`${(
                                        (mfHomeData?.info.navCh1d * 100) /
                                        mfHomeData?.info.navClose
                                    ).toFixed(2)}%`}
                                    {mfHomeData?.info.navCh1d > 0 ? (
                                        <span className="text-green-500">
                                            {" "}
                                            (+{mfHomeData?.info.navCh1d.toFixed(2)})
                                        </span>
                                    ) : (
                                        <span className="text-red-500">
                                            {" "}
                                            ({mfHomeData?.info.navCh1d.toFixed(2)})
                                        </span>
                                    )}
                                </span>
                            </p> */}

                                <br />
                                {/* <h2 className="block font-sans text-sm">
                                Investments Checklists
                            </h2>

                            <div className="divide-y divide-gray-200">
                                {mfHomeData.inv_checkList.map((item:any) => (
                                    <div key={item.icid} className="flex items-center justify-between pb-3 pt-3 last:pb-0">
                                        <div key={item.icid} className="flex items-start gap-x-3">
                                            <FaCaretUp className="text-green-500 text-2xl inline-block ml-1" />
                                            <div>
                                                <h3 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                                                    {item.title}
                                                </h3>

                                                <p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                            </div>
                        </form>
                        <div className="lg:col-span-3">
                            <div className="lg:col-span-3">
                                {/* <div className="mb-4 border-b border-gray-200">
                                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
                                    <li className="mr-2" role="presentation">
                                        <button
                                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "Home" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}
                                            onClick={() => handleTabClick("Home")}
                                            type="button"
                                            role="tab"
                                            aria-label="Home"
                                        >
                                            Home
                                        </button>
                                    </li>
                                    <li role="presentation">
                                        <button
                                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "fundManager" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}
                                            onClick={() => handleTabClick("fundManager")}
                                            type="button"
                                            role="tab"
                                            aria-label="fundManager"
                                        >
                                            Fund Manager
                                        </button>
                                    </li>
                                </ul>
                            </div> */}
                                <HomePageDetails isin={mfHomeData.stpDetails.isin} />
                                {/* <div id="default-tab-content">
                                <div className={`${activeTab === "Home" ? "block" : "hidden"}`} role="tabpanel">
                                    
                                </div>
                                <div className={`${activeTab === "Peers" ? "block" : "hidden"}`} role="tabpanel">
                                    Peers
                                </div>
                                <div className={`${activeTab === "Portfolio" ? "block" : "hidden"}`} role="tabpanel">
                                    Portfolio
                                </div>
                                <div className={`${activeTab === "fundManager" ? "block" : "hidden"}`} role="tabpanel">
                                    <FundManagerDetails key={"fundManager"} fundManagersDetails={mfHomeData.fundmanager} />
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default MutualFundsDetails;
