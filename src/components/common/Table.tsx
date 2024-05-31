// components/ProductTable.js

import React from "react";

interface TableProps {
  headers: string[];
  data: {
    productName: string;
    color: string;
    category: string;
    price: string;
  }[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.color}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
