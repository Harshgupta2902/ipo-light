"use client";

import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { MfHomePageDetails } from "../interfaces";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";


export interface ChartData {
    isin: Isin[]
}

export interface Isin {
    navDate: string
    navValueAdjusted: number
    navValue: number
}


export default function HomePageDetails({
    fundCode,
    isin,
    mfHomeData,
}: {
    fundCode: string;
    isin: string;
    mfHomeData: MfHomePageDetails;
}) {
    const [chartPoints, setChartPoints] = useState<Isin[]>([]);
    const [error, setError] = useState<string>();
    const chartRef = useRef<any>(null);


    useEffect(() => {
        const fetchMfDetails = async () => {
            try {
                const response = await get(`${endpoints.getNav}/${isin}`);
                if (response && !response.error) {
                    setChartPoints(response.isin);
                    console.log(response.isin);

                } else {
                    setError("Failed to fetch mutual fund Chart Details");
                }
            } catch (error) {
                console.error("Error fetching MF details", error);
            }
        };

        fetchMfDetails();
    }, [fundCode]);


    return (
        <div>
            {error && <p>{error}</p>}
            {!error && chartPoints.length > 0 && (
                <>
                    <h2>Price Chart</h2>
                    <Line
                        ref={chartRef}
                        data={{
                            labels: chartPoints.map((point) => point.navDate),
                            datasets: [
                                {
                                    label: "Price",
                                    data: chartPoints.map((point) => point.navValue),
                                    fill: true,
                                    borderColor: "rgb(34, 197, 94)",
                                    tension: 0.1,
                                    backgroundColor: "rgba(34, 197, 94, 0.2)",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 0,
                                },
                            },
                            scales: {
                                x: {
                                    display: false,
                                },
                                y: {
                                    display: false,
                                },
                            },
                            plugins: {
                                filler: {
                                    propagate: true,
                                },
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    enabled: true,
                                    intersect: false,
                                    mode: "index",
                                    callbacks: {
                                        label: function (tooltipItem: any) {
                                            let label = tooltipItem.dataset.label || "";
                                            if (label) {
                                                label += ": ";
                                            }
                                            label += tooltipItem.formattedValue;
                                            return label;
                                        },
                                        title: function (tooltipItems: any) {
                                            const timestamp = tooltipItems[0].label;
                                            const date = new Date(timestamp);
                                            return `Date: ${date.toLocaleDateString()}`;
                                        },
                                    },
                                },
                            },
                        }}
                    />
                </>
            )}


            <br />

            <div className="row">
                {mfHomeData?.summary?.labels.map((label, index) => (
                    <div key={index} className="mb-14 md:col-6 lg:col-4 pl-2 pr-0">
                        <div className="max-w-sm rounded-sm max-h-60 overflow-hidden shadow px-6 py-4 border border-grey-500">
                            <div className="flex items-start">
                                <img
                                    className="w-10 h-10 rounded-full mr-4"
                                    src={
                                        index === 1
                                            ? "https://assets.tickertape.in/sector-icons/mutualfund_large_size.png"
                                            : index === 2
                                                ? "https://assets.tickertape.in/sector-icons/very_high_risk.png"
                                                : "https://assets.tickertape.in/sector-icons/mutualfund_hybrid.png"
                                    }
                                    alt={label.title}
                                />
                                <div className="text-sm">
                                    <p className="text-gray-900 leading-none">{label.title}</p>
                                    <p className="text-xs mt-1.5">{label.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <h5 className="font-bold">Peers</h5>
            <div className="flex flex-row overflow-x-auto">
                {mfHomeData?.summary?.peers.map((label, index) => (
                    <div key={index} className="flex-shrink-0 mb-4 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
                        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg px-6 py-4 border border-gray-500">
                            <div className="flex items-center">
                                <img
                                    className="w-10 h-10 rounded-full mr-4"
                                    src="https://assets.tickertape.in/sector-icons/mutualfund_large_size.png"
                                    alt={index.toString()}
                                />
                                <div className="text-sm">
                                    <p className="text-gray-900 leading-none">{label.mfId}</p>
                                    <p className="text-xs mt-1.5">{label.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}

            <h5 className="font-bold">Peers</h5>
            <div className="relative flex flex-row overflow-x-auto">
                {mfHomeData?.summary?.peers.map((label, index) => (
                    <div className="p-6 ml-4 bg-white border border-gray-200 rounded-md shadow flex-shrink-0 mb-4 md:w-1/3 lg:w-1/3 xl:w-1/3 px-2">
                        <h5 className="text-base font-bold leading-none overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {label.name}
                        </h5>
                        <p className="text-xs mb-2">
                            {label.option.toUpperCase()}
                        </p>
                        <br />
                        <p className={`text-sm font-bold ${label.ratios[0].value !== null && label.ratios[0].value !== undefined ? 'text-green-500' : 'text-red-500'}`}>
                            {(label.ratios[0].value !== null && label.ratios[0].value !== undefined ? label.ratios[0].value.toFixed(2) : '0.00')}
                            {(label.ratios[0].value !== null && label.ratios[0].value !== undefined) ? (
                                <FaCaretUp className="text-green-500 inline-block ml-1" />
                            ) : (
                                <FaCaretDown className="text-red-500 inline-block ml-1" />
                            )}
                            <span className={`text-sm inline-block ml-1 ${label.ratios[1].value !== null && label.ratios[1].value !== undefined ? 'text-green-500' : 'text-red-500'}`}>
                                {(label.ratios[1].value !== null && label.ratios[1].value !== undefined ? label.ratios[1].value.toFixed(2) : '0.00')}
                            </span>
                            <span className={`text-sm  inline-block ml-1 `}>
                                {(label.ratios[2].value !== null && label.ratios[2].value !== undefined ? `${label.ratios[2].value.toFixed(2)}%` : '0.00%')}
                            </span>
                        </p>
                    </div>
                    // <div
                    //     key={index}
                    //     className="flex-shrink-0 mb-4 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"
                    // >
                    //     <div className="max-w-sm rounded-lg overflow-hidden shadow-lg px-6 py-4 border border-gray-500">
                    //         <div className="flex items-center">
                    //             <img
                    //                 className="w-10 h-10 rounded-full mr-4"
                    //                 src="https://assets.tickertape.in/sector-icons/mutualfund_large_size.png"
                    //                 alt={index.toString()}
                    //             />
                    //             <div className="text-sm">
                    //                 <p className="text-gray-900 leading-none">{label.mfId}</p>
                    //                 <p className="text-xs mt-1.5">{label.name}</p>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>
            <br />
        </div>
    );
}
