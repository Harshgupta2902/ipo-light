
import Link from "next/link";
import React from "react";

interface SubsCriptionDataTables {
  id: string;
  ipo_name: string;
  date: string;
  type: string;
  ipo_gmp: string;
  price: string;
  gain: string;
  kostak: string;
  subject: string;
  link: string;
  updated_at: string;
  slug: string;
}

export default function SubsCriptionDataTables({ data }: { data: any }) {
  const keysToDisplay = [
    "company_name",
    "close",
    "size_rs_cr",
    "qib_x",
    "snii_x",
    "bnii_x",
    "nii_x",
    "retail_x",
    "employee_x",
    "others_x",
    "total_x",
    "applications",
  ];
  const headers = [
    "Company Name",
    "Close Date",
    "Size (in Cr.)",
    "QIB",
    "SNII",
    "BNII",
    "NII",
    "Retail",
    "Empoyee",
    "Others",
    "Total",
    "No. of Aplications",
  ];



  return (
    <section className="pt-20">
      <div className="container text-center">
        <h3 className="mb-4">Ipo Subscription </h3>

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
                    {data.ipo_subscription_data.map(
                      (item: SubsCriptionDataTables, index: number) => (
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
                                  {item[key as keyof SubsCriptionDataTables]}
                                </Link>
                              ) : (
                                item[key as keyof SubsCriptionDataTables]
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
