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



export async function generateMetadata() {

    const headersList = headers();
    const completePathname = headersList.get("x-url");
    if (!completePathname) {
        return;
    }
    const pathname = completePathname.substring(completePathname.lastIndexOf('/') + 1);
    console.log(pathname);
    const metaData = await fetchBlogDetails(pathname ?? "/");
    if (metaData.error) {
        return {
            title: "Not Found",
            description: "Error Page Not Found",
        };
    }

    const metaTitle = metaData.title
        ?? "IpoTec";
    const metaDescription = metaData.description
        ?? "IpoTec";
    const keywords = metaData.meta_keywords
        ?? "IPO, mutual funds, investment, finance, stock market";
    const image = metaData.image;

    return {
        title: metaTitle,
        description: metaDescription,
        robots: "index, follow",
        author: "IpoTec",
        keywords: keywords,
        copyright: "Copyright 2024 @ IpoTec",
        url: "https://www.ipotec.in/",
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            site: "https://www.ipotec.in/",
            images: image,
            type: "website",
            url: `https://www.ipotec.in/${completePathname}`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: image,
        },
        alternates: {
            canonical: `https://www.ipotec.in${completePathname}`,
        },
    };
}


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