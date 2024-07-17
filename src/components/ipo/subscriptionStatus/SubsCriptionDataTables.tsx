
import { SubsCriptionDataTables } from "@/components/interfaces";
import Link from "next/link";
import React from "react";
import { useState } from "react";



export default function SubsCriptionDataTable({ data }: { data: any }) {
  const mainBoardkeysToDisplay = [
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
  const mainBoardHeaders = [
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


  const smekeysToDisplay = [
    "company_name",
    "close",
    "size_rs_cr",
    "qib_x",
    "bnii_x",
    "nii_x",
    "retail_x",
    "total_x",
    "applications",
  ];

  const SmeHeaders = [
    "Company Name",
    "Close Date",
    "Size (in Cr.)",
    "QIB",
    "BNII",
    "NII",
    "Retail",
    "Total",
    "No. of Aplications",
  ];

  const [activeTab, setActiveTab] = useState<string>("MainBoard");


  return (
    <section className="pt-20">
      <div className="container text-center">
        <h1 className="mb-4 text-4xl">Ipo Subscription </h1>
        <div className="mb-4 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "MainBoard" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}
                onClick={() => setActiveTab("MainBoard")}
                type="button"
                role="tab"
              >
                MainBoard
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "SME" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}
                onClick={() => setActiveTab("SME")}
                type="button"
                role="tab"
              >
                SME
              </button>
            </li>
          </ul>
        </div>
        <div id="default-tab-content">
          <div className={`${activeTab === "MainBoard" ? "block" : "hidden"}`} role="tabpanel">
            <div className="rounded bg-body py-6 px-6 shadow">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 align-middle">
                    <table className="w-full text-sm text-left  text-gray-500">
                      {mainBoardHeaders && mainBoardHeaders.length > 0 && (
                        <thead className="text-xs text-gray-700 bg-gray-50 ">
                          <tr>
                            {mainBoardHeaders.map((header, index) => (
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
                              {mainBoardkeysToDisplay.map((key) => (
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
          <div className={`${activeTab === "SME" ? "block" : "hidden"}`} role="tabpanel">
            <div className="rounded bg-body py-6 px-6 shadow">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 align-middle">
                    <table className="w-full text-sm text-left  text-gray-500">
                      {SmeHeaders && SmeHeaders.length > 0 && (
                        <thead className="text-xs text-gray-700 bg-gray-50 ">
                          <tr>
                            {SmeHeaders.map((header, index) => (
                              <th key={index} className="py-2">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {data.sme_subscription_data.map(
                          (item: SubsCriptionDataTables, index: number) => (
                            <tr key={index}>
                              {smekeysToDisplay.map((key) => (
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
        </div>


      </div>
    </section>
  );

}
