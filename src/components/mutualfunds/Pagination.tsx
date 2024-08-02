"use client"
import React, { useEffect, useState } from 'react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems }) => {
    const [current, setCurrent] = useState(currentPage);

    const totalPages = totalItems === 0 ? 0 : Math.max(Math.ceil(totalItems / 15) - 1, 0);

    useEffect(() => {

        const searchParams = new URLSearchParams(window.location.search);
        const pageParam = searchParams.get('page');
        if (pageParam) {
            const page = parseInt(pageParam, 10) - 1; // Convert to 0-based index
            if (!isNaN(page) && page >= 0) {
                setCurrent(page);
            }
        }
    }, []);

    const onPageChange = async (page: number) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', (page + 1).toString());
        window.history.pushState(null, '', `?${searchParams.toString()}`);
        setCurrent(page);

        window.location.reload(); // This will reload the page

    };

    const handlePrevious = () => {
        if (current > 0) {
            onPageChange(current - 1);
        }
    };

    const handleNext = () => {
        if (current < totalPages) {
            onPageChange(current + 1);
        }
    };

    return (
        <div className="flex justify-between items-center py-4">
            <button
                onClick={handlePrevious}
                disabled={current === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-sm text-gray-700">
                Page {current + 1} of {totalPages + 1}
            </span>
            <button
                onClick={handleNext}
                disabled={current === totalPages}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
