"use client";

import React, { useState } from "react";

const Accordion = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="col:lg-8">
      <div className={`accordion ${show ? "active" : ""}`}>
        <button className="accordion-header" onClick={() => setShow(!show)}>
          <h5>{title}</h5>

          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            className="accordion-icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
          </svg>
        </button>
        {show && (
          <div className="accordion-content">
            <p className="py-3">{children}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
