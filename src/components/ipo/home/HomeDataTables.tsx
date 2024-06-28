import React from "react";
import Link from "next/link";
import { IpoData, Props } from "@/components/interfaces";


const UpcomingIpo: React.FC<Props> = ({ data }) => {
  const keystoshow = ["company_name", "open", "close"];
  const headers = ["Company Name", "Open", "Close"];
  return (
    <section>
      <div className="container">
        <div className="content">
          <div className="row justify-center text-left">
            <div className="lg:col-6 md:col-6 mb-8 text-center">
              <h3 className="mb-4">Upcoming Ipo's</h3>
              <div className="relative overflow-x-auto">
                <table className="lg:w-full text-sm text-left text-gray-500 ">
                  {headers && headers.length > 0 && (
                    <thead className="text-md text-gray-700 bg-gray-50 ">
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
                    {data.upcomingData.map((item, index) => (
                      <tr key={index}>
                        {keystoshow.map((key) => (
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
                                {item[key as keyof IpoData]}
                              </Link>
                            ) : (
                              item[key as keyof IpoData]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-6 md:col-6 mb-8 text-center">
              <h3 className="mb-4">SME Ipo's</h3>
              <div className="relative overflow-x-auto">
                <table className="lg:w-full text-sm text-left text-gray-500 ">
                  {headers && headers.length > 0 && (
                    <thead className="text-md text-gray-700 bg-gray-50  ">
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
                    {data.smeData.map((item, index) => (
                      <tr key={index}>
                        {keystoshow.map((key) => (
                          <td key={key} className="py-3">
                            {key === "Company" ? (
                              <Link
                                style={{
                                  textDecoration: "none",
                                  fontSize: "medium",
                                }}
                                href={"/ipo/details/" + item.slug}
                                target={"_blank"}
                                rel="noopener"
                              >
                                {item[key as keyof IpoData]}
                              </Link>
                            ) : (
                              item[key as keyof IpoData]
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
};
export default UpcomingIpo;
