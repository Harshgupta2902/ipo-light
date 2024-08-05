"use client"

import Image from "next/image";
import React from "react";

const sectionsData = [
  {
    title: "Mutual Funds - Maximize Your Returns",
    imageSrc: "/home/mf.png",
    items: [
      "Get up to 12% Higher Returns with Direct Plans",
      "No Hidden Charges or Investment Fees",
      "Switch from Regular to Direct Mutual Funds",
    ],
    buttonText: "Start Investing Now",
    buttonUrl: "/mutualfunds",
  },
  {
    title: "IPO - Initial Public Offering Insights",
    imageSrc: "/home/ipo.png",
    items: [
      "Comprehensive IPO Information",
      "Subscribe to Upcoming IPOs",
      "Track and Analyze IPO Performance",
      "Stay Updated on Latest IPO News",
    ],
    buttonText: "Check Latest IPO",
    buttonUrl: "/ipo",
  },
  {
    title: "Investment Calculators - Plan Your Finances",
    imageSrc: "/home/calculator.png",
    items: [
      "SIP Calculator: Plan Your Systematic Investments",
      "Lumpsum Calculator: Estimate Your One-Time Investment Returns",
      "Retirement Calculator: Secure Your Future",
    ],
    buttonText: "Calculate Now",
    buttonUrl: "/calculators",
  },
];

export default function Invest() {
  return (
    <>
      {sectionsData.map((section, index) => (
        <section
          key={index}
          className={`py-14 ${index % 2 === 1 ? "" : "bg-theme-light"}`}
        >
          <div className="container">
            <div
              className={`row gy-5 lg:gy-0 items-center ${index % 2 === 0
                ? "flex-col-reverse lg:flex-row"
                : "lg:flex-row-reverse"
                }`}
            >
              <div
                className={`lg:col-6 ${index % 2 === 0 ? "" : "lg:order-1 order-2"
                  }`}
              >
                <h2 className="mb-5">{section.title}</h2>

                <ul className="max-w-md space-y-1 text-gray-500 list-inside ">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 me-2 text-green-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <span style={{ color: "#343434" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className="btn btn-outline-primary mt-4"
                  href={section.buttonUrl}
                  aria-label={section.buttonText}
                >
                  {section.buttonText}
                </a>
              </div>
              <div
                className={`lg:col-6 ${index % 2 === 0 ? "" : "lg:order-2 order-1"
                  }`}
              >
                <Image
                  alt="services-image"
                  loading="lazy"
                  width="450"
                  height="450"
                  style={{ mixBlendMode: "multiply" }}
                  decoding="async"
                  data-nimg="1"
                  src={section.imageSrc}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
