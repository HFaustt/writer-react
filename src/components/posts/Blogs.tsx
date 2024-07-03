import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { BlogPost } from "../../types";
import { db } from "../../lib/firebaserConfig";
import ParseHTML from "../ParseHTML";
import { Link } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  async function getBlogs() {
    const blogsRef = ref(db, "posts/blogs");
    const snapshot = await get(blogsRef);
    if (snapshot.exists()) {
      const blogs = snapshot.val();
      const blogsArray = Object.keys(blogs).map((key) => ({
        ...blogs[key],
        blogId: key,
      }));
      setBlogs(blogsArray);
    }
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <div>
        {blogs?.map((blog, index) => (
          <div key={index}>
            <div>
              <h2>{blog.title}</h2>

              {blog.heroImage && (
                <img
                  src={blog.heroImage}
                  alt="heroImage"
                  width={200}
                  height={200}
                />
              )}

              <div>
                <ParseHTML content={blog.content} />
              </div>

              <Link to={`/read/blogs/${blog.blogId}`}>Read more...</Link>

              <p>{blog.author}</p>
              <p>{blog.blogId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
