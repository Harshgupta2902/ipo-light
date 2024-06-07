
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
    "close_date",
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
    "CloseDate",
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
                    {data.ipo_subscription_data.map(
                      (item: SubsCriptionDataTables, index: number) => (
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