"use client";
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

    const handleChipClick = (chip: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        let category = searchParams.get('category')?.split(',').filter(Boolean) || [];
        let risk = searchParams.get('risk')?.split(',').filter(Boolean) || [];

        if (category.includes(chip)) {
            category = category.filter(item => item !== chip);
            if (category.length > 0) {
                searchParams.set('category', category.join(','));
            } else {
                searchParams.delete('category');
            }
        } else if (risk.includes(chip)) {
            risk = risk.filter(item => item !== chip);
            if (risk.length > 0) {
                searchParams.set('risk', risk.join(','));
            } else {
                searchParams.delete('risk');
            }
        }

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
        window.location.reload(); 

        setCombinedList([...category, ...risk]);
    };

    const renderList = (items: string[]) => (
        items.map((item, index) => (
            <div
                key={index}
                onClick={() => handleChipClick(item)}
                className="cursor-pointer relative grid select-none items-center whitespace-nowrap rounded-full border py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900"
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
