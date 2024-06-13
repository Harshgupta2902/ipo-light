
import Link from "next/link";
import React from "react";

interface SmeDataTables {
  id: string;
  name: string;
  Dates: string;
  Price: string;
  Platform: string;
  link: string;
  updated_at: string;
  slug: string;
}

export default function SmeDataTables({ data }: { data: any }) {
  const keysToDisplay = ["name", "Dates", "Price", "Platform"];
  const headers = ["Company Name", "Date", "Price", "Platform"];



  return (
    <section className="pt-20">
      <div className="container text-center">
        <h3 className="mb-4">Upcoming Ipo's </h3>

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
                    {data.sme.map(
                      (item: SmeDataTables, index: number) => (
                        <tr key={index}>
                          {keysToDisplay.map((key) => (
                            <td key={key} className="py-3">
                              {key === "name" ? (
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "medium",
                                  }}
                                  href={"ipo/details/" + item.slug}
                                  target={"_blank"}
                                  rel="noopener"
                                >
                                  {item[key as keyof SmeDataTables]}
                                </Link>
                              ) : (
                                item[key as keyof SmeDataTables]
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
