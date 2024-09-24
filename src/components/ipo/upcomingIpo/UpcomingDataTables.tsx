import { UpcomingDataTables } from "@/components/interfaces";
import Link from "next/link";
import React from "react";



export default function UpcomingDataTable({ data }: { data: any }) {
  const keysToDisplay = ["company_name", "date", "type", "size", "priceband"];
  const headers = ["Company Name", "Date", "Type", "Size", "Price Band"];

  return (
    <section className="pt-0">
      <div className="container text-center">
        <h1 className="mb-4 text-4xl">Upcoming Ipo's </h1>
        <div className="content">
          <div className="rounded bg-body px-6 shadow">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto ">
                <div className="p-1.5 align-middle ">
                  <table className="w-full text-sm text-left  text-gray-500 ">
                    {headers && headers.length > 0 && (
                      <thead className="text-md text-gray-700 bg-gray-50">
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
                      {data.upcomingIpos.map(
                        (item: UpcomingDataTables, index: number) => (
                          <tr key={index}>
                            {keysToDisplay.map((key) => (
                              <td key={key} className="py-3">
                                {key === "company_name" ? (
                                  <Link
                                    prefetch={false}
                                    style={{
                                      textDecoration: "none",
                                      fontSize: "medium",
                                    }}
                                    href={"/ipo/details/" + item.slug}
                                    target={"_blank"}

                                  >
                                    {item[key as keyof UpcomingDataTables]}
                                  </Link>
                                ) : (
                                  key === "type" ? (
                                    item[key as keyof UpcomingDataTables]?.toLowerCase() === "mainline" ? (
                                      <span className="text-[#2d75fa] font-bold">{item[key as keyof UpcomingDataTables]}</span>
                                    ) : (
                                      item[key as keyof UpcomingDataTables]?.toLowerCase() === "nse sme" ? (
                                        <span className="text-[#9b51e0] font-bold">{item[key as keyof UpcomingDataTables]}</span>
                                      ) : <span className="text-[#ff6900] font-bold">{item[key as keyof UpcomingDataTables]}</span>
                                    )
                                  ) : (
                                    item[key as keyof UpcomingDataTables]
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

      </div>
    </section>
  );
}
