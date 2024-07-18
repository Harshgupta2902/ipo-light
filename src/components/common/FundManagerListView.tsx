"use client"

import React, { useState } from "react";

const FundManagerListView = ({
  name,
  image,
  aum,
  exp,
  children,
  className,
}: {
  name: string;
  image: string;
  aum: number;
  exp: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [show, setShow] = useState(false);

  const toggleAccordion = () => {
    setShow((prev) => !prev);
  };

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className={`col-lg-8 ${className}`}>
      <div className={`fundManagerList ${show ? "active" : ""}`}>
        <button className="fundManagerList-header" onClick={toggleAccordion} aria-label={name}>
          <div 
            className="relative flex items-center gap-4 overflow-hidden text-gray-700 bg-transparent shadow-none bg-clip-border">
            <img
              src={image}
              alt={name}
              className="relative inline-block h-[58px] w-[58px] rounded-md object-cover object-center" />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <h5
                  className="block text-lg font-semibold leading-snug tracking-normal cursor-pointer text-blue-gray-900 hover:text-hover-blue">
                  {name}
                </h5>
              </div>
              <p className="block text-sm antialiased font-light text-blue-gray-900">
                {`AUM: ${formatCurrency(aum)}`}
                <span className="ml-4 text-blue-gray-500">Exp: {`${exp} years`}</span>
              </p>
            </div>
          </div>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            className={`fundManagerList-icon ${show ? "open" : ""}`}
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
            ></path>
          </svg>
        </button>
        {show && (
          <div className="fundManagerList-content">
            <p className="py-3">{children}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundManagerListView;
