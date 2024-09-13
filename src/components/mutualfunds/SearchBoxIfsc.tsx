"use client"
import { endpoints } from '@/api/endpoints';
import Image from 'next/image';
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

const sdata = [
    {
        "id": 108720,
        "Bank": "STATE BANK OF INDIA",
        "Ifsc": "SBIN0031226",
        "Branch": "VALLABHNAGAR",
        "Address": "DISTTUDAIPUR 313601",
        "City1": "VALLABHNAGAR",
        "City2": "UDAIPUR",
        "State": "RAJASTHAN",
        "Std_Code": "2957",
        "Phone": null
    },
    {
        "id": 108721,
        "Bank": "STATE BANK OF INDIA",
        "Ifsc": "SBIN0031225",
        "Branch": "SALUMBER",
        "Address": "DISTT UDAIPUR 313027",
        "City1": "SALUMBER",
        "City2": "UDAIPUR",
        "State": "RAJASTHAN",
        "Std_Code": "2906",
        "Phone": null
    },
    {
        "id": 108722,
        "Bank": "STATE BANK OF INDIA",
        "Ifsc": "SBIN0031224",
        "Branch": "SARADA",
        "Address": "MAIN ROAD, SARADA, DISTTUDAIPUR 313902",
        "City1": "SARADA",
        "City2": "UDAIPUR",
        "State": "RAJASTHAN",
        "Std_Code": "2905",
        "Phone": null
    },
    {
        "id": 108723,
        "Bank": "STATE BANK OF INDIA",
        "Ifsc": "SBIN0031223",
        "Branch": "RELMAGRA",
        "Address": "DISTT RAJSAMAND 313329",
        "City1": "RELMAGRA",
        "City2": "RAJSAMAND",
        "State": "RAJASTHAN",
        "Std_Code": "2952",
        "Phone": null
    },
    {
        "id": 108724,
        "Bank": "STATE BANK OF INDIA",
        "Ifsc": "SBIN0031222",
        "Branch": "MAVLI",
        "Address": "DISTT UDAIPUR 313203",
        "City1": "MAVLI",
        "City2": "UDAIPUR",
        "State": "RAJASTHAN",
        "Std_Code": "2955",
        "Phone": null
    },
    {
        "id": 108725,
        "Bank": "STATE BANK OF INDIA",
        "Ifsc": "SBIN0031221",
        "Branch": "KUMBHALGARH",
        "Address": "DISTT RAJSAMAND 313325",
        "City1": "KUMBHALGARH",
        "City2": "RAJSAMAND",
        "State": "RAJASTHAN",
        "Std_Code": "2954",
        "Phone": null
    }
];
const fetchBankDetails = async (state?: string, city?: string, bank?: string) => {
    try {

        let url = `${endpoints.geBankDetails}`;

        if (state) {
            url += `?state=${state}`;
        }

        if (city) {
            url += `&city=${city}`;
        }

        if (bank) {
            url += `&bank=${bank}`;
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

const IFSCSearch: React.FC = () => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedState, setSelectedState] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedBank, setSelectedBank] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);
    const [banks, setBanks] = useState<string[]>([]);
    const [allData, setAllData] = useState<any[]>([]);



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

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleStatehange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedState = event.target.value;
        setSelectedState(selectedState);
        console.log('Selected state:', selectedState);
        setSelectedBank("");
        setBanks([]);
        setSelectedCity("");
        setCities([]);
        try {
            const cities = await getData(selectedState);
            setCities(cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleCitiesChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        console.log('Selected City:', selectedCity);
        setSelectedBank("");
        setBanks([]);

        try {
            const banks = await getData(selectedState, selectedCity);
            setBanks(banks);
        } catch (error) {
            console.error('Error fetching banks:', error);
        }
    };

    const handleBankChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBank = event.target.value;
        setSelectedBank(selectedBank);
        console.log('Selected Bank:', selectedBank);

        try {
            const allData = await getData(selectedState, selectedCity, selectedBank);
            setAllData(allData);
        } catch (error) {
            console.error('Error fetching all data:', error);
        }
    };


    const getData = async (state?: string, city?: string, bank?: string) => {
        return await fetchBankDetails(state, city, bank);
    }

    return (
        <div className="w-full">
            <div className="">
                <ul className="flex flex-wrap mx-20 px-1.5 py-1.5 list-none rounded-full bg-slate-100" role="tablist">
                    <li className=" flex-auto text-center">
                        <a
                            onClick={() => handleTabClick('dashboard')}
                            className={`flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${activeTab === 'dashboard' ? 'text-slate-900' : 'text-slate-500'
                                } bg-inherit`}
                            role="tab"
                            aria-selected={activeTab === 'dashboard'}
                            aria-controls="dashboard"
                        >
                            By IFSC
                        </a>
                    </li>
                    <li className="flex-auto text-center">
                        <a
                            onClick={() => handleTabClick('profile')}
                            className={` flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer ${activeTab === 'profile' ? 'text-slate-900' : 'text-slate-500'
                                } bg-inherit`}
                            role="tab"
                            aria-selected={activeTab === 'profile'}
                            aria-controls="profile"
                        >
                            By Bank Details
                        </a>
                    </li>
                </ul>

                <div className="py-5">
                    <div id="dashboard" role="tabpanel" className={activeTab === 'dashboard' ? 'block' : 'hidden'}>
                        <div className="max-w-md mx-auto p-4">
                            <div className="">
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
                                    <ul>
                                        {suggestions.map((suggestion) => (
                                            <Link href={`ifsc-code/${suggestion.State.toLowerCase().replaceAll(" ", "-")}/${suggestion.City1.toLowerCase().replaceAll(" ", "-")}/${suggestion.Bank.toLowerCase().replaceAll(" ", "-")}/${suggestion.Ifsc}`}>
                                                <li className={"my-4 px-4"} key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <img src={`/Banks/${suggestion.Bank}.png`}
                                                                alt={`${suggestion.Bank}`}
                                                                className="w-8 h-8 mr-4 rounded-full" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {suggestion.Ifsc}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {suggestion.Branch},{" "}{suggestion.State}
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
                    <div id="profile" role="tabpanel" className={activeTab === 'profile' ? 'block' : 'hidden'}>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="mb-5 group">
                                <select onChange={handleStatehange} value={selectedState} className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
                                    <option value="" disabled>Select a state</option>
                                    {states.map((state, index) => (
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-5 group">
                                <select onChange={handleCitiesChange} value={selectedCity} className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
                                    <option value="" disabled>Select City</option>
                                    {cities.map((state, index) => (
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-5 group">
                                <select onChange={handleBankChange} value={selectedBank} className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
                                    <option value="" disabled>Select Bank</option>
                                    {banks.map((state, index) => (
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            {allData.map((data, index) => (
                                <div key={index} className="mb-4 md:col-4 lg:col-6">
                                    <Link href={`ifsc-code/${data.State.toLowerCase().replaceAll(" ", "-")}/${data.City1.toLowerCase().replaceAll(" ", "-")}/${data.Bank.toLowerCase().replaceAll(" ", "-")}/${data.Ifsc}`}>
                                        <div className="flex flex-col border rounded-sm hover:shadow px-8 py-4 ">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <img src={`/Banks/${data.Bank}.png`}
                                                        alt={`${data.Bank}`}
                                                        className="w-8 h-8 mr-4 rounded-full" />
                                                </div>
                                                <div className="flex-1 min-w-0 text-left">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {data.Ifsc}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {data.Branch},{" "}{data.State}
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
        </div>
    );
};

export default IFSCSearch;


const states = [
    "ADILABAD",
    "AHMADABAD",
    "AJMER",
    "AMRELI",
    "ANDAMAN AND NICOBAR",
    "ANDAMAN AND NICOBAR ISLAND",
    "ANDAMANANDNICOBAR",
    "ANDHRA PRADESH",
    "ANDHRAPRADESH",
    "AP",
    "ARUNACHAL PRADESH",
    "ASSAM",
    "BADGAM",
    "BAGALKOTE",
    "BANAS KANTHA",
    "BANGALORE RURAL",
    "BANGALORE URBAN",
    "BARA BANKI",
    "BASTAR",
    "BELLARY",
    "BHARUCH",
    "BHAVNAGAR",
    "BIHAR",
    "BILASPUR",
    "BUDAUN",
    "CG",
    "CHANDIGARH",
    "CHANDIGARH UT",
    "CHATTISGARH",
    "CHHATISGARH",
    "CHHATISHGARH",
    "CHHATTISGARH",
    "CHIKMAGALUR",
    "CHINABHOGILA",
    "CHITRAKOOT",
    "CHODAVARAM",
    "COIMBATORE",
    "DADRA",
    "Dadra & Nagar Haveli",
    "DADRA AND NAGAR HAVELI",
    "DAKSHIN KANNAD",
    "DAMAN",
    "DAMAN AND DIU",
    "DAMANANDDIU",
    "DANTEWADA",
    "DEHRA DUN",
    "DELHI",
    "EAST GODAVARI",
    "ERNAKULAM",
    "ERODE",
    "FEROZPUR",
    "GAUTAM BUDDHA NAGAR",
    "GOA",
    "GREATER BOMBAY",
    "GUJARAT",
    "GUJRAT",
    "GURDASPUR",
    "HARKHAND",
    "HARYANA",
    "HIMACHAL PRADESH",
    "HIMACHALPRADESH",
    "HIMANCHALPRADESH",
    "HUGLI",
    "JALPAIGURI",
    "JAMMU AND KASHMIR",
    "JAMMUANDKASHMIR",
    "JANJGIR CHAMPA",
    "JARAJAPUPETA",
    "JHAGRAKHAND COLLIERY",
    "JHARKHAND",
    "JIND",
    "JUNAGADH",
    "KA",
    "KACHCHH",
    "KAMRUP",
    "KAMRUP METROPOLITAN",
    "KARANATAKA",
    "KARIMNAGAR",
    "KARNATAKA",
    "KEONJHAR",
    "KERALA",
    "KHURDA",
    "KINNAUR",
    "KOLAR",
    "KRISHNA",
    "KRISHNAGIRI",
    "KULU",
    "KURUKSHETRA",
    "LADAKH",
    "LAKSHADWEEP",
    "LUDHIANA",
    "MADHYA PRADESH",
    "MADHYAPRADESH",
    "MAHARASHTRA",
    "MANIPUR",
    "MANSA",
    "MEERUT",
    "MEGHALAYA",
    "MH",
    "MIZORAM",
    "MP",
    "NADIA",
    "NAGALAND",
    "NAGAPATTINAM",
    "NALGONDA",
    "NARSIMHAPUR",
    "NASIK",
    "NAVSARI",
    "NCT of Delhi",
    "NEW DELHI",
    "ODISHA",
    "ORISSA",
    "PANJAB",
    "PASCHIMI SINGHBHUM",
    "Pondicherry",
    "PRAKASAM",
    "PUDUCHERRY",
    "PUNE",
    "PUNJAB",
    "PURBA MEDINIPUR",
    "RAJASTHAN",
    "RAJKOT",
    "RANCHI",
    "RANGAREDDY",
    "RATLAM",
    "RI BHOI",
    "RUPNAGAR",
    "SABAR KANTHA",
    "SAHARANPUR",
    "SAHEBGANJ",
    "SAHIBZADA AJIT SINGH NAGAR",
    "SANGRUR",
    "SATARA",
    "SHRAVASTI",
    "SIDHI",
    "SIKKIM",
    "SIMLA",
    "SOUTH 24 PARGANAS",
    "SOUTH GOA",
    "SURAT",
    "TAMIL NADU",
    "TAMILNADU",
    "TELAGANA",
    "TELANGANA",
    "TELENGANA",
    "THANE",
    "THIRUVALLUR",
    "THIRUVANANTHAPURAM",
    "THRISSUR",
    "TIRUCHIRAPALLI",
    "TN",
    "TOOTHUKUDI",
    "TRIPURA",
    "UP",
    "UT OF DAMAN AND DIU",
    "UTTAR PRADESH",
    "UTTARAKHAND",
    "UTTARANCHAL",
    "UTTARPRADESH",
    "UTTRAKHAND",
    "VADODARA",
    "VISHAKHAPATNAM",
    "VPO - KHANDWA PATTA CHURU, DIST CHURU",
    "WARANGAL",
    "WEST BENGAL",
    "WESTBENGAL"
];