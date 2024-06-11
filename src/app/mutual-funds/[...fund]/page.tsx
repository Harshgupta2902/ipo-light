"use client"

import { usePathname } from 'next/navigation'
import React from 'react'

export default function FundPage() {
  const pathname = usePathname();
  return (
    <div>
      fund page
      <br />
      path name: {pathname}

    </div>
  )
}
