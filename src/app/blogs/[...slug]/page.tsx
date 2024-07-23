import React, { useEffect, useState } from 'react';
import Content from '@/components/blogs/content'
import { endpoints } from "@/api/endpoints";
import { get } from "@/api/api";

import Loader from '@/app/Loader';
import { headers } from 'next/headers';




const fetchBlogDetails = async (slug: string) => {
    try {
        const response = await fetch(`${endpoints.blogDetails}/${slug}`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching GmpIpo", error);
        throw error;
    }
};



const BlogDetails = async () => {

    let result = null;
    let error = null;
    let loading = true;
    const headersList = headers();
    const completePathname = headersList.get("x-url");
    if (!completePathname) {
        return;
    }
    const pathname = completePathname.substring(completePathname.lastIndexOf('/') + 1);
    console.log(pathname);

    try {
        result = await fetchBlogDetails(pathname ?? "");
        loading = false;
    } catch (err) {
        console.error(`error ${err}`);
    } finally {
        loading = false;
    }


    if (loading) return <Loader />;

    return (
        <section className="section pt-7">
            <div className="container">
                <div className="row justify-center">
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        result && <Content blog={result} />
                    )}
                </div>
            </div>
        </section>
    );
}

export default BlogDetails;