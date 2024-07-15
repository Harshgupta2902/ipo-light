"use client";

import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { MfHomePageDetails } from "../interfaces";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import Link from "next/link";


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

    const formatCurrency = (amount: any) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

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
                ))}
            </div>
            <br />
            <br />
            <div className="row">
                <div className="col-6">
                    <h5 className="font-bold mb-4">Fund Managers</h5>
                    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                        {mfHomeData.fundmanager.map((fundManager) => (
                            <div key={fundManager.fmCode}
                                className="relative flex items-center gap-4 pt-0 pb-0 mx-0 mt-6 overflow-hidden text-gray-700 bg-transparent shadow-none bg-clip-border">
                                <img
                                    src={fundManager.imgUrl}
                                    alt={fundManager.name}
                                    className="relative inline-block h-[58px] w-[58px] rounded-md object-cover object-center" />
                                <div className="flex w-full flex-col gap-0.5">
                                    <div className="flex items-center justify-between">
                                        <Link href={"?tab=fundManager"}> <h5
                                            className="block text-lg font-semibold leading-snug tracking-normal cursor-pointer text-blue-gray-900 hover:text-hover-blue">
                                            {fundManager.name}
                                        </h5></Link>
                                    </div>
                                    <p className="block text-sm antialiased font-light  text-blue-gray-900">
                                        {`Exp: ${fundManager.exp} years`}
                                        <span className="ml-4 text-blue-gray-500">Funds: {fundManager.funds.length}</span>                            </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="col-6">
                    <h5 className="font-bold mb-4">AMC Profile</h5>
                    <p className="text-sm">{mfHomeData.summary.amcDetails.description}</p>
                    <br />
                    <div className="row">
                        <div className="col-6">
                            <h6 className="font-bold ">No. of Schemes</h6>
                            <p>{mfHomeData.summary.amcDetails.mfCount}</p>
                        </div>
                        <div className="col-6">
                            <h6 className="font-bold ">Total Aum</h6>
                            <p>{formatCurrency(mfHomeData.summary.amcDetails.aum)}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
