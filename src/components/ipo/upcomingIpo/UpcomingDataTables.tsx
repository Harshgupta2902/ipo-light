import { UpcomingDataTables } from "@/components/interfaces";
import Link from "next/link";
import React from "react";

const sortEntriesByDate = (entries: any) => {
  return entries.sort((a: { date: string; }, b: { date: string; }) => {
    const endDateA = getDateRangeEnd(a.date);
    const endDateB = getDateRangeEnd(b.date);

    // Handle cases where end dates are null
    if (!endDateA) return 1; // Move invalid dates to the end
    if (!endDateB) return -1; // Move invalid dates to the end


    console.log(`endDateA:::${endDateA}  endDateB:::::${endDateB}`);

    return endDateB.getTime() - endDateA.getTime(); // Sort in descending order
  });
};


const getDateRangeEnd = (dateString: string): Date | null => {
  const [dateRange] = dateString.split(" "); // Get the first part of the date range
  const dates = dateRange.split('-');

  // If the date range is not valid, return null
  if (dates.length !== 2) return null;

  const endDateString = dates[1].trim(); // Get the end date part and trim any whitespace
  const [day, month] = endDateString.split(' ');

  // Map month names to numbers
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sept: 8, // Adjusted to be "Sept" instead of "September"
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const monthIndex = monthMap[month];
  if (monthIndex === undefined) return null; // If month is invalid, return null

  // Create a Date object using the month index, day, and a default year
  const endDate = new Date(2024, monthIndex, parseInt(day, 10)); // Adjust year as needed

  return endDate;
};

export default function UpcomingDataTable({ data }: { data: any }) {
  const keysToDisplay = ["company_name", "date", "type", "size", "priceband"];
  const headers = ["Company Name", "Date", "Type", "Size", "Price Band"];

  const sortedEntries = sortEntriesByDate(data.upcomingIpos);


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
                      {sortedEntries.map(
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
