"use client"
import { endpoints } from '@/api/endpoints';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce'
const fetchIFSCSuggestions = async (query: string): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const response = await fetchIfsc(query);
    return response;
}


const fetchIfsc = async (ifsc: string) => {
    try {
        const response = await fetch(`${endpoints.getIfsc}/${ifsc}`);
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
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const debouncedFetch = useDebouncedCallback(async (value: string) => {
        if (value.length > 3) {
            setIsLoading(true)
            try {
                const results = await fetchIFSCSuggestions(value)
                setSuggestions(results)
            } catch (error) {
                console.error('Error fetching suggestions:', error)
                setSuggestions([])
            } finally {
                setIsLoading(false)
            }
        } else {
            setSuggestions([])
        }
    }, 300)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        debouncedFetch(value)
    }

    const handleSuggestionClick = (suggestion: any) => {
        setQuery(suggestion.Ifsc)
        setSuggestions([])
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <div className="relative ">
                <input
                    type="text"
                    placeholder="Enter IFSC Code"
                    value={query}
                    onChange={handleInputChange}
                    className="rounded-full border-2 shadow hover:border-transparent active:outline-none"
                />
                {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                    </div>
                )}
            </div>
            {suggestions.length > 0 && (
                <div className="mt-2 mx-10 rounded-lg text-left border bg-card text-base shadow-sm">
                    <ul className="">
                        {suggestions.map((suggestion) => (
                            <Link href={`ifsc-code/${suggestion.State.toLowerCase().replaceAll(" ", "-")}/${suggestion.City1.toLowerCase().replaceAll(" ", "-")}/${suggestion.Bank.toLowerCase().replaceAll(" ", "-")}/${suggestion.Ifsc}`}>
                                <li className={"my-4 px-4"} key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                                    <strong>{suggestion.Bank}</strong> - {suggestion.Ifsc} <br />
                                    {suggestion.Branch},{" "}{suggestion.State}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default IFSCSearch;
