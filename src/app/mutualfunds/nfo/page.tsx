"use server"
import React from 'react';
import { endpoints } from '@/api/endpoints';
import Image from 'next/image';
import NFOTable from '@/components/mutualfunds/nfo-table';


const fetchNfo = async () => {
    try {
        const timestamp = new Date().toISOString();
        const response = await fetch(`${endpoints.nfo}?time=${timestamp}`, { cache: "no-store" });

        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data", error);
        throw error;
    }
};

const NFOHomePage = async () => {

    let openNfo = null;
    let closeNfo = null;
    let upcoming = null;

    try {
        const response = await fetchNfo();
        openNfo = response.live;
        closeNfo = response.closed;
        upcoming = response.upcoming;
    } catch (error) {
        console.error("Error fetching data", error);
    }

    return (
        <section className='container'>
            <section className="w-full pb-16">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12">
                        <div className="flex flex-col justify-center space-y-2">
                            <div className="space-y-2">
                                <h1 className="my-4 pt-6 text-5xl">{"Mutual Funds - NFO"}</h1>
                                <p className="my-4 text-black">{"New Funds Offers"}</p>
                                <p className="my-4 text-black">{"NFO is an investment opportunity where an AMC launches a new fund and offers it to the investors for the first time to invest. The AMC uses the money which they raised during the NFO to invest in different securities and build the fund. It's a common way for the AMC to introduce and promote a new fund"}</p>
                            </div>
                        </div>
                        <Image
                            alt="mf - nfo"
                            width="400"
                            height="400"
                            decoding="async"
                            src="/mf/nfo.png"
                            priority
                        />
                    </div>
                </div>
            </section>

            <div className="bg-white">
                <section >
                    <div className="container">
                        <div className="relative overflow-x-auto sm:rounded-lg">
                            <NFOTable live={openNfo} closed={closeNfo} upcoming={upcoming} />
                        </div>
                    </div>
                </section>
            </div>

        </section>
    );

}

export default NFOHomePage;