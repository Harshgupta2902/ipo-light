import { BuyBackDataTable } from "@/components/interfaces";
import Link from "next/link";
import React from "react";

export default function BuyBackDataTables({ data }: { data: any }) {
  const keysToDisplay = ["companyName", "recordDate", "issueOpen", "issueClose", "buybackPrice", "currentMarketPrice", "issueSizeShares", "issueSizeAmount"];
  const headers = ["Company Name", "Record Date", "Open", "Close", "Buyback Price", "Current Price", "Issued Shares", "Issue Amount"];
  return (
    <section className="pt-0">
      <div className="container text-center">
        <h1 className="mb-4 text-4xl">Ipo Buy-back </h1>
        <div className="rounded bg-body px-6 shadow">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto content">
              <div className="p-1.5 align-middle content">
                <table className="w-full text-sm text-left  text-gray-500 ">
                  {headers && headers.length > 0 && (
                    <thead className="text-md text-gray-700 bg-gray-50 ">
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
                    {data.buyback.map(
                      (item: BuyBackDataTable, index: number) => (
                        <tr key={index}>
                          {keysToDisplay.map((key) => (
                            <td key={key} className="py-3">
                              {key === "companyName" ? (
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "medium",
                                  }}
                                  href={"/ipo/details/" + item.slug}
                                  target={"_blank"}

                                >
                                  {item[key as keyof BuyBackDataTable]}
                                </Link>
                              ) : (
                                item[key as keyof BuyBackDataTable]
                              )}
                            </td>
                          ))}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );


}
