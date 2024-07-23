"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import FundManagerDetails from "@/components/mutual-funds/FundManagerDetails";
import HomePageDetails from "@/components/mutual-funds/HomePageDetails";
import { MfHomePageDetails } from "@/components/interfaces";

interface MutualFundsDetailsClientProps {
    mfHomeData: MfHomePageDetails | null;
    error: string | null;
    initialTab: string | null;
    fundCode: any;
}

const MutualFundsDetailsClient: React.FC<MutualFundsDetailsClientProps> = ({ fundCode, mfHomeData, error, initialTab }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>(initialTab || "Home");

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
        const url = `${pathname}?tab=${tabName}`;
        router.push(url);


    };

    if (!mfHomeData) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="pt-1">
            <div className="container">
                <main className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                    <section aria-labelledby="products-heading" className="mt-[4rem]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <form className="hidden lg:block">
                                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow">
                                    <h5 className="text-xl font-bold leading-none text-gray-900">
                                        {mfHomeData?.info.name}
                                    </h5>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {mfHomeData?.info.option.toUpperCase()}
                                    </p>
                                    <p className="text-xl font-bold text-black">
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
                                    </p>

                                    <br />
                                    <h5 className="block font-sans text-sm">
                                        Investments Checklists
                                    </h5>

                                    <div className="divide-y divide-gray-200">
                                        {mfHomeData.inv_checkList.map((item) => (
                                            <div key={item.icid} className="flex items-center justify-between pb-3 pt-3 last:pb-0">
                                                <div key={item.icid} className="flex items-start gap-x-3">
                                                    <FaCaretUp className="text-green-500 text-2xl inline-block ml-1" />
                                                    <div>
                                                        <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                                                            {item.title}
                                                        </h6>

                                                        <p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                            <div className="lg:col-span-3">
                                <div className="lg:col-span-3">
                                    <div className="mb-4 border-b border-gray-200">
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
                                    </div>
                                    <div id="default-tab-content">
                                        <div className={`${activeTab === "Home" ? "block" : "hidden"}`} role="tabpanel">
                                            <HomePageDetails fundCode={fundCode} mfHomeData={mfHomeData} isin={mfHomeData.summary.meta.isin} />
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </section>
    );
};

export default MutualFundsDetailsClient;
