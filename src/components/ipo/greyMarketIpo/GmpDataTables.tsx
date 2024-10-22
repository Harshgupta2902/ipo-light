// import { GmpDataTable } from "@/components/interfaces";
// import Link from "next/link";
// import React from "react";



// export default function GmpDataTables({ data }: { data: any }) {
// const keysToDisplay = [
//   "company_name",
//   "date",
//   "type",
//   "ipo_gmp",
//   "price",
//   "gain",
// ];
// const headers = [
//   "Company Name",
//   "Date",
//   "Type",
//   "Grey Market Price",
//   "Price",
//   "Gain",
// ];
// return (
//   <section className="pt-0">
//     <div className="container text-center">
//       <h1 className="mb-4 text-4xl">Ipo Gmp </h1>
//       <div className="rounded bg-body px-6 shadow">
//         <div className="flex flex-col">
//           <div className="-m-1.5 overflow-x-auto">
//             <div className="p-1.5 align-middle content">
//               <table className="w-full content text-sm text-left  text-gray-500">
//                 {headers && headers.length > 0 && (
//                   <thead className="text-md text-gray-700 bg-gray-50">
//                     <tr>
//                       {headers.map((header, index) => (
//                         <th key={index} className="py-2">
//                           {header}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                 )}
//                 <tbody>
//                   {data.gmp.map((item: GmpDataTable, index: number) => (
//                     <tr key={index}>
//                       {keysToDisplay.map((key) => (
//                         <td key={key} className="py-3">
//                           {key === "company_name" ? (
//                             <>
//                               <Link
//                                 style={{
//                                   textDecoration: "none",
//                                   fontSize: "medium",
//                                 }}
//                                 href={"/ipo/details/" + item.slug}
//                                 target={"_blank"}
//                               >
//                                 {item[key as keyof GmpDataTable]}
//                               </Link>
//                               <span className={`ml-8 ${item.active ? "text-[#D80027]" : ""}`}>{item.active ? "Active" : ""}</span>
//                             </>
//                           ) : (
//                             key === "type" ? (
//                               item[key as keyof GmpDataTable]?.toString().toLowerCase() === "mainline" ? (
//                                 <span className="text-[#2d75fa] font-bold">{item[key as keyof GmpDataTable]}</span>
//                               ) : (
//                                 item[key as keyof GmpDataTable]?.toString().toLowerCase() === "nse sme" ? (
//                                   <span className="text-[#9b51e0] font-bold">{item[key as keyof GmpDataTable]}</span>
//                                 ) : <span className="text-[#ff6900] font-bold">{item[key as keyof GmpDataTable]}</span>
//                               )
//                             ) : (
//                               item[key as keyof GmpDataTable]
//                             )
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// }




"use client"

import React, { useState } from "react"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { GmpDataTable } from "@/components/interfaces"

type SortConfig = {
  key: keyof GmpDataTable
  direction: "asc" | "desc" | null
}

export default function GmpDataTables({ data }: { data: any }) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", direction: null })

  const sortedData = [...data.gmp].sort((a, b) => {
    if (sortConfig.direction === null) {
      return 0
    }

    let aValue = a[sortConfig.key]
    let bValue = b[sortConfig.key]

    if (sortConfig.key === "date") {
      aValue = a.date === "Coming Soon" ? "9999" : a.date.split("-")[0]
      bValue = b.date === "Coming Soon" ? "9999" : b.date.split("-")[0]
    }

    if (sortConfig.key === "ipo_gmp" || sortConfig.key === "price") {
      aValue = aValue === "-" ? "0" : aValue?.toString()?.replace("₹", "")
      bValue = bValue === "-" ? "0" : bValue?.toString()?.replace("₹", "")
    }

    if (sortConfig.key === "gain") {
      aValue = aValue === "-" ? "0" : aValue?.toString()?.replace("%", "")
      bValue = bValue === "-" ? "0" : bValue?.toString()?.replace("%", "")
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  const requestSort = (key: keyof GmpDataTable) => {
    let direction: "asc" | "desc" | null = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof GmpDataTable) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") return <ArrowUp className="ml-2 h-4 w-4" />
      if (sortConfig.direction === "desc") return <ArrowDown className="ml-2 h-4 w-4" />
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />
  }

  return (
    <section className="pt-0">
      <div className="container text-center">
        <h1 className="mb-4 text-4xl">Ipo Gmp </h1>
        <div className="rounded bg-body px-6 ">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle content">
                <table className="w-full text-sm text-left  text-gray-500">
                  <thead className="text-xs text-gray-700">
                    <tr>
                      <th className="px-6 py-3 uppercase tracking-wider">
                        Company Name
                      </th>
                      <th className="px-6 py-3 uppercase tracking-wider">
                        <button onClick={() => requestSort("date")} className="flex items-center">
                          Date {getSortIcon("date")}
                        </button>
                      </th>
{/*                       <th className="px-6 py-3 uppercase tracking-wider">
                        Type
                      </th> */}
                      <th className="px-6 py-3 uppercase tracking-wider">
                        <button onClick={() => requestSort("ipo_gmp")} className="flex items-center">
                          Grey Market Price {getSortIcon("ipo_gmp")}
                        </button>
                      </th>
                      <th className="px-6 py-3 uppercase tracking-wider">
                        <button onClick={() => requestSort("price")} className="flex items-center">
                          Price {getSortIcon("price")}
                        </button>
                      </th>
                      <th className="px-6 py-3 uppercase tracking-wider">
                        <button onClick={() => requestSort("gain")} className="flex items-center">
                          Gain {getSortIcon("gain")}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.map((ipo, index) => (
                      <tr key={index} className={ipo.active ? "bg-green-50" : ""}>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <>
                          {ipo.company_name}
                          <span className={`ml-2 ${ipo.active ? "text-[#1ff202]" : "text-[#D80027]"}`}>
                            {ipo.active ? "Active" : "Closed"}
                          </span> 
                          </>
                          
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ipo.active ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {ipo.date}
                            </span>
                          ) : (
                            ipo.date
                          )}
                        </td>
{/*                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.type}</td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.ipo_gmp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.gain}</td>
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

  )
}
