import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-sm text-center">
      <div className="container">
        <div className="row justify-center">
          <div className="sm:col-10 md:col-8 lg:col-6">
            <span className="text-[8rem] block font-bold text-dark">
              404
            </span>
            <h1 className="h2 mb-4">Page not found</h1>
            <div className="content">
              <p>
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>
            </div>
            <Link
              className="btn btn-primary"
              href={"/"}
              target={"_blank"}
              rel="noopener"
              prefetch={false}
            >
              {"Back To Home"}
            </Link>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
