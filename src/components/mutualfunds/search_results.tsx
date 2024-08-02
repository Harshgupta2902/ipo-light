"use client"
import React, { useEffect, useState } from 'react';



const SearchResults = ({ total }: { total: number }) => {
    const [selectedSort, setSelectedSort] = useState<string>('Popularity');
    useEffect(() => {
        // Get the current sorting option from the URL
        const searchParams = new URLSearchParams(window.location.search);
        const sortBy = searchParams.get('sort') || 'Popularity';
        setSelectedSort(sortBy);
    }, []);



    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value;
        setSelectedSort(newSortBy);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('sort', newSortBy);
        window.history.pushState(null, '', `?${searchParams.toString()}`);
        window.location.reload(); // This will reload the pag

    };
    return (
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div>
                <p className='text-sm text-gray-900 font-light'>Search Results:
                    <span className='font-medium ml-2' >{total} Mutual Funds</span>
                </p>
            </div>
            <div className='pr-6'>

                <form className="max-w-sm mx-auto">
                    <select id="sort" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm"
                        value={selectedSort}
                        onChange={handleSortChange}

                    >
                        <option value="3">Popularity</option>
                        <option value="1">Ratings - High To Low</option>
                        <option value="0">Returns - High To Low</option>
                    </select>
                </form>
            </div>

        </div>




    )
};

export default SearchResults;
