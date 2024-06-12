"use client"
import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import BlogPostComponent from "@/components/blogs/blogs_main_card";
import BlogPostGrid from "@/components/blogs/blogs_grid";
import React, { useEffect, useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  created_at: string;
  category: string;
  image: string;
  slug: string;
  alt_keyword: string;
  description: string;
  author: string;
}

const Home: React.FC = () => {
  const [latestBlogs, setLatestBlogs] = useState<BlogPost | null>(null);
  const [otherBlogs, setOtherBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      try {
        const data = await get(endpoints.getBlogs);
        if (isMounted) {
          if (data.latestblogs) {
            setLatestBlogs(data.latestblogs);
          }
          if (data.otherblogs) {
            setOtherBlogs(data.otherblogs);
          }
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching blog posts:", error);
          setError("Error loading blog details.");
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <section className="section !pb-0">
        <div className="container text-center">
          <div className="lg:col-6 mx-auto text-center">
            <h1 className="mb-3">Latest News</h1>
            <p>Read all latest blog posts</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              {latestBlogs && <BlogPostComponent post={latestBlogs} />}
              {otherBlogs &&
                <BlogPostGrid posts={otherBlogs} />
              }
            </>
          )}


        </div>
      </section>
    </>
  );
}

export default Home;