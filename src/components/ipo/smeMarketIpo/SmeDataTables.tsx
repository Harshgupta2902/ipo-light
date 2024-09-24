
import { SmeDataTables } from "@/components/interfaces";
import Link from "next/link";
import React from "react";



export default function SmeDataTable({ data }: { data: any }) {
  const keysToDisplay = ["company_name", "date", "price", "Platform"];
  const headers = ["Company Name", "Date", "Price", "Platform"];



  return (
    <section className="pt-0">
      <div className="container text-center">
        <h1 className="mb-4 text-4xl">SME Ipo's </h1>

        <div className="rounded bg-body py-6 px-6 shadow">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto content">
              <div className="p-1.5 align-middle">
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
                    {data.smeData.map(
                      (item: SmeDataTables, index: number) => (
                        <tr key={index}>
                          {keysToDisplay.map((key) => (
                            <td key={key} className="p-3">
                              {key === "company_name" ? (
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "medium",
                                    margin: "12px"
                                  }}
                                  href={"/ipo/details/" + item.slug}
                                  target={"_blank"}

                                >
                                  {item[key as keyof SmeDataTables]}
                                </Link>
                              ) : (
                                key === "Platform" ? (
                                  item[key as keyof SmeDataTables]?.toLowerCase() === "mainline" ? (
                                    <span className="text-[#2d75fa] font-bold">{item[key as keyof SmeDataTables]}</span>
                                  ) : (
                                    item[key as keyof SmeDataTables]?.toLowerCase() === "nse sme" ? (
                                      <span className="text-[#9b51e0] font-bold">{item[key as keyof SmeDataTables]}</span>
                                    ) : <span className="text-[#ff6900] font-bold">{item[key as keyof SmeDataTables]}</span>
                                  )
                                ) : (
                                  item[key as keyof SmeDataTables]
                                )
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
