"use client"

import React, { useState, useEffect, useRef } from 'react';
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
    const chartRef = useRef<any>(null); // Explicitly typing chartRef as any

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
                enabled: true,
                intersect: false,
                mode: 'index',
                callbacks: {
                    label: function (tooltipItem: any) {
                        let label = tooltipItem.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.formattedValue;
                        return label;
                    },
                    title: function (tooltipItems: any, data: any) {
                        const timestamp = tooltipItems[0].label;
                        const date = new Date(timestamp);
                        return `Date: ${date.toLocaleDateString()}`;
                    }
                }
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
    return (
        <div>
            {error ? (
                <div>{error}</div>
            ) : (
                <div>
                    <h2>Price Chart</h2>
                    <Line
                        ref={chartRef}
                        data={{
                            labels: chartPoints.map((point) => point.ts),
                            datasets: [{
                                label: 'Price',
                                data: chartPoints.map((point) => point.lp),
                                fill: true,
                                borderColor: 'rgb(34, 197, 94)',
                                tension: 0.1,
                                backgroundColor: 'rgba(34, 197, 94, 0.2)'
                            }]
                        }}
                        // options={options}
                    />
                </div>
            )}
        </div>
    );
}
