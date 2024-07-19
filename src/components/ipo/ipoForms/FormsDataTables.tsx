import { FormsDataTables } from "@/components/interfaces";
import Link from "next/link";
import React from "react";



export default function FormsDataTable({ data }: { data: any }) {
  const keysToDisplay = ["company_name", "date", "bse", "nse"];
  const headers = ["Company Name", "IPO Date", "BSE Form", "NSE Form"];

  return (
    <section className="pt-20">
      <div className="container text-center">
        <h1 className="mb-4 text-4xl">Ipo Forms </h1>

        <div className="rounded bg-body py-6 px-6 shadow">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 align-middle">
                <table className="w-full text-sm text-left  text-gray-500 ">
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
                    {data.forms.map(
                      (item: FormsDataTables, index: number) => (
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
                                  rel="noopener"
                                >
                                  {item[key as keyof FormsDataTables]}
                                </Link>
                              ) : key === "nse" ? (
                                item.nse_link ? (
                                  <Link
                                    style={{
                                      textDecoration: "underline",
                                      fontWeight: "bold",
                                    }}
                                    href={item.nse_link}
                                    target={"_blank"}
                                    rel="noopener"
                                  >
                                    {item[key as keyof FormsDataTables]}
                                  </Link>
                                ) : (
                                  item[key as keyof FormsDataTables]
                                )
                              ) : key === "bse" ? (
                                item.bse_link ? (
                                  <Link
                                    style={{
                                      textDecoration: "underline",
                                      fontWeight: "bold",
                                    }}
                                    href={item.bse_link}
                                    target={"_blank"}
                                    rel="noopener"
                                  >
                                    {item[key as keyof FormsDataTables]}
                                  </Link>
                                ) : (
                                  item[key as keyof FormsDataTables]
                                )
                              ) : (
                                item[key as keyof FormsDataTables]
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
