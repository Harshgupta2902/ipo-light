import React from 'react';
import { BlogPostProps } from '../interfaces';



const BlogPost: React.FC<BlogPostProps> = ({ posts }) => {
    return (
        <div className="row mt-12">
            {posts.map((post, index) => (
                <div key={index} className="mb-14 md:col-6 lg:col-4">
                    <div className="bg-body  px-1">
                        <img
                            alt={post.alt_keyword}
                            loading="lazy"
                            width="400"
                            height="200"
                            decoding="async"
                            className="mb-6 w-full rounded"
                            src={`${post.image}?w=828&q=75`}
                        />
                        <div className="flex space-x-3 items-center mb-3">
                            <div className="inline-flex items-center justify-center border border-border  rounded-full w-8 h-8 text-dark ">
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
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
                                </svg>
                            </div>
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
                                <span className='pl-2 mt-2'>{post.created_at}</span>
                            </div>
                        </div>
                        <h4 className="mb-3 font-bold text-dark hover:text-primary  transition">
                            <a href={`/blogs/${post.category}/${post.slug}`}>
                                {post.title}
                            </a>
                        </h4>
                        <p className="mb-6">
                            {post.description}
                        </p>
                        <a className="capitalize font-medium" href={`/blogs/${post.category}/${post.slug}`}>
                            Read More
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogPost;
