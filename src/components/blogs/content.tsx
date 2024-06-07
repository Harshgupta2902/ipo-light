"use client"
import React from "react";
import { markdownify } from "../common/textConverter";

const BlogDetails = async ({ id }: { id: string }) => {

    return (
        <article className="lg:col-9">
            <div className="mb-10">
                <img
                    alt="Adversus is a web-based dialer and practical CRM solution"
                    loading="lazy"
                    width="1200"
                    height="500"
                    decoding="async"
                    data-nimg="1"
                    className="w-full rounded"
                    src="https://bigspring-nextjs.vercel.app/_next/image?url=%2Fimages%2Fblog%2Fpost-1.webp&amp;w=3840&amp;q=75"
                />
            </div>
            <div className="flex space-x-3 items-center my-3">
                <a href="/authors/awab-husameldin">
                    <img
                        alt="Awab Husameldin"
                        title="Awab Husameldin"
                        loading="lazy"
                        width="30"
                        height="30"
                        decoding="async"
                        data-nimg="1"
                        className="inline-block rounded-full"
                        src="https://bigspring-nextjs.vercel.app/_next/image?url=%2Fimages%2Fauthors%2Fauthor-1.webp&amp;w=64&amp;q=75"
                    />
                </a>
                <p>
                    <span>by </span>
                    <a
                        className="text-dark dark:text-darkmode-dark hover:text-primary transition"
                        href="/authors/awab-husameldin"
                    >
                        Awab Husameldin
                    </a>
                </p>
                <div>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 448 512"
                        className="inline-block"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path>
                    </svg>
                    18 Aug, 2020
                </div>
            </div>
            <h2 className="h2 mb-4">
                Adversus is a web-based dialer and practical CRM solution
            </h2>
            <div className="content mb-10"
                dangerouslySetInnerHTML={markdownify("lumpMarkdownContent", true)}
            />
        </article>
    );
}

export default BlogDetails;