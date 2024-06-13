"use client";

import Link from "next/link";
import React, { useState } from "react";

interface OldGmpDataTables {
  id: string;
  ipo_name: string;
  price: string;
  ipo_gmp: string;
  listed: string;
  link: string;
  updated_at: string;
  slug: string;
}

export default function OldGmpDataTables({ data }: { data: any }) {
  const [itemsToShow, setItemsToShow] = useState(10);
  const keysToDisplay = ["ipo_name", "price", "ipo_gmp", "listed"];
  const headers = ["Company Name", "Price", "GMP", "Listed"];

  const loadMore = () => {
    setItemsToShow((prev) => prev + 20);
  };

  return (
    <section className="pt-20">
      <div className="container text-center">
        <h3 className="mb-4">Old Ipo Gmp </h3>

        <div className="rounded bg-body py-6 px-6 shadow">
          <div className="flex flex-col">
            <div className="-m-1.5 -m-1.5 overflow-x-auto ">
              <div className="p-1.5  align-middle">
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
                      .map((item: OldGmpDataTables, index: number) => (
                        <tr key={index}>
                          {keysToDisplay.map((key) => (
                            <td key={key} className="py-3">
                              {key === "ipo_name" ? (
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "medium",
                                  }}
                                  href={"ipo/" + item.slug}
                                  target={"_blank"}
                                  rel="noopener"
                                >
                                  {item[key as keyof OldGmpDataTables]}
                                </Link>
                              ) : (
                                item[key as keyof OldGmpDataTables]
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
