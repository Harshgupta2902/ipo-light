"use client";
import { endpoints } from "@/api/endpoints";
import Link from "next/link";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
const fecthPinCodeSuggestions = async (query: string): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await fetchPinCode(query);
    return response;
};

const fetchPinCode = async (ifsc: string) => {
    try {
        const response = await fetch(`${endpoints.getPincode}?pincode=${ifsc}`);
        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching GmpIpo", error);
        throw error;
    }
};


const fetchPinCodeDetails = async (
    state?: string,
    city?: string,
    bank?: string
) => {
    try {
        let url = `${endpoints.getPincode}`;

        if (state) {
            url += `?state=${state}`;
        }

        if (city) {
            url += `&district=${city}`;
        }

        if (bank) {
            url += `&office=${bank}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching GmpIpo", error);
        throw error;
    }
};

const SearchBoxPincode: React.FC = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("pincode");
    const [selectedState, setSelectedState] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedBank, setSelectedBank] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);
    const [banks, setBanks] = useState<string[]>([]);
    const [allData, setAllData] = useState<any[]>([]);

    const debouncedFetch = useDebouncedCallback(async (value: string) => {
        if (value.length > 5) {
            try {
                const results = await fecthPinCodeSuggestions(value);
                setSuggestions(results);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            } finally {
            }
        } else {
            setSuggestions([]);
        }
    }, 300);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFetch(value);
    };

    const handleSuggestionClick = (suggestion: any) => {
        setQuery(suggestion.Ifsc);
        setSuggestions([]);
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleStatehange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedState = event.target.value;
        setSelectedState(selectedState);
        console.log("Selected state:", selectedState);
        setSelectedBank("");
        setBanks([]);
        setSelectedCity("");
        setCities([]);
        try {
            const cities = await getData(selectedState);
            setCities(cities);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleCitiesChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        console.log("Selected City:", selectedCity);
        setSelectedBank("");
        setBanks([]);

        try {
            const banks = await getData(selectedState, selectedCity);
            setBanks(banks);
        } catch (error) {
            console.error("Error fetching banks:", error);
        }
    };

    const handleBankChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedBank = event.target.value;
        setSelectedBank(selectedBank);
        console.log("Selected Bank:", selectedBank);

        try {
            const allData = await getData(selectedState, selectedCity, selectedBank);
            setAllData(allData);
        } catch (error) {
            console.error("Error fetching all data:", error);
        }
    };

    const getData = async (state?: string, city?: string, bank?: string) => {
        return await fetchPinCodeDetails(state, city, bank);
    };

    return (
        <div className="tabs text-center w-full">
            <div className="flex justify-center">
                <ul className="flex border border-gray-200 mb-4 rounded-xl transition-all duration-300 -mb-px overflow-hidden">
                    <li>
                        <a
                            onClick={() => handleTabClick("pincode")}
                            className={`inline-block py-1 px-12 text-gray-500 hover:text-gray-800 font-medium border-r ${activeTab === "pincode" ? "bg-indigo-50 text-indigo-600 active" : ""} border-gray-200 tablink whitespace-nowrap`}
                            role="tab"
                            aria-selected={activeTab === "pincode"}
                            aria-controls="pincode"
                        >
                            By PinCode
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => handleTabClick("bank")}
                            className={`inline-block py-1 px-12 text-gray-500 hover:text-gray-800 font-medium border-r ${activeTab === "bank" ? "bg-indigo-50 text-indigo-600 active" : ""} border-gray-200 tablink whitespace-nowrap`}
                            role="tab"
                            aria-selected={activeTab === "bank"}
                            aria-controls="bank"
                        >
                            By Location
                        </a>
                    </li>
                </ul>
            </div>
            <div className="mt-3">
                <div
                    id="pincode"
                    role="tabpanel"
                    className={activeTab === "pincode" ? "block" : "hidden"}
                >
                    <div className="mx-auto max-w-2xl sm:flex sm:space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 ">
                        <div className="w-full pb-2 sm:pb-0">
                            <input
                                className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:border-none"
                                type="number"
                                placeholder="Enter Pin-Code"
                                value={query}
                                onChange={handleInputChange} />
                        </div>

                    </div>
                    {suggestions.length > 0 && (
                        <div className="mt-2 mx-10 rounded-lg text-left border bg-card text-base shadow-sm">
                            <ul>
                                {suggestions.map((suggestion) => (
                                    <Link
                                        href={`pincode-finder/${suggestion.State.toLowerCase().replaceAll(
                                            " ",
                                            "-"
                                        )}/${suggestion.District.toLowerCase().replaceAll(
                                            " ",
                                            "-"
                                        )}/${suggestion.Taluk.toLowerCase().replaceAll(
                                            " ",
                                            "-"
                                        )}/${suggestion.PostOffice.toLowerCase().replaceAll(
                                            " ",
                                            "-"
                                        )}`}
                                    >
                                        <li
                                            className={"my-4 px-4"}
                                            key={suggestion.id}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <div className="flex items-center">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {`${suggestion.PostOffice} (${suggestion.PinCode})`}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {suggestion.Taluk}, {suggestion.District}, {suggestion.State}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div
                    id="bank"
                    className={activeTab === "bank" ? "block" : "hidden"}
                    role="tabpanel"
                >
                    <div className="flex mb-16 flex-col sm:flex-row gap-3 mx-auto w-full sm:flex sm:space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
                        <select className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                            onChange={handleStatehange}
                            value={selectedState}
                        >
                            <option value="" disabled>
                                Select State
                            </option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <select className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg"

                            onChange={handleCitiesChange}
                            value={selectedCity}
                        >
                            <option value="" disabled>
                                Select City
                            </option>
                            {cities.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <select className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg"
                            onChange={handleBankChange}
                            value={selectedBank}
                        >
                            <option value="" disabled>
                                Select Taluk
                            </option>
                            {banks.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="row">
                        {allData.map((data, index) => (
                            <div key={index} className="mb-4 md:col-4 lg:col-3">
                                <Link
                                    href={`pincode-finder/${data.State.toLowerCase().replaceAll(
                                        " ",
                                        "-"
                                    )}/${data.District.toLowerCase().replaceAll(
                                        " ",
                                        "-"
                                    )}/${data.Taluk.toLowerCase().replaceAll(
                                        " ",
                                        "-"
                                    )}/${data.PostOffice.toLowerCase().replaceAll(
                                        " ",
                                        "-"
                                    )}`}
                                >
                                    <div className="flex flex-col border rounded-sm hover:shadow px-8 py-4 ">
                                        <div className="flex">
                                            <div className="flex-1 min-w-0 text-left">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {data.PostOffice}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {data.District}, {data.State}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBoxPincode;

const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
]
    ;
