"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';


const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
};


export default function FundManagerDetails({ fundManagersDetails }: { fundManagersDetails: any }) {
    const [openSection, setOpenSection] = useState<number | null>(null);
    const handleToggle = (sectionId: number) => {
        setOpenSection(openSection === sectionId ? null : sectionId);
    };
    return (
        <div className="relative mb-3">
            <h2 className="text-xl font-bold mb-2">Fund management</h2>
            {fundManagersDetails.map((funds: any, index: number) => (
                <div key={index} className="relative mb-3">
                    <h6 className="mb-0">
                        <button
                            onClick={() => handleToggle(index)}
                            className="relative flex items-center w-full py-4 font-semibold text-left transition-all ease-in border-solid cursor-pointer text-slate-700 rounded-t-1 group text-dark-500"
                        >
                            <a>
                                <p>{funds.person_name}</p>
                                <p className='text-gray-500 pt-2'>{`${formatDateString(funds.date_from)} - Present`}</p>
                            </a>
                            <span className='absolute right-0 text-xs'>{openSection === index ? <FaMinus /> : <FaPlus />}</span>
                        </button>
                    </h6>
                    <div className={`h-0 overflow-hidden border-b transition-all duration-300 ease-in-out ${openSection === index ? 'h-auto' : ''}`}>
                        <div className="py-4 text-sm leading-normal text-blue-gray-500/80">
                            <h5 className='text-gray-700 text-base'>Education</h5>
                            <p className='text-base text-gray-700'>{funds.education}</p>
                            <br />
                            <h5 className='text-gray-700 text-base'>Experience</h5>
                            <p className='text-base text-gray-700'>{funds.experience}</p>
                            <br />
                            <h5 className='text-gray-700 text-base mb-2'>Managed Schemes</h5>
                            <div className="grid grid-cols-2 gap-4">
                                {funds.funds_managed.map((fundName: any, index: number) => (
                                    <p key={index} className='text-sm text-gray-700'>
                                        <Link href={fundName.search_id}
                                            target={"_blank"}
                                            style={{
                                                textDecoration: "underline",
                                            }}
                                            prefetch={false}

                                        >
                                            {fundName.scheme_name}
                                        </Link>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
