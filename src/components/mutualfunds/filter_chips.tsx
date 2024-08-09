"use client"
import React, { useEffect, useState } from 'react';

const FilterChips = () => {
    const [combinedList, setCombinedList] = useState<string[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const category = searchParams.get('category') || '';
        const risk = searchParams.get('risk') || '';

        const categoryList = category.split(',').filter(Boolean);
        const riskList = risk.split(',').filter(Boolean);
        setCombinedList([...categoryList, ...riskList]);
    }, []);


    const renderList = (items: string[]) => (
        items &&
        items.map((item, index) => (
            <div
                key={index}
                className="relative grid select-none items-center whitespace-nowrap rounded-md border rounded-full py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900"
            >
                <span>{item}</span>
            </div>
        ))
    );
    return (
        combinedList.length > 0 && (
            <>
                <div className="flex gap-2">
                    {renderList(combinedList)}
                </div>
                <br />
            </>

        )
    );
};

export default FilterChips;
