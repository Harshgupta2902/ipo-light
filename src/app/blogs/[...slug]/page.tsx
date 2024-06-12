"use client"

import React, { useEffect, useState } from 'react';
import Content from '@/components/blogs/content'

import { endpoints } from "@/api/endpoints";
import { get } from "@/api/api";
import { usePathname } from 'next/navigation';
interface Root {
    id: string
    title: string
    slug: string
    type: any
    description: string
    blog: string
    author: string
    image: string
    alt_keyword: string
    tags: string
    category: string
    featured: string
    created_at: string
    published: string
    meta_description: string
    meta_title: string
    robots: string
    meta_keywords: string
    published_at: string
    views: string
}

const BlogDetails: React.FC = () => {
    const [result, setResult] = useState<Root | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const pathname = usePathname();

    useEffect(() => {
        const fetchBlogDetails = () => {
            get(endpoints.blogDetails + pathname.replace("/blogs", ""))
                .then((data) => {
                    setResult(data.data);
                    console.log("api done", data.data);
                })
                .catch((error) => {
                    console.error("Error fetching blog posts:", error);
                    setError("Error loading blog details.");
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchBlogDetails();
    }, [pathname]);

    return (
        <section className="section pt-7">
            <div className="container">
                <div className="row justify-center">
                    {loading ? (
                        <p></p>
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