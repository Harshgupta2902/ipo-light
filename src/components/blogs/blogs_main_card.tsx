import React from 'react';
import { BlogPostMainCardProps } from '../interfaces';
import Loader from '@/app/Loader';
import Image from 'next/image';
import ImageFallback from '../common/ImageFallback';


const BlogPostComponent: React.FC<BlogPostMainCardProps> = ({ post }) => {
    if (!post) {
        return;
    }
    return (
        <div className="row gy-4 lg:gy-0">
            <div className="lg:col-6">
                <Image
                    alt={post.alt_keyword ?? ""}
                    loading="lazy"
                    width="500"
                    height="250"
                    decoding="async"
                    className="rounded"
                    src={post.image}
                />
            </div>
            <div className="lg:col-6">
                <div className="flex space-x-3 items-center mb-3">
                    <ImageFallback
                        src={"/placeholder.png"}
                        width="30"
                        height="30"
                        className="inline-block w-6 h-6 rounded-full"
                        alt={post.author}
                    />
                    <p>
                        <span>by </span>
                        <span>{post.author}</span>
                    </p>
                    <div>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            className="inline-block"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path>
                        </svg>
                        {post.created_at}
                    </div>
                </div>
                <a href={`/blogs/${post.category}/${post.slug}`}>
                    <h2 className="text-dark  mb-3 hover:text-primary">
                        {post.title}
                    </h2>
                </a>
                <p className="mb-4">{post.description}</p>
                <a className="btn btn-primary capitalize" href={`/blogs/${post.category}/${post.slug}`}>
                    Read More
                </a>
            </div>
        </div>
    );
};

export default BlogPostComponent;
