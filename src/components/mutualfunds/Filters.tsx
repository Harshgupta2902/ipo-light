"use client"
import React, { useEffect, useState } from 'react';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

interface SelectedFilters {
    [key: string]: string[];
}

const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'Debt', label: 'Debt', checked: false },
            { value: 'Equity', label: 'Equity', checked: false },
            { value: 'Hybrid', label: 'Hybrid', checked: false },
            { value: 'Other', label: 'Other', checked: false },
        ],
    },
    {
        id: 'risk',
        name: 'Risk',
        options: [
            { value: 'Low', label: 'Low', checked: false },
            { value: 'Moderately Low', label: 'Moderately Low', checked: false },
            { value: 'Moderate', label: 'Moderate', checked: false },
            { value: 'Moderately High', label: 'Moderately High', checked: false },
            { value: 'High', label: 'High', checked: false },
            { value: 'Very High', label: 'Very High', checked: true },
        ],
    }
]

const MfFilters = () => {
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const newSelectedFilters: SelectedFilters = {};
        const newOpenSections = new Set<string>();

        filters.forEach(section => {
            const values = searchParams.get(section.id)?.split(',') || [];
            if (values.length > 0) {
                newOpenSections.add(section.id);
            }
            newSelectedFilters[section.id] = values;
        });

        setSelectedFilters(newSelectedFilters);
    }, []);

    const handleFilterChange = (sectionId: string, value: string, checked: boolean) => {
        const searchParams = new URLSearchParams(window.location.search);
        let filterValues = searchParams.get(sectionId)?.split(',') || [];

        if (checked) {
            if (!filterValues.includes(value)) {
                filterValues.push(value);
            }
        } else {
            filterValues = filterValues.filter(val => val !== value);
        }

        if (filterValues.length > 0) {
            searchParams.set(sectionId, filterValues.join(','));
        } else {
            searchParams.delete(sectionId);
        }

        window.history.pushState(null, '', `?${searchParams.toString()}`);
        window.location.reload(); // This will reload the page
        setSelectedFilters(prevSelectedFilters => ({
            ...prevSelectedFilters,
            [sectionId]: filterValues,
        }));
    };

    return (
        <form className="hidden lg:block">
            <h3 className="sr-only">Categories</h3>
            {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                                <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                            </span>
                        </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                    <input
                                        defaultValue={option.value}
                                        defaultChecked={selectedFilters[section.id]?.includes(option.value)}
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}

                                    />
                                    <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </DisclosurePanel>
                </Disclosure>
            ))}
        </form>
    );
};

export default MfFilters;
