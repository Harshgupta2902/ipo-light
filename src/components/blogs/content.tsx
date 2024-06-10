"use client"
import React from "react";
import { markdownify } from "../common/textConverter";
import { format } from 'date-fns';
import ImageFallback from "../common/ImageFallback";


interface Blog {
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

export default function BlogDetails({ blog }: { blog: Blog }) {

    return (
        <article className="lg:col-9">
            <div className="mb-10">
                <ImageFallback
                    src={blog.image}
                    width="600"
                    height="300"
                    className="w-full h-[20rem] rounded"
                    alt={blog.alt_keyword}
                    priority
                />
            </div>
            <div className="flex space-x-3 items-center my-3">
                <a href="/authors/awab-husameldin">
                    <ImageFallback
                        src={blog.image}
                        width="30"
                        height="30"
                        className="inline-block w-6 h-6 rounded-full"
                        alt={blog.author}
                        priority
                    />
                </a>
                <p>
                    <span>by </span>
                    <a
                        className="text-dark hover:text-primary transition"
                        href="/authors/awab-husameldin"
                    >
                        {blog.author}
                    </a>
                </p>
                <div>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        
                        viewBox="0 0 448 512"
                        className="inline-block"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path>
                    </svg>
                    {format(new Date(blog.published_at), 'dd-MMMM-yyyy')}

                </div>
            </div>
            <h2 className="h2 mb-4">
                {blog.title}
            </h2>
            <div className="content mb-10"
                dangerouslySetInnerHTML={markdownify(blog.blog, true)}
            />
        </article>
    );
}
