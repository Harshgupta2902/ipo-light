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
        </div>
    );
}

export default NavChart;