"use client"

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { get } from '@/api/api';
import { endpoints } from '@/api/endpoints';

interface ChartDataPoint {
    ts: string;
    lp: number;
}

interface ChartData {
    h: number;
    l: number;
    r: number;
    points: ChartDataPoint[];
}

export default function HomePageDetails({ fundCode }: { fundCode: string }) {

    const [chartData, setChartData] = useState<any[]>([]);
    const [chartPoints, setChartPoints] = useState<ChartDataPoint[]>([]);
    const [error, setError] = useState<string | null>(null);

    const options = {
        elements: {
            point: {
                radius: 0
            }
        }, scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        plugins: {
            filler: {
                propagate: true
            },
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    useEffect(() => {
        const fetchMfDetails = async () => {
            try {
                const response = await get(endpoints.getMfHomeChart + "?mf=" + fundCode);
                if (response) {
                    setChartData(response.chart);
                    setChartPoints(response.chart.points);
                } else {
                    setError("No data found");
                }

            } catch (error) {
                console.error("Error fetching MF details", error);
                setError("Error fetching data");
            }
        };

        fetchMfDetails();
    }, [fundCode]);

    console.log(chartPoints);
    const gradientFill = 'linear-gradient(to bottom, rgba(75, 192, 192, 0.2), rgba(75, 192, 192, 1))';



    return (
        <div>
            {error ? (
                <div>{error}</div>
            ) : (
                <div>
                    <h2>Price Chart</h2>
                    <Line
                        data={{
                            labels: chartPoints.map((point: any) => point.ts),
                            datasets: [{
                                label: 'Price',
                                data: chartPoints.map((point: any) => point.lp),
                                fill: false,
                                borderColor: 'rgb(34, 197, 94 )',
                                tension: 0.1,
                                backgroundColor: gradientFill
                            }]
                        }}
                        options={options}

                    />
                </div>
            )}
        </div>
    );
}
