import { endpoints } from "@/api/endpoints";
import BlogPostComponent from "@/components/blogs/blogs_main_card";
import BlogPostGrid from "@/components/blogs/blogs_grid";
import React from 'react';
import Loader from "@/app/Loader";


const fetchBlogs = async () => {
  try {
    const timestamp = new Date().toISOString();
    const response = await fetch(`${endpoints.getBlogs}?time=${timestamp}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching GmpIpo", error);
    throw error;
  }
};



const BlogsHomePage = async () => {
  let blogs = null;
  let loading = true;

  try {
    blogs = await fetchBlogs();
    loading = false;
  } catch (err) {
    console.error(`error ${err}`);
  } finally {
    loading = false;
  }

  if (loading) return <Loader />;


  return (
    <>

      <section >
        <div className="container">
          <div className="lg:col-6 mx-auto text-center mb-[4rem]">
            <h1 className="mb-3">Latest News</h1>
            <p>Read all latest blog posts</p>
          </div>

          <>
            {<BlogPostComponent post={blogs.latestblogs} />}
            {<BlogPostGrid posts={blogs.otherblogs} />}
          </>
        </div>
      </section>
    </>
  );
}

export default BlogsHomePage;