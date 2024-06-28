import { GmpDataTable } from "@/components/interfaces";
import Link from "next/link";
import React from "react";



export default function GmpDataTables({ data }: { data: any }) {
  const keysToDisplay = [
    "company_name",
    "date",
    "type",
    "ipo_gmp",
    "price",
    "gain",
    "kostak",
    "subject",
  ];
  const headers = [
    "Company Name",
    "Date",
    "Type",
    "Grey Market Price",
    "Price",
    "Gain",
    "Kostak",
    "Subject",
  ];
  return (
    <section className="pt-20">
      <div className="container text-center">
        <h3 className="mb-4">Ipo Gmp </h3>
        <div className="rounded bg-body py-6 px-6 shadow">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 align-middle">
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
                    {data.gmp.map((item: GmpDataTable, index: number) => (
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
                                {item[key as keyof GmpDataTable]}
                              </Link>
                            ) : (
                              item[key as keyof GmpDataTable]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
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
