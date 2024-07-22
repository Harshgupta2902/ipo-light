import { UpcomingDataTables } from "@/components/interfaces";
import Link from "next/link";
import React from "react";



export default function UpcomingDataTable({ data }: { data: any }) {
  const keysToDisplay = ["company_name", "date", "size", "price", "status"];
  const headers = ["Company Name", "Date", "Size", "Price", "Status"];

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
                                    rel="noopener"
                                  >
                                    {item[key as keyof UpcomingDataTables]}
                                  </Link>
                                ) : (
                                  item[key as keyof UpcomingDataTables]
                                )}

                                {/* {key === "company_name" ? (
                                <Link
                                  prefetch={false}
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "medium",
                                  }}
                                  href={"/ipo/details/" + item.link.replaceAll("https://ipowatch.in/", "")}
                                  target={"_blank"}
                                  rel="noopener"
                                >
                                  {item[key as keyof UpcomingDataTables]}
                                </Link>
                              ) : (
                                item[key as keyof UpcomingDataTables]
                              )} */}
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
