import React from "react";
import Content from "./content";
import { endpoints } from "@/api/endpoints";
import { get } from "@/api/api";

export interface Root {
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

export interface Data {
    
}



const BlogDetails = async ({ route }: { route: string }) => {
    let result: Root | null = null;

    try {
        const data = await get(endpoints.blogDetails + route.replace("/blogs", ""));
        result = data.data;
        console.log("api done", result);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
    }
    return (
        <section className="section pt-7">
            <div className="container">
                <div className="row justify-center">
                    {route.replace("/blogs", "")}
                    {/* {result.data.id} */}
                    {result && result ? (
                        <Content id={result.id} />
                    ) : (
                        <p>Error loading blog details.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default BlogDetails;