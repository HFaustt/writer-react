import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, getDatabase, ref, remove } from "firebase/database";
import { BlogPost } from "../../../../types";
import { db } from "../../../../lib/firebaserConfig";
import ParseHTML from "../../../../components/ParseHTML";
import GoBackBtn from "../../../../components/ui/Buttons/GoBackBtn";
import DeleteBtn from "../../../../components/ui/Buttons/DeleteBtn";
import { useAuth0 } from "@auth0/auth0-react";

function StoryPage() {
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      const blogRef = ref(db, `posts/blogs/${blogId}`);
      const snapshot = await get(blogRef);
      if (snapshot.exists()) {
        setBlog(snapshot.val());
      }
    }

    fetchBlog();
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  async function onDelete(id: string) {
    const dbRef = ref(getDatabase(), `posts/blogs/${id}`);
    await remove(dbRef);
    navigate("/read/blogs");
  }

  function onGoingBack() {
    navigate(-1);
  }

  return (
    <div>
      <GoBackBtn onClick={onGoingBack} />
      <div>blog ID: {blogId}</div>
      <h2>{blog.title}</h2>
      {blog.heroImage && (
        <img src={blog.heroImage} alt="heroImage" width={200} height={200} />
      )}
      <div>
        <ParseHTML content={blog.content} />
      </div>

      <p>Author: {blog.author}</p>

      {isAuthenticated && (
        <div>
          <DeleteBtn id={blogId} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}

export default StoryPage;
