import React from 'react'
import { ShimmerThumbnail } from "react-shimmer-effects";

export default function MarketSectorShimmer() {
  return (
    <div className="inline-flex flex-wrap items-center group animate-pulse">
      <div className="px-4 max-w-sm">
        <div className="flex h-full py-4 flex-col">
          <div className="flex items-center mb-3">
            <div className="indices h-4 bg-gray-200 rounded w-1/4 mr-2"></div>
            <div className="mr-4 bg-gray-200 rounded" style={{ width: "80px", maxHeight: "60px" }}></div>
            <div className="grid grid-cols-1">
              <p className="indices m-0 h-4 bg-gray-200 rounded w-1/4"></p>
              <div className="inline-flex flex-wrap items-center group">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}