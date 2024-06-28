"use client"

import React, { useEffect, useState } from 'react';
import Content from '@/components/blogs/content'

import { endpoints } from "@/api/endpoints";
import { get } from "@/api/api";
import { usePathname } from 'next/navigation';
import { Root } from '@/components/interfaces';


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