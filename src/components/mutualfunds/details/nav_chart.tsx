"use client"

import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";


export interface ChartData {
    isin: Isin[]
}

export interface Isin {
    navDate: string
    navValueAdjusted: number
    navValue: number
}

const NavChart = ({ response }: { response: any; }) => {
    const chartRef = useRef<any>(null);
    const [timeRange, setTimeRange] = useState("All");

    const filterDataByTimeRange = (data: any[], range: string) => {
        const now = new Date();
        let filteredData = data;

        switch (range) {
            case "1m":
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                filteredData = data.filter(d => new Date(d.navDate) >= oneMonthAgo);
                break;
            case "6m":
                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                filteredData = data.filter(d => new Date(d.navDate) >= sixMonthsAgo);
                break;
            case "1y":
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                filteredData = data.filter(d => new Date(d.navDate) >= oneYearAgo);
                break;
            case "3y":
                const threeYearsAgo = new Date();
                threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
                filteredData = data.filter(d => new Date(d.navDate) >= threeYearsAgo);
                break;
            case "5y":
                const fiveYearsAgo = new Date();
                fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
                filteredData = data.filter(d => new Date(d.navDate) >= fiveYearsAgo);
                break;
            default:
                break;
        }

        return filteredData;
    };

    let chartPoints = filterDataByTimeRange(response, timeRange);

    if (chartPoints.length === 0) {
        chartPoints = response;
    }


    return (
        <div>
            {chartPoints.length > 0 && (
                <>
                    <Line
                        ref={chartRef}
                        data={{
                            labels: chartPoints.map((point: any) => point.navDate),
                            datasets: [
                                {
                                    label: "Price",
                                    data: chartPoints.map((point: any) => point.navValue),
                                    fill: true,
                                    borderColor: "rgb(0, 179, 134)",
                                    tension: 0.1,
                                    backgroundColor: "rgba(255,255,255)",
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
                    <br />
                    <div className="filter-buttons text-center">
                        {["1m", "6m", "1y", "3y", "5y", "All"].map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`items-center whitespace-nowrap rounded-md border rounded-full mr-2 p-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900 ${timeRange === range ? "active" : ""}`}
                                style={{
                                    border: timeRange === range ? '1px solid black' : '1px solid gray',
                                    backgroundColor: timeRange === range ? 'lightgray' : 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </>
            )}

            <br />

            {/* <div className="row">
                {mfHomeData?.summary?.labels.map((label, index) => (
                    <div key={index} className="mb-14 md:col-6 lg:col-4 pl-2 pr-0">
                        <div className="max-w-sm rounded-sm max-h-60 overflow-hidden shadow px-6 py-4 border border-grey-500">
                            <div className="flex items-start">
                                <img
                                    className="w-10 h-10 rounded-full mr-4"
                                    src={
                                        index === 1
                                            ? "/mf/mutualfund_large_size.png"
                                            : index === 2
                                                ? "/mf/very_high_risk.png"
                                                : "/mf/mutualfund_hybrid.png"
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

            <h2 className="font-bold text-2xl">Peers</h2>
            <div className="relative flex flex-row overflow-x-auto mt-2">
                {mfHomeData?.summary?.peers.map((label, index) => (
                    <div key={index} className="p-6 bg-white border border-gray-200 rounded-md shadow flex-shrink-0 mb-4 md:w-1/3 lg:w-1/3 xl:w-1/3 px-2">
                        <h3 className="text-base font-bold leading-none overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {label.name}
                        </h3>
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
                    <h2 className="font-bold text-2xl">Fund Managers</h2>
                    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                        {mfHomeData.fundmanager && mfHomeData.fundmanager.map((fundManager) => (
                            <div key={fundManager.fmCode}
                                className="relative flex items-center gap-4  pb-0 mx-0 mt-6 overflow-hidden text-gray-700 bg-transparent shadow-none bg-clip-border">
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
                    <h2 className="font-bold text-2xl mb-4">AMC Profile</h2>
                    <p className="text-sm">{mfHomeData.summary.amcDetails.description}</p>
                    <br />
                    <div className="row">
                        <div className="col-6">
                            <h3 className="font-bold text-base">No. of Schemes</h3>
                            <p>{mfHomeData.summary.amcDetails.mfCount}</p>
                        </div>
                        <div className="col-6">
                            <h3 className="font-bold text-base">Total Aum</h3>
                            <p>{formatCurrency(mfHomeData.summary.amcDetails.aum)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br /> */}

        </div>
    );
}

export default NavChart;