"use client"

import React, { useState } from "react";

const ExpenseRatio = ({ expense_ratio, exitload, stampduty, taxImp, expratioList, exitLoadList }: { expense_ratio: string, exitload: string, stampduty: string, taxImp: string, expratioList: any, exitLoadList: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    const formatHistoricData = () => {
        return expratioList.map((entry: any, index: number) => {
            const startDate = new Date(entry.as_on_date);
            const endDate = index === 0 ? new Date() : new Date(expratioList[index - 1].as_on_date);
            const formattedStartDate = startDate.toLocaleDateString('en-GB');

            const formattedEndDate = endDate.toLocaleDateString('en-GB');
            const isToday = new Date().toDateString() === endDate.toDateString();
            const displayEndDate = isToday ? "Present" : formattedEndDate;
            return (
                <tr key={entry.as_on_date}>
                    <td>{formattedStartDate} - <span className={`${displayEndDate === "Present" ? "font-bold" : ""}`}>{displayEndDate}</span></td>
                    <td className="font-bold">{entry.expense_ratio}%</td>
                </tr>
            );
        });
    };


    const formatExitLoadData = () => {
        return exitLoadList.map((entry: any) => {
            const date = new Date(entry.as_on_date).toLocaleDateString('en-GB');
            return (
                <div key={entry.as_on_date} className="mb-4">
                    <h5 className="text-sm font-medium">{date}</h5>
                    <p>{entry.note}</p>

                </div>

            );
        });
    };


    return (
        <div>
            <h2 className="text-xl font-bold">Expense ratio, exit load and tax</h2>
            <br />
            <h3 className="text-base">Expense ratio: {expense_ratio}%</h3>
            <p>Inclusive of GST</p>
            <br />
            <h3 className="text-base">Exit load</h3>
            <p>{exitload}</p>
            <br />
            <h3 className="text-base">Stamp duty</h3>
            <p>{stampduty}</p>
            <br />
            <h3 className="text-base">Tax implication</h3>
            <p>{taxImp}</p>
            <button
                onClick={toggleModal}
                className="text-green-500 block bg-blue-700 font-medium rounded-lg text-sm py-2.5 text-center"
                type="button"
            >
                Check Past Expense Ratio
            </button>
            <br />



            {isModalOpen && (
                <div
                    id="popup-modal"
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-opacity-50 backdrop-blur-md"
                >
                    <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
                        <div className="absolute inset-0 backdrop-blur-md" />
                        <div className="relative z-10 h-[40vh] max-h-[80vh] overflow-y-auto p-4 md:p-5">
                            <button
                                type="button"
                                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                onClick={toggleModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <h3 className="text-lg font-bold mb-4">Past expense ratio & exit load</h3>
                            <div className="mb-4">
                                <ul className="flex border-b">
                                    <li
                                        className={`mr-2 cursor-pointer px-4 py-2 ${activeTab === "1" ? "border-b-2 text-green-600" : "text-gray-600"}`}
                                        onClick={() => setActiveTab("1")}
                                    >
                                        Expense Ratio
                                    </li>
                                    <li
                                        className={`mr-2 cursor-pointer px-4 py-2 ${activeTab === "2" ? "border-b-2 text-green-600" : "text-gray-600"}`}
                                        onClick={() => setActiveTab("2")}
                                    >
                                        ExitLoad
                                    </li>
                                </ul>
                            </div>
                            {activeTab === "1" && (
                                <div className="flex flex-col">
                                    <div className="-m-1.5 overflow-x-auto">
                                        <div className="align-middle content">
                                            <table className="w-full border-0 rounded-sm text-sm text-left">
                                                <tbody>
                                                    {formatHistoricData()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>s
                                </div>
                            )}
                            {activeTab === "2" && (
                                <div className="text-sm">
                                    {formatExitLoadData()}
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            )}


            {/* {isModalOpen && (
                <div
                    id="popup-modal"
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-800 bg-opacity-50 "
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <button
                                type="button"
                                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                onClick={toggleModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <h3 className="text-lg font-normal">Expense Ratio</h3>
                                <table className="w-full text-sm text-left  text-gray-500">
                                    <tbody>
                                        {formatHistoricData()}
                                        {/* {expratioList.map((item: any, index: number) => (
                                            <tr key={index}>
                                                {keysToDisplay.map((key) => (
                                                    <td key={key} className="py-3">
                                                        {key === "title" ? `${item[key]}` : (
                                                            item[key] === null ? "NA%" : `${item[key]?.toFixed(2)}%`
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))} */}

        </div>
    );
}

export default ExpenseRatio;

const keysToDisplay = [
    "as_on_date",
    "expense_ratio"
];