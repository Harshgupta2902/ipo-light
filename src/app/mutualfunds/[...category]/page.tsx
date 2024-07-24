import NotFound from '@/app/not-found';
import { headers } from 'next/headers';
import React from 'react'


const capitalizeWords = (string: string) => {
    if (!string) return '';
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};


const isPathnameValid = (path: string | undefined) => {
    if (!path) return true;
    const validCategoriesWithSuffixes: { [key: string]: string[] } = {
        equity: ['fof', 'Large-Cap-Fund'],
        debt: [],
        hybrid: ['latest', 'low', 'high']
    };
    const [sector, subsector] = path.split('/');
    if (!(sector in validCategoriesWithSuffixes)) {
        return true;
    }
    if (subsector && !validCategoriesWithSuffixes[sector].includes(subsector)) {
        return true;
    }
    return false;
}


const extractSectorAndSubsector = (path: string | undefined) => {
    if (!path) return { sector: '', subsector: '' };
    const parts = path.split('/');
    const sector = capitalizeWords(parts[0]);
    const subsector = parts[1] ? capitalizeWords(parts[1].replaceAll('-', ' ')) : '';
    return { sector, subsector };
}

export default function CategoryPage() {
    const headersList = headers();
    const pathname = headersList.get("x-url")?.replace('/mutualfunds/', "");
    const { sector, subsector } = extractSectorAndSubsector(pathname);
    if (isPathnameValid(pathname)) return <NotFound />
    return (
        <div>
            <p>pathname: {pathname}</p>
            <p>Sector: {sector}</p>
            <p>Subsector: {subsector}</p>
        </div>
    )
}


