import React from "react";

const sectionsData = [
  {
    title: "Invest in Direct Mutual Funds",
    imageSrc: "https://www.paytmmoney.com/static/images/global-landing-page/invest-options/direct.svg",
    items: [
      "Get upto 1% higher returns with direct plans",
      "No hidden charges or investment fees",
      "Switch from regular to Direct funds"
    ]
  },
  {
    title: "Invest in Stocks",
    imageSrc: "https://www.paytmmoney.com/static/images/global-landing-page/invest-options/invest.png",
    items: [
      "Online Stock Market Onboarding",
      "Manage Watchlist & Market Movers"
    ]
  },
  {
    title: "Investment Calculators",
    imageSrc: "https://www.paytmmoney.com/static/images/global-landing-page/invest-options/direct.svg",
    items: [
      "SIP Calculator: Plan your Systematic Investment",
      "Lumpsum Calculator: Estimate your one-time investment returns",
      "Retirement Calculator: Secure your future"
    ]
  }
];

export default function Invest() {
  return (
    <>
      {sectionsData.map((section, index) => (
        <section key={index} className={`py-24 ${index % 2 === 1 ? 'bg-theme-light dark:bg-darkmode-theme-light' : ''}`}>
          <div className="container">
            <div className={`row gy-5 lg:gy-0 items-center ${index % 2 === 0 ? 'flex-col-reverse lg:flex-row' : 'lg:flex-row-reverse'}`}>
              <div className={`lg:col-6 ${index % 2 === 0 ? '' : 'lg:order-1 order-2'}`}>
                <h2 className="mb-5">{section.title}</h2>

                <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`lg:col-6 ${index % 2 === 0 ? '' : 'lg:order-2 order-1'}`}>
                <img
                  alt="services-image"
                  loading="lazy"
                  width="450"
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
