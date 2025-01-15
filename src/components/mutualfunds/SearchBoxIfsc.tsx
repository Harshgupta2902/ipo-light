"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
const fetchIFSCSuggestions = async (query: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const response = await fetchIfsc(query);
  return response.data;
};

const fetchIfsc = async (ifsc: string) => {
  try {
    const response = await fetch(
      `https://ifsc-finder-api.vercel.app/app/search?ifsc=${ifsc}`
    );
    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching GmpIpo", error);
    throw error;
  }
};

const IFSCSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetch = useDebouncedCallback(async (value: string) => {
    if (value.length >= 7) {
      setIsLoading(true);
      try {
        const results = await fetchIFSCSuggestions(value);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setQuery(value);
    debouncedFetch(value);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.Ifsc);
    setSuggestions([]);
  };

  return (
    <div className="tabs text-center w-full">
      <div className="mt-3">
        <div id="ifsc" role="tabpanel" className="block">
          <div className="mx-auto max-w-2xl sm:flex sm:space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 ">
            <div className="w-full pb-2 sm:pb-0 relative">
              <input
                className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:border-none"
                type="text"
                maxLength={11}
                placeholder="Enter IFSC Code"
                value={query}
                onChange={handleInputChange}
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
          {suggestions.length > 0 && (
            <div className="mt-2 mx-10 rounded-lg text-left border bg-card text-base shadow-sm">
              <ul>
                {suggestions.map((suggestion) => (
                  <Link
                    href={`ifsc-code/${suggestion.STATE.toLowerCase().replaceAll(
                      " ",
                      "-"
                    )}/${suggestion.CITY.toLowerCase().replaceAll(
                      " ",
                      "-"
                    )}/${suggestion.BANK.toLowerCase().replaceAll(" ", "-")}/${
                      suggestion.IFSC
                    }`}
                  >
                    <li
                      className={"my-4 px-4"}
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center">
                        {/* <div className="flex-shrink-0">
                                                    <img
                                                        src={`/Banks/${suggestion.BANK}.png`}
                                                        alt={`${suggestion.Bank}`}
                                                        className="w-8 h-8 mr-4 rounded-full"
                                                    />
                                                </div> */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {suggestion.IFSC}
                          </p>
                          <p className="text-sm text-gray-500">
                            {suggestion.BRANCH}, {suggestion.STATE}
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
      </div>
    </div>
  );
};

export default IFSCSearch;
