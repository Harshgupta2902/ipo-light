import { post } from "@/api/api";
import ScreenerTable from "@/components/ipo/screener/screener-table";
import React from "react";

const Screener = async () => {
    let result = null;

    try {
        const response = await post("https://api.tickertape.in/mf-screener/query", {
            match: {},
            sortBy: "aum",
            sortOrder: -1,
            project: ["subsector", "option", "aum", "ret3y", "expRatio"],
            offset: 20,
            count: 4994,
            mfIds: [],
        }    
    );
        result = response.data;
    } catch (error) {
        console.error("Error fetching menu data:", error);
    }
    return (
        <div>
            <ScreenerTable data={result.result} />
        </div>
    );
};
export default Screener;



// import { Fragment, useState } from 'react'
// import {
//     Dialog,
//     DialogPanel,
//     Disclosure,
//     DisclosureButton,
//     DisclosurePanel,
//     Menu,
//     MenuButton,
//     MenuItem,
//     MenuItems,
//     Transition,
//     TransitionChild,
// } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

// const sortOptions = [
//     { name: 'Most Popular', href: '#', current: true },
//     { name: 'Best Rating', href: '#', current: false },
//     { name: 'Newest', href: '#', current: false },
//     { name: 'Price: Low to High', href: '#', current: false },
//     { name: 'Price: High to Low', href: '#', current: false },
// ]
// const subCategories = [
//     { name: 'Totes', href: '#' },
//     { name: 'Backpacks', href: '#' },
//     { name: 'Travel Bags', href: '#' },
//     { name: 'Hip Bags', href: '#' },
//     { name: 'Laptop Sleeves', href: '#' },
// ]
// const filters = [
//     {
//         id: 'color',
//         name: 'Color',
//         options: [
//             { value: 'white', label: 'White', checked: false },
//             { value: 'beige', label: 'Beige', checked: false },
//             { value: 'blue', label: 'Blue', checked: true },
//             { value: 'brown', label: 'Brown', checked: false },
//             { value: 'green', label: 'Green', checked: false },
//             { value: 'purple', label: 'Purple', checked: false },
//         ],
//     },
//     {
//         id: 'category',
//         name: 'Category',
//         options: [
//             { value: 'new-arrivals', label: 'New Arrivals', checked: false },
//             { value: 'sale', label: 'Sale', checked: false },
//             { value: 'travel', label: 'Travel', checked: true },
//             { value: 'organization', label: 'Organization', checked: false },
//             { value: 'accessories', label: 'Accessories', checked: false },
//         ],
//     },
//     {
//         id: 'size',
//         name: 'Size',
//         options: [
//             { value: '2l', label: '2L', checked: false },
//             { value: '6l', label: '6L', checked: false },
//             { value: '12l', label: '12L', checked: false },
//             { value: '18l', label: '18L', checked: false },
//             { value: '20l', label: '20L', checked: false },
//             { value: '40l', label: '40L', checked: true },
//         ],
//     },
// ]

// function classNames(...classes: any) {
//     return classes.filter(Boolean).join(' ')
// }

// const ScreenerHomePage: React.FC = () => {


//     const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

//     return (
       
//     )
// }


// export default ScreenerHomePage;
