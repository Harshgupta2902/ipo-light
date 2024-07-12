"use client";

import { endpoints } from "@/api/endpoints";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
export default function InsertBlog() {
  const [formData, setFormData] = useState({
    post_name: "",
    short_description: "",
    description: "",
    image: null,
    alt_keyword: "",
    category: "IPO",
    author: "Admin",
    meta_title: "",
    robots: "index, follow",
    meta_description: "",
    meta_keywords: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "image" && formData.image instanceof File) {
          data.append(key, formData.image);
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    try {
      const response = await axios.post(endpoints.insertBlog, data);
      console.log("Blog post created successfully:", response.data);
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <section className="section">
      <div class="container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Post Details
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Post Name */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Post Name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      name="post_name"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Post name"
                      value={formData.post_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Post Description */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Post Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      name="short_description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Add description"
                      value={formData.short_description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Post body */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Post body
                  </label>
                  <div className="mt-2">
                    <div style={{ display: "flex" }}>
                      <textarea
                        value={formData.description}
                        required
                        name="description"
                        onChange={handleChange}
                        className="block w-6/12	 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter your Markdown here..."
                        rows={25}
                      />
                      <div style={{ width: "50%", marginLeft: "20px" }}>
                        <ReactMarkdown
                          remarkPlugins={[gfm]}
                          children={formData.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload post image
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 text-gray-300"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            name="image"
                            accept="image/gif, image/jpeg, image/png"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Image Alt Keyword
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      name="alt_keyword"
                      type="text"
                      placeholder="Alt Keyword"
                      value={formData.alt_keyword}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Blog Information
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="IPO">IPO</option>
                      <option value="Cryptocurrencies">Cryptocurrencies</option>
                      <option value="Investments">Investments</option>
                      <option value="Regulations">Regulations</option>
                      <option value="Market">Market</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Author
                  </label>
                  <div className="mt-2">
                    <select
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Harsh Gupta">Harsh Gupta</option>
                      <option value="Ravi Gupta">Ravi Gupta</option>
                      <option value="Pankaj Gupta">Pankaj Gupta</option>
                      <option value="Ronak Gupta">Ronak Gupta</option>
                      <option value="Vishal Gupta">Vishal Gupta</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Robots
                  </label>
                  <div className="mt-2">
                    <select
                      name="robots"
                      value={formData.robots}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="noindex, nofollow">
                        noindex, nofollow
                      </option>
                      <option value="nofollow, index">nofollow, index</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="index, follow">index, follow</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Meta
              </h2>
              <div className="mt-10">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Meta title
                </label>
                <div className="mt-2">
                  <input
                    required
                    name="meta_title"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Meta title"
                    value={formData.meta_title}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-10">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Meta Description
                </label>
                <div className="mt-2">
                  <textarea
                    required
                    name="meta_description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter meta description"
                    value={formData.meta_description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-10">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Meta Keywords
                </label>
                <div className="mt-2">
                  <textarea
                    required
                    name="meta_keywords"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter meta keywords"
                    value={formData.meta_keywords}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );

  return (
    <section className="py-4">
      <div className="container">
        <div className="card-header pb-4">
          <div className="d-lg-flex">
            <div className="col-6">
              <h1 className="mb-0 h2">Create a post</h1>
            </div>
            <div className="ms-auto my-auto mt-lg-0 mt-4">
              <div className="ms-auto my-auto">
                <a
                  href="https://ixora.narrato.io/cws/43232/project/71636/folder/105438"
                  target="_blank"
                  className="btn bg-gradient-primary btn-sm mb-0"
                >
                  &nbsp; Write Here
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card border">
              <div className="card-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Post name</label>
                        <input
                          required
                          name="post_name"
                          type="text"
                          className="form-control"
                          placeholder="Post name"
                          value={formData.post_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Short description</label>
                        <textarea
                          required
                          name="short_description"
                          className="form-control"
                          placeholder="Add description"
                          value={formData.short_description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Post body</label>
                        <textarea
                          required
                          name="description"
                          className="form-control"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Upload post image</label>
                        <input
                          className="form-control"
                          type="file"
                          name="image"
                          accept="image/gif, image/jpeg, image/png"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Image Alt Keyword</label>
                        <input
                          required
                          name="alt_keyword"
                          type="text"
                          className="form-control"
                          placeholder="Alt Keyword"
                          value={formData.alt_keyword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                          className="form-select"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option value="IPO">IPO</option>
                          <option value="Cryptocurrencies">
                            Cryptocurrencies
                          </option>
                          <option value="Investments">Investments</option>
                          <option value="Regulations">Regulations</option>
                          <option value="Market">Market</option>
                          <option value="Technology">Technology</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Author</label>
                        <select
                          className="form-select"
                          name="author"
                          value={formData.author}
                          onChange={handleChange}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Harsh Gupta">Harsh Gupta</option>
                          <option value="Ravi Gupta">Ravi Gupta</option>
                          <option value="Pankaj Gupta">Pankaj Gupta</option>
                          <option value="Ronak Gupta">Ronak Gupta</option>
                          <option value="Vishal Gupta">Vishal Gupta</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Meta title</label>
                        <input
                          required
                          name="meta_title"
                          type="text"
                          className="form-control"
                          placeholder="Meta title"
                          value={formData.meta_title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Robots</label>
                        <select
                          className="form-select"
                          name="robots"
                          value={formData.robots}
                          onChange={handleChange}
                        >
                          <option value="noindex, nofollow">
                            noindex, nofollow
                          </option>
                          <option value="nofollow, index">
                            nofollow, index
                          </option>
                          <option value="noindex, follow">
                            noindex, follow
                          </option>
                          <option value="index, follow">index, follow</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="mb-3">
                        <label className="form-label">Tags</label>
                        <textarea
                          name="tags"
                          className="form-control"
                          placeholder="Tags"
                          value={formData.tags}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Meta Description</label>
                      <textarea
                        name="meta_description"
                        className="form-control"
                        placeholder="Enter meta description"
                        value={formData.meta_description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Meta Keywords</label>
                      <textarea
                        name="meta_keywords"
                        className="form-control"
                        placeholder="Enter meta keywords"
                        value={formData.meta_keywords}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-12 text-start">
                      <button className="btn btn-primary w-100" type="submit">
                        Create post
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
