import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { MfHomePageFundmanager } from '@/components/interfaces'
import FundManagerListView from '@/components/common/FundManagerListView'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
export default function FundManagerDetails({ fundManagersDetails }: { fundManagersDetails: MfHomePageFundmanager[] }) {

    const [categoryFilter, setCategoryFilter] = useState('hybrid'); 
    const handleFilterChange = (event: any) => {
        setCategoryFilter(event.target.value);
    };


    return (
        <div>
            <div className="container mt-12">
                <div className="row justify-center">
                    {fundManagersDetails && fundManagersDetails.map((funds) => (
                        <FundManagerListView aum={funds.aumInCr} exp={funds.exp} image={funds.imgUrl} name={funds.name} >
                            <div key={funds.fmCode}>
                                <h6 className='font-bold'>Qualification</h6>
                                <p className='text-xs text-gray-900'>{funds.qualification}</p>
                                <br />
                                <h6 className='font-bold'>Past Experience</h6>
                                <p className='text-xs text-gray-900'>{funds.pastExp}</p>
                                <br />
                                <br />

                                <div
                                    className="flex" style={{ justifyContent: "space-between" }}>
                                    <h6 className='font-bold'>Funds Managed {`(${funds.funds.length})`}</h6>
                                    <select value={categoryFilter} onChange={handleFilterChange}
                                        className="block max-w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-xs sm:text-sm sm:leading-6 mb-2">
                                        <option value="hybrid">Hybrid</option>
                                        <option value="equity">Equity</option>
                                    </select>
                                </div>
                                <div className="relative flex flex-row overflow-x-auto">
                                    {funds.funds.map((label, index) => (
                                        (categoryFilter === 'all' || label.sector.toLowerCase() === categoryFilter) && (
                                            <div
                                                key={index}
                                                className="p-6 ml-4 bg-white border border-gray-200 rounded-md shadow flex-shrink-0 mb-4 md:w-1/3 lg:w-1/3 xl:w-1/3 px-2"
                                            >
                                                <h5 className="text-base font-bold leading-none overflow-hidden whitespace-nowrap overflow-ellipsis">
                                                    {label.name}
                                                </h5>
                                                <p className="text-xs mb-2">{label.option.toUpperCase()}</p>
                                                <br />
                                                <p
                                                    className={`text-sm font-bold ${label.ratios[0].value !== null && label.ratios[0].value !== undefined
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                        }`}
                                                >
                                                    {label.ratios[0].value !== null && label.ratios[0].value !== undefined
                                                        ? label.ratios[0].value.toFixed(2)
                                                        : '0.00'}
                                                    {label.ratios[0].value !== null && label.ratios[0].value !== undefined ? (
                                                        <FaCaretUp className="text-green-500 inline-block ml-1" />
                                                    ) : (
                                                        <FaCaretDown className="text-red-500 inline-block ml-1" />
                                                    )}
                                                    <span
                                                        className={`text-sm inline-block ml-1 ${label.ratios[1].value !== null && label.ratios[1].value !== undefined
                                                            ? 'text-green-500'
                                                            : 'text-red-500'
                                                            }`}
                                                    >
                                                        {label.ratios[1].value !== null && label.ratios[1].value !== undefined
                                                            ? label.ratios[1].value.toFixed(2)
                                                            : '0.00'}
                                                    </span>
                                                    <span className={`text-sm inline-block ml-1 `}>
                                                        {label.ratios[2].value !== null && label.ratios[2].value !== undefined
                                                            ? `${label.ratios[2].value.toFixed(2)}%`
                                                            : '0.00%'}
                                                    </span>
                                                </p>
                                            </div>
                                        )
                                    ))}
                                </div>

                            </div>
                        </FundManagerListView >
                    ))}
                </div>
            </div>
        </div>
    )
}
