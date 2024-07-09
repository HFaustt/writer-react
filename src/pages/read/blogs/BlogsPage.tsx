import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { GoBackBtn } from "../../../components/ui/Buttons/Buttons";
import { BlogPost } from "../../../types";
import { db } from "../../../lib/firebaseConfig";
import Post from "../../../components/posts/Post";
import Loader from "../../../components/shared/Loader";
import styles from "./BlogsPage.module.css";

function BlogsPage() {
  const navigate = useNavigate();
  function onGoingBack() {
    navigate("/read");
  }

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <GoBackBtn onClick={onGoingBack} />
      <h1>Blogs</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.container}>
          {blogs.map((blog, index) => (
            <Post
              key={index}
              title={blog.title}
              author={blog.author}
              heroImage={blog.heroImage}
              content={blog.content}
              link={`/read/blogs/${blog.blogId}`}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default BlogsPage;
