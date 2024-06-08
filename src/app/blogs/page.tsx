import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import BlogPostComponent from "@/components/blogs/blogs_main_card";
import BlogPostGrid from "@/components/blogs/blogs_grid";



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

const Home = async () => {

  let otherBlogs: BlogPost[] = [];
  let latestBlogs: BlogPost | null = null;


  try {
    const data = await get(endpoints.getBlogs);
    if (data.latestblogs) {
      latestBlogs = data.latestblogs;
    }

    if (data.otherblogs) {
      otherBlogs = data.otherblogs;
    }

    console.log("api done");
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
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
          <BlogPostComponent post={latestBlogs} />
          <BlogPostGrid posts={otherBlogs} />
        </div>
      </section>
    </>
  );
}

export default Home;