"use client";

import { useState, useRef } from "react";
import GainersCard from "./gainers";
import { get } from "../../api/api";
import { endpoints } from "../../api/endpoints";

export default function StocksCard() {
  const [activeMenuItem, setActiveMenuItem] = useState<string>("gainers");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMenuItemClick = async (menuItem: string) => {
    console.log("Clicked index:", menuItem);

    setActiveMenuItem(menuItem);
    setLoading(true);
    setError(null);

    try {
      const response = await get(endpoints.indices);

      setData(response.data);
      console.log(response.data);
    } catch (error: any) {
      console.log("API Error: " + error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }

    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className=" flex flex-wrap mt-0">
          {[
            { name: "Top Gainers", route: "gainers" },
            { name: "Top Losers", route: "losers" },
            { name: "Most Active", route: "active" },
            { name: "52-W High", route: "approachingHigh" },
            { name: "52-W Low", route: "approachingLow" },
          ].map((item) => (
            <div className="inline-flex flex-wrap group">
              <a
                href="#"
                onClick={async (e) => {
                  e.preventDefault();
                  await handleMenuItemClick(item.route);
                }}
                className={`flex-1 rounded-md bg-theme-light px-4 mr-4 my-2 py-2 text-sm text-dark ${
                  activeMenuItem === item.name ? "active" : ""
                }`}
                key={item.name}
              >
                {item.name.replace(/([A-Z])/g, " $1").trim()}
              </a>
            </div>
          ))}
        </div>

        {activeMenuItem === "gainers" && (
          <div ref={contentRef}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && data && (
              <GainersCard gainers={data.data.gainers} />
            )}
          </div>
        )}

        {activeMenuItem === "losers" && (
          <div ref={contentRef}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && data && (
              <GainersCard gainers={data.data.losers} />
            )}
          </div>
        )}

        {activeMenuItem === "active" && (
          <div ref={contentRef}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && data && (
              <GainersCard gainers={data.data.active} />
            )}
          </div>
        )}

        {activeMenuItem === "approachingHigh" && (
          <div ref={contentRef}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && data && (
              <GainersCard gainers={data.data.approachingHigh} />
            )}
          </div>
        )}

        {activeMenuItem === "approachingLow" && (
          <div ref={contentRef}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && data && (
              <GainersCard gainers={data.data.approachingLow} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
