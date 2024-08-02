"use client"
import React from 'react';

const FilterChips = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const category = searchParams.get('category') || ''; // Default to empty string if not present
    const risk = searchParams.get('risk') || ''; // Default to empty string if not present

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
    const categoryList = category ? category.split(',') : [];
    const riskList = risk ? risk.split(',') : [];

    const combinedList = [...categoryList, ...riskList];

    return (
        combinedList.length > 0 ? (
            <div className="flex gap-2">
                {renderList(combinedList)}
            </div>
        ) : null
    );
};

export default FilterChips;
