"use client";

import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { MfHomePageDetails } from "@/components/interfaces";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { TbCheckbox } from "react-icons/tb";


const MutualFundsDetails: React.FC = () => {
    const pathname = usePathname();
    const fundName = pathname.replace("/mutual-funds/", "");
    const fundCode = fundName.split("-").pop();

    const [mfHomeData, setMfHomePageData] = useState<MfHomePageDetails | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMfDetails = async () => {
            setIsLoading(true);
            try {
                const response = await get(endpoints.getMfHomePage + "?mf=" + fundCode);
                if (response) {
                    setMfHomePageData(response);
                    setIsLoading(false);
                } else {
                    setError("Data not found");
                    setIsLoading(false);
                }
                console.log(response.info.name);
            } catch (error) {
                console.error("Error fetching MF details", error);
                setError("Error fetching data");
                setIsLoading(false);
            }
        };

        if (fundCode) {
            fetchMfDetails();
        }
    }, [fundCode]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!mfHomeData) return null; // or handle initial load state as needed
    return (
        <section>
            <div className="container">
                <main className="mx-auto max-w-8xl sm:px-6 lg:px-8 ">
                    <section aria-labelledby="products-heading " className="mt-[4rem]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <form className="hidden lg:block">
                                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow ">
                                    <h5 className="text-xl font-bold leading-none text-gray-900">
                                        {mfHomeData?.info.name}
                                    </h5>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {" "}
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
                                    <h5 className="block font-sans text-sm ">
                                        Investments Checklists
                                    </h5>

                                    <div className="divide-y divide-gray-200">
                                        {mfHomeData.inv_checkList.map((item) => (
                                            <div className="flex items-center justify-between pb-3 pt-3 last:pb-0">
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
                            <div className="lg:col-span-3">Data</div>
                        </div>
                    </section>
                </main>
            </div>
        </section>
    );
};
export default MutualFundsDetails;
