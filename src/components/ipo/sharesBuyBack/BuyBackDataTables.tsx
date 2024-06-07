import Link from "next/link";
import React from "react";

interface BuyBackDataTables {
  id: string
  company_name: string
  record_date: string
  open: string
  link: string
  slug: string
  close: string
  price: string
  updated_at: string
}

export default function BuyBackDataTables({ data }: { data: any }) {
  const keysToDisplay = ["company_name", "record_date", "open", "close", "price"];
  const headers = ["Company Name", "Record Date", "Open", "Close", "Price"];

  return (
    <section className="pt-20">
      <div className="container text-center">
        <h3 className="mb-4">Upcoming Ipo's </h3>

        <div className="rounded bg-body py-6 px-6 shadow">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 align-middle">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  {headers && headers.length > 0 && (
                    <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                      (item: BuyBackDataTables, index: number) => (
                        <tr key={index}>
                          {keysToDisplay.map((key) => (
                            <td key={key} className="py-3">
                              {key === "company_name" ? (
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "medium",
                                  }}
                                  href={"ipo/" + item.slug}
                                  target={"_blank"}
                                  rel="noopener"
                                >
                                  {item[key as keyof BuyBackDataTables]}
                                </Link>
                              ) : (
                                item[key as keyof BuyBackDataTables]
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
