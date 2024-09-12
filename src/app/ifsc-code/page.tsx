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
        <>
            <div className="max-w-2xl text-center mx-auto py-24 px-5">
                <span className="p-4 bg-violet-500 text-white inline-flex rounded-full ">
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                    >
                        <path
                            d="M6.85357 3.85355L7.65355 3.05353C8.2981 2.40901 9.42858 1.96172 10.552 1.80125C11.1056 1.72217 11.6291 1.71725 12.0564 1.78124C12.4987 1.84748 12.7698 1.97696 12.8965 2.10357C13.0231 2.23018 13.1526 2.50125 13.2188 2.94357C13.2828 3.37086 13.2779 3.89439 13.1988 4.44801C13.0383 5.57139 12.591 6.70188 11.9464 7.34645L7.49999 11.7929L6.35354 10.6465C6.15827 10.4512 5.84169 10.4512 5.64643 10.6465C5.45117 10.8417 5.45117 11.1583 5.64643 11.3536L7.14644 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L8.40073 12.3064L9.57124 14.2572C9.65046 14.3893 9.78608 14.4774 9.9389 14.4963C10.0917 14.5151 10.2447 14.4624 10.3535 14.3536L12.3535 12.3536C12.4648 12.2423 12.5172 12.0851 12.495 11.9293L12.0303 8.67679L12.6536 8.05355C13.509 7.19808 14.0117 5.82855 14.1887 4.58943C14.2784 3.9618 14.2891 3.33847 14.2078 2.79546C14.1287 2.26748 13.9519 1.74482 13.6035 1.39645C13.2552 1.04809 12.7325 0.871332 12.2045 0.792264C11.6615 0.710945 11.0382 0.721644 10.4105 0.8113C9.17143 0.988306 7.80189 1.491 6.94644 2.34642L6.32322 2.96968L3.07071 2.50504C2.91492 2.48278 2.75773 2.53517 2.64645 2.64646L0.646451 4.64645C0.537579 4.75533 0.484938 4.90829 0.50375 5.0611C0.522563 5.21391 0.61073 5.34954 0.742757 5.42876L2.69364 6.59928L2.14646 7.14645C2.0527 7.24022 2.00002 7.3674 2.00002 7.50001C2.00002 7.63261 2.0527 7.75979 2.14646 7.85356L3.64647 9.35356C3.84173 9.54883 4.15831 9.54883 4.35357 9.35356C4.54884 9.1583 4.54884 8.84172 4.35357 8.64646L3.20712 7.50001L3.85357 6.85356L6.85357 3.85355ZM10.0993 13.1936L9.12959 11.5775L11.1464 9.56067L11.4697 11.8232L10.0993 13.1936ZM3.42251 5.87041L5.43935 3.85356L3.17678 3.53034L1.80638 4.90074L3.42251 5.87041ZM2.35356 10.3535C2.54882 10.1583 2.54882 9.8417 2.35356 9.64644C2.1583 9.45118 1.84171 9.45118 1.64645 9.64644L0.646451 10.6464C0.451188 10.8417 0.451188 11.1583 0.646451 11.3535C0.841713 11.5488 1.1583 11.5488 1.35356 11.3535L2.35356 10.3535ZM3.85358 11.8536C4.04884 11.6583 4.04885 11.3417 3.85359 11.1465C3.65833 10.9512 3.34175 10.9512 3.14648 11.1465L1.14645 13.1464C0.95119 13.3417 0.951187 13.6583 1.14645 13.8535C1.34171 14.0488 1.65829 14.0488 1.85355 13.8536L3.85358 11.8536ZM5.35356 13.3535C5.54882 13.1583 5.54882 12.8417 5.35356 12.6464C5.1583 12.4512 4.84171 12.4512 4.64645 12.6464L3.64645 13.6464C3.45119 13.8417 3.45119 14.1583 3.64645 14.3535C3.84171 14.5488 4.1583 14.5488 4.35356 14.3535L5.35356 13.3535ZM9.49997 6.74881C10.1897 6.74881 10.7488 6.1897 10.7488 5.5C10.7488 4.8103 10.1897 4.25118 9.49997 4.25118C8.81026 4.25118 8.25115 4.8103 8.25115 5.5C8.25115 6.1897 8.81026 6.74881 9.49997 6.74881Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </span>
                <h1 className="text-3xl md:text-6xl font-bold tracking-tight mt-2">
                    Locate your Bank using IFSC Finder
                </h1>
                <p className="mt-3 text-gray-500 md:text-lg">
                    Powered by IpoTec &amp; you can effortlessly locate your bank branch with our IFSC code finder. Enter the IFSC code or bank name to get accurate details quickly and easily.
                </p>


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




                {/* <div className="flex justify-center flex-col md:flex-row mt-5 gap-3">
                    <div className="search">
                        <input type="text"
                            value={query}
                            onChange={handleSearch}
                            className="rounded-full border-2 shadow hover:border-transparent active:outline-none"
                            placeholder="Enter IFSC Code" />
                    </div>
                    {isDialogOpen && (
                        <div className="absolute top-full mt-2 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-4 z-10">
                            <ul>
                                {results.slice(0, 5).map((item, index) => (
                                    <li key={index} className="py-2 border-b last:border-b-0">
                                        <strong>{item.code}</strong>: {item.name} - {item.address}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div> */}
            </div>
            <div className="grid md:grid-cols-3 max-w-screen-lg mx-auto gap-10 mt-10 px-5">
                <div className="flex gap-4 items-start flex-col ">
                    <span className="text-violet-600 bg-violet-500/10 p-3 rounded-full">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                        >
                            <path
                                d="M9.96424 2.68571C10.0668 2.42931 9.94209 2.13833 9.6857 2.03577C9.4293 1.93322 9.13832 2.05792 9.03576 2.31432L5.03576 12.3143C4.9332 12.5707 5.05791 12.8617 5.3143 12.9642C5.5707 13.0668 5.86168 12.9421 5.96424 12.6857L9.96424 2.68571ZM3.85355 5.14646C4.04882 5.34172 4.04882 5.6583 3.85355 5.85356L2.20711 7.50001L3.85355 9.14646C4.04882 9.34172 4.04882 9.6583 3.85355 9.85356C3.65829 10.0488 3.34171 10.0488 3.14645 9.85356L1.14645 7.85356C0.951184 7.6583 0.951184 7.34172 1.14645 7.14646L3.14645 5.14646C3.34171 4.9512 3.65829 4.9512 3.85355 5.14646ZM11.1464 5.14646C11.3417 4.9512 11.6583 4.9512 11.8536 5.14646L13.8536 7.14646C14.0488 7.34172 14.0488 7.6583 13.8536 7.85356L11.8536 9.85356C11.6583 10.0488 11.3417 10.0488 11.1464 9.85356C10.9512 9.6583 10.9512 9.34172 11.1464 9.14646L12.7929 7.50001L11.1464 5.85356C10.9512 5.6583 10.9512 5.34172 11.1464 5.14646Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </span>
                    <div>
                        <h3 className="font-semibold text-xl"> Expressive API</h3>
                        <p className="mt-1 text-gray-500">
                            {" "}
                            You don't need to be an expert to use our plugin. Our expressive
                            API is readable and well documented.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start flex-col ">
                    <span className="text-violet-600 bg-violet-500/10 p-3 rounded-full">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                        >
                            <path
                                d="M0.849976 1.74998C0.849976 1.25292 1.25292 0.849976 1.74998 0.849976H3.24998C3.74703 0.849976 4.14998 1.25292 4.14998 1.74998V2.04998H10.85V1.74998C10.85 1.25292 11.2529 0.849976 11.75 0.849976H13.25C13.747 0.849976 14.15 1.25292 14.15 1.74998V3.24998C14.15 3.74703 13.747 4.14998 13.25 4.14998H12.95V10.85H13.25C13.747 10.85 14.15 11.2529 14.15 11.75V13.25C14.15 13.747 13.747 14.15 13.25 14.15H11.75C11.2529 14.15 10.85 13.747 10.85 13.25V12.95H4.14998V13.25C4.14998 13.747 3.74703 14.15 3.24998 14.15H1.74998C1.25292 14.15 0.849976 13.747 0.849976 13.25V11.75C0.849976 11.2529 1.25292 10.85 1.74998 10.85H2.04998V4.14998H1.74998C1.25292 4.14998 0.849976 3.74703 0.849976 3.24998V1.74998ZM2.94998 4.14998V10.85H3.24998C3.74703 10.85 4.14998 11.2529 4.14998 11.75V12.05H10.85V11.75C10.85 11.2529 11.2529 10.85 11.75 10.85H12.05V4.14998H11.75C11.2529 4.14998 10.85 3.74703 10.85 3.24998V2.94998H4.14998V3.24998C4.14998 3.74703 3.74703 4.14998 3.24998 4.14998H2.94998ZM2.34998 1.74998H1.74998V2.34998V2.64998V3.24998H2.34998H2.64998H3.24998V2.64998V2.34998V1.74998H2.64998H2.34998ZM5.09998 5.99998C5.09998 5.50292 5.50292 5.09998 5.99998 5.09998H6.99998C7.49703 5.09998 7.89998 5.50292 7.89998 5.99998V6.99998C7.89998 7.03591 7.89787 7.07134 7.89378 7.10618C7.92861 7.10208 7.96405 7.09998 7.99998 7.09998H8.99998C9.49703 7.09998 9.89998 7.50292 9.89998 7.99998V8.99998C9.89998 9.49703 9.49703 9.89998 8.99998 9.89998H7.99998C7.50292 9.89998 7.09998 9.49703 7.09998 8.99998V7.99998C7.09998 7.96405 7.10208 7.92861 7.10618 7.89378C7.07134 7.89787 7.03591 7.89998 6.99998 7.89998H5.99998C5.50292 7.89998 5.09998 7.49703 5.09998 6.99998V5.99998ZM6.09998 5.99998H5.99998V6.09998V6.89998V6.99998H6.09998H6.89998H6.99998V6.89998V6.09998V5.99998H6.89998H6.09998ZM7.99998 7.99998H8.09998H8.89998H8.99998V8.09998V8.89998V8.99998H8.89998H8.09998H7.99998V8.89998V8.09998V7.99998ZM2.64998 11.75H2.34998H1.74998V12.35V12.65V13.25H2.34998H2.64998H3.24998V12.65V12.35V11.75H2.64998ZM11.75 1.74998H12.35H12.65H13.25V2.34998V2.64998V3.24998H12.65H12.35H11.75V2.64998V2.34998V1.74998ZM12.65 11.75H12.35H11.75V12.35V12.65V13.25H12.35H12.65H13.25V12.65V12.35V11.75H12.65Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </span>
                    <div>
                        <h3 className="font-semibold text-xl">Highly performant</h3>
                        <p className="mt-1 text-gray-500">
                            {" "}
                            You can make sure your website or app is highly performant with a
                            built-in system to help you optimize.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start flex-col ">
                    <span className="text-violet-600 bg-violet-500/10 p-3 rounded-full">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                        >
                            <path
                                d="M7.28856 0.796908C7.42258 0.734364 7.57742 0.734364 7.71144 0.796908L13.7114 3.59691C13.8875 3.67906 14 3.85574 14 4.05V10.95C14 11.1443 13.8875 11.3209 13.7114 11.4031L7.71144 14.2031C7.57742 14.2656 7.42258 14.2656 7.28856 14.2031L1.28856 11.4031C1.11252 11.3209 1 11.1443 1 10.95V4.05C1 3.85574 1.11252 3.67906 1.28856 3.59691L7.28856 0.796908ZM2 4.80578L7 6.93078V12.9649L2 10.6316V4.80578ZM8 12.9649L13 10.6316V4.80578L8 6.93078V12.9649ZM7.5 6.05672L12.2719 4.02866L7.5 1.80176L2.72809 4.02866L7.5 6.05672Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </span>
                    <div>
                        <h3 className="font-semibold text-xl">No dependencies </h3>
                        <p className="mt-1 text-gray-500">
                            {" "}
                            Our plugins do not have any external dependencies so our plugin
                            has the minimal footprint possible.
                        </p>
                    </div>
                </div>
            </div></>
    );
};

export default IFSCSearch;
