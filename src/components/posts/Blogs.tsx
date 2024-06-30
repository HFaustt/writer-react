import { useEffect, useState } from "react";

import { get, ref } from "firebase/database";
import { Post } from "../../types";
import { db } from "../../lib/firebaserConfig";
import ParseHTML from "../ParseHTML";

function Blogs() {
  const [blogs, setBlogs] = useState<Post[]>([]);

  async function getBlogs() {
    const blogsRef = ref(db, "posts/blogs");
    const snapshot = await get(blogsRef);
    if (snapshot.exists()) {
      const blogs = snapshot.val();
      setBlogs(Object.values(blogs));
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
              <img
                src={blog.heroImage}
                alt="heroImage"
                width={200}
                height={200}
              />
              <ParseHTML content={blog.content} />
              <p>{blog.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
