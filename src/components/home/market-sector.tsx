"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

interface ChartDataItem {
  price: number;
  ts: string;
}

const ChartPage = ({
  data,
  lastPrice,
  name,
}: {
  data: ChartDataItem[];
  lastPrice: number;
  name: string;
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    const prices = data.map((item) => item.price);
    const timestamps = data.map((item) => new Date(item.ts));
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: timestamps,
            datasets: [
              {
                label: "",
                data: prices,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 3,
                pointRadius: 0,
                pointBorderColor: "red",
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            maintainAspectRatio: false,
            responsive: false,
          },
        });
      }
    }
  }, [data]);

  const lastIndex = data.length - 1;
  const prevPrice = data[lastIndex - 1]?.price || 0;
  const percentageChange = ((prevPrice - lastPrice) / prevPrice) * 100;
  const changeColor = percentageChange > 0 ? "green" : "red";

  return (
    <div className="inline-flex flex-wrap items-center group">
      <div className="px-4 max-w-sm">
        <div className="flex border-b h-full p-4 flex-col">
          <div className="flex items-center mb-3">
            <span className="indices">{name}</span>
            <canvas
              className="mr-4"
              ref={chartRef}
              id="myChart"
              style={{ width: "100px", maxHeight: "60px" }}
            ></canvas>
            <div className="grid grid-cols-1">
              <p className="indices m-0">
                {Number(lastPrice.toFixed(2)).toLocaleString("en-IN")}
              </p>

              <div
                className="inline-flex flex-wrap items-center group"
                style={{ color: changeColor }}
              >
                <span>
                  {percentageChange > 0 ? <FaCaretUp /> : <FaCaretDown />}
                </span>
                <span>{percentageChange.toFixed(2).replace("-", "")}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
