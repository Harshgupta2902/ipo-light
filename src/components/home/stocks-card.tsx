"use client";

import { useState, useRef } from "react";
import GainersCard from "./gainers";

// src/types/stocks.ts
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  sid: string;

}

export interface StocksCardProps {
  gainers: StockData[];
  losers: StockData[];
  active: StockData[];
  approachingHigh: StockData[];
  approachingLow: StockData[];
}


const StocksCard: React.FC<StocksCardProps> = ({ gainers, losers, active, approachingHigh, approachingLow }) => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>("gainers");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  const getContent = () => {
    switch (activeMenuItem) {
      case 'gainers':
        return <GainersCard gainers={gainers} />;
      case 'losers':
        return <GainersCard gainers={losers} />;
      case 'active':
        return <GainersCard gainers={active} />;
      case 'approachingHigh':
        return <GainersCard gainers={approachingHigh} />;
      case 'approachingLow':
        return <GainersCard gainers={approachingLow} />;
      default:
        return null;
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-wrap mt-0">
          {[
            { name: "Top Gainers", route: "gainers" },
            { name: "Top Losers", route: "losers" },
            { name: "Most Active", route: "active" },
            { name: "52-W High", route: "approachingHigh" },
            { name: "52-W Low", route: "approachingLow" },
          ].map((item) => (
            <div className="inline-flex flex-wrap group" key={item.name}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuItemClick(item.route);
                }}
                className={`flex-1 rounded-md bg-theme-light px-4 mr-4 my-2 py-2 text-sm text-dark ${activeMenuItem === item.route ? "active" : ""
                  }`}
              >
                {item.name.replace(/([A-Z])/g, " $1").trim()}
              </a>
            </div>
          ))}
        </div>

        <div ref={contentRef}>
          {getContent()}
        </div>
      </div>
    </section>
  );
}

export default StocksCard;
