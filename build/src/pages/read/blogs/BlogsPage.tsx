import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { GoBackBtn } from "../../../components/ui/Buttons/Buttons";
import { BlogPost } from "../../../types";
import { db } from "../../../lib/firebaseConfig";
import Post from "../../../components/posts/Post";
import Loader from "../../../components/shared/Loader";
import styles from "./BlogsPage.module.css";
import UserBio from "../../../components/shared/UserBio";

function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const filteredBlogs = category
    ? blogs.filter((blog) => blog.category === category)
    : blogs;

  const blogImg = "/blogPic.png";

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

  function onGoingBack() {
    navigate("/read");
  }

  return (
    <div className={styles.heroContainer}>
      <GoBackBtn onClick={onGoingBack} />
      <div className={styles.container}>
        <div className={styles.leftSide}>
          {category && <h2 className={styles.category}>{category}</h2>}
          {isLoading ? (
            <div className={styles.loader}>
              <Loader />
            </div>
          ) : (
            <section className={styles.postsContainer}>
              {filteredBlogs.map((blog, index) => (
                <Post
                  key={index}
                  title={blog.title}
                  author={blog.author}
                  createdAt={blog.createdAt}
                  blogImg={blogImg}
                  category={blog.category}
                  heroImage={blog.heroImage}
                  content={blog.content}
                  link={`/read/blogs/${blog.blogId}`}
                />
              ))}
            </section>
          )}
        </div>

        <div className={styles.rightSide}>
          <div>
            <UserBio blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;
