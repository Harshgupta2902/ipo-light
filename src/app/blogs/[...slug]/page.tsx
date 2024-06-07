"use client"

import { usePathname } from 'next/navigation'
import React from 'react'
import Content from '@/components/blogs/blog'

export default function Details() {
    const routeName = usePathname();
    return (
        <Content route={routeName} />
    )
}
