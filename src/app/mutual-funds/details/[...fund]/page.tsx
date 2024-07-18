// "use client";

// import { get } from "@/api/api";
// import { endpoints } from "@/api/endpoints";
// import Loader from "@/app/Loader";
// import { MfHomePageDetails } from "@/components/interfaces";
// import FundManagerDetails from "@/components/mutual-funds/FundManagerDetails";
// import HomePageDetails from "@/components/mutual-funds/HomePageDetails";
// import { usePathname, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FaCaretUp, FaCaretDown } from "react-icons/fa";
// import Head from 'next/head'


// const MutualFundsDetails: React.FC = () => {
//     const pathname = usePathname();
//     const fundName = pathname.replace("/mutual-funds/", "");
//     const fundCode = fundName.split("-").pop();


//     const searchParams = useSearchParams();
//     const tab = searchParams.get('tab');
//     console.log(tab);

//     useEffect(() => {
//         if (tab) {
//             setActiveTab(tab);
//         }
//     }, [tab]);

//     const [mfHomeData, setMfHomePageData] = useState<MfHomePageDetails | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [activeTab, setActiveTab] = useState<string>("Home");

//     const handleTabClick = (tabName: string) => {
//         setActiveTab(tabName);
//         const url = new URL(window.location.href);
//         url.searchParams.set('tab', tabName);
//         window.history.pushState({ path: url.href }, '', url.href);
//     };


//     useEffect(() => {
//         const fetchMfDetails = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await get(endpoints.getMfHomePage + "?mf=" + fundCode);
//                 if (response) {
//                     setMfHomePageData(response);
//                     console.log(response);

//                 } else {
//                     setError("Data not found");
//                 }
//             } catch (error) {
//                 console.error("Error fetching MF details", error);
//                 setError("Error fetching data");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (fundCode) {
//             fetchMfDetails();

//         }
//     }, [fundCode]);





//     if (isLoading) return <Loader />;
//     if (error) return <div>Error: {error}</div>;
//     if (!mfHomeData) return null;
//     return (
//         <section className="pt-0">
//             <Head>
//                 <title>{'title'}</title>
//                 <meta name="og:type" content="website" />
//                 <meta name="description" content={'description'} />
//                 <meta name="og:title" content={'title'} />
//                 <meta name="description" content={'description'} />
//                 <meta name="keywords" content={'keyword'} />
//                 <meta name="og:url" content={'url'} />
//                 <meta name="og:description" content={'description'} />
//                 <meta name="og:image" content={'image'} />
//             </Head>
//             <div className="container">
//                 <main className="mx-auto max-w-8xl sm:px-6 lg:px-8 ">
//                     <section aria-labelledby="products-heading " className="mt-[4rem]">
//                         <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
//                             <form className="hidden lg:block">
//                                 <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow ">
//                                     <h5 className="text-xl font-bold leading-none text-gray-900">
//                                         {mfHomeData?.info.name}
//                                     </h5>
//                                     <p className="text-sm text-gray-500 mb-4">
//                                         {" "}
//                                         {mfHomeData?.info.option.toUpperCase()}
//                                     </p>
//                                     <p className="text-xl font-bold text-black">
//                                         {mfHomeData?.info.navClose.toFixed(2)}{" "}
//                                         {mfHomeData?.info.navCh1d > 0 ? (
//                                             <FaCaretUp className="text-green-500 inline-block ml-1" />
//                                         ) : (
//                                             <FaCaretDown className="text-red-500 inline-block ml-1" />
//                                         )}
//                                         <span
//                                             className={`text-sm text-${mfHomeData?.info.navCh1d > 0 ? "green" : "red"
//                                                 }-500 inline-block ml-1`}
//                                         >
//                                             {`${(
//                                                 (mfHomeData?.info.navCh1d * 100) /
//                                                 mfHomeData?.info.navClose
//                                             ).toFixed(2)}%`}
//                                             {mfHomeData?.info.navCh1d > 0 ? (
//                                                 <span className="text-green-500">
//                                                     {" "}
//                                                     (+{mfHomeData?.info.navCh1d.toFixed(2)})
//                                                 </span>
//                                             ) : (
//                                                 <span className="text-red-500">
//                                                     {" "}
//                                                     ({mfHomeData?.info.navCh1d.toFixed(2)})
//                                                 </span>
//                                             )}
//                                         </span>
//                                     </p>

//                                     <br />
//                                     <h5 className="block font-sans text-sm ">
//                                         Investments Checklists
//                                     </h5>

//                                     <div className="divide-y divide-gray-200">
//                                         {mfHomeData.inv_checkList.map((item) => (
//                                             <div key={item.icid} className="flex items-center justify-between pb-3 pt-3 last:pb-0">
//                                                 <div key={item.icid} className="flex items-start gap-x-3">
//                                                     <FaCaretUp className="text-green-500 text-2xl inline-block ml-1" />
//                                                     <div>
//                                                         <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
//                                                             {item.title}
//                                                         </h6>

//                                                         <p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
//                                                             {item.description}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </form>
//                             <div className="lg:col-span-3">
//                                 <div className="lg:col-span-3">
//                                     <div className="mb-4 border-b border-gray-200">
//                                         <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
//                                             <li className="mr-2" role="presentation">
//                                                 <button
//                                                     className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "Home" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}
//                                                     onClick={() => handleTabClick("Home")}
//                                                     type="button"
//                                                     role="tab"
//                                                     aria-label="Home"
//                                                 >
//                                                     Home
//                                                 </button>
//                                             </li>
//                                             {/* <li className="mr-2" role="presentation">
//                                                 <button
//                                                     className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "Peers" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}
//                                                     onClick={() => handleTabClick("Peers")}
//                                                     type="button"
//                                                     role="tab"
//                                                     aria-label="Peers"

//                                                 >
//                                                     Peers
//                                                 </button>
//                                             </li>
//                                             <li className="mr-2" role="presentation">
//                                                 <button
//                                                     className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "Portfolio" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}
//                                                     onClick={() => handleTabClick("Portfolio")}
//                                                     type="button"
//                                                     role="tab"
//                                                     aria-label="Portfolio"

//                                                 >
//                                                     Portfolio
//                                                 </button>
//                                             </li> */}
//                                             <li role="presentation">
//                                                 <button
//                                                     className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "fundManager" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}
//                                                     onClick={() => handleTabClick("fundManager")}
//                                                     type="button"
//                                                     role="tab"
//                                                     aria-label="fundManager"

//                                                 >
//                                                     Fund Manager
//                                                 </button>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                     <div id="default-tab-content">
//                                         <div className={`${activeTab === "Home" ? "block" : "hidden"}`} role="tabpanel">
//                                             <HomePageDetails fundCode={fundCode ?? ""} mfHomeData={mfHomeData} isin={mfHomeData.summary.meta.isin} />
//                                         </div>
//                                         <div className={`${activeTab === "Peers" ? "block" : "hidden"}`} role="tabpanel">
//                                             Peers
//                                         </div>
//                                         <div className={`${activeTab === "Portfolio" ? "block" : "hidden"}`} role="tabpanel">
//                                             Portfolio
//                                         </div>
//                                         <div className={`${activeTab === "fundManager" ? "block" : "hidden"}`} role="tabpanel">
//                                             <FundManagerDetails fundManagersDetails={mfHomeData.fundmanager} />
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </section>
//                 </main>
//             </div>
//         </section>
//     );
// };
// export default MutualFundsDetails;



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
