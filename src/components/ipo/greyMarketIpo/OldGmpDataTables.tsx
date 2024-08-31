"use client";

import { OldGmpDataTable } from "@/components/interfaces";
import Link from "next/link";
import React, { useState } from "react";



export default function OldGmpDataTables({ data }: { data: any }) {
  const [itemsToShow, setItemsToShow] = useState(10);
  const keysToDisplay = ["company_name", "price", "ipo_gmp", "listed"];
  const headers = ["Company Name", "Price", "GMP", "Listed"];

  const loadMore = () => {
    setItemsToShow((prev) => prev + 20);
  };

  return (
    <section className="pt-1">
      <div className="container text-center">
        <h1 className="mb-4 text-4xl">Old Ipo Gmp </h1>


        <div className="rounded bg-body py-6 px-6 shadow">
          <div className="flex flex-col">
            <div className="-m-1.5 -m-1.5 overflow-x-auto ">
              <div className="p-1.5 align-middle content">
                <table className="w-full text-sm text-left  text-gray-500">
                  {headers && headers.length > 0 && (
                    <thead className="text-xs text-gray-700 bg-gray-50 ">
                      <tr>
                        {headers.map((header, index) => (
                          <th key={index} className="py-2">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {data.oldGmp
                      .slice(0, itemsToShow)
                      .map((item: OldGmpDataTable, index: number) => (
                        <tr key={index}>
                          {keysToDisplay.map((key) => (
                            <td key={key} className="py-3">
                              {key === "company_name" ? (
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "medium",
                                  }}
                                  href={"/ipo/details/" + item.slug}
                                  target={"_blank"}
                                >
                                  {item[key as keyof OldGmpDataTable]}
                                </Link>
                              ) : (
                                item[key as keyof OldGmpDataTable]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {itemsToShow < data.oldGmp.length && (
                <button onClick={loadMore} className="mt-4 btn btn-primary">
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
