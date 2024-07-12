import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, getDatabase, ref, remove } from "firebase/database";
import { BlogPost } from "../../../../types";
import { db } from "../../../../lib/firebaseConfig";
import ParseHTML from "../../../../components/ParseHTML";
import {
  DeleteBtn,
  GoBackBtn,
} from "../../../../components/ui/Buttons/Buttons";
import { useAuth } from "../../../../auth/context/FirebaseAuth";
import { toast } from "react-hot-toast";
import styles from "./BlogPage.module.css";
import { Button, Popover, Typography } from "@mui/material";
import Loader from "../../../../components/shared/Loader";

function BlogPage() {
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [readTime, setReadTime] = useState<number>(0);
  const [postDate, setPostDate] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    async function fetchBlog() {
      const blogRef = ref(db, `posts/blogs/${blogId}`);
      const snapshot = await get(blogRef);
      if (snapshot.exists()) {
        const blogData = snapshot.val();
        setBlog(blogData);

        const wordCount = blogData.content.split(" ").length;
        const readTime = Math.ceil(wordCount / 200);
        setReadTime(readTime);

        if (blogData.createdAt) {
          const date = new Date(blogData.createdAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          });
          setPostDate(`${formattedDate} at ${formattedTime}`);
        }
      }
    }

    fetchBlog();
  }, [blogId]);

  if (!blog) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  async function onDelete(id: string) {
    const dbRef = ref(getDatabase(), `posts/blogs/${id}`);
    await remove(dbRef);
    navigate("/read/blogs");
    toast.success("Blog deleted successfully");
  }

  function onGoingBack() {
    navigate(-1);
  }

  return (
    <>
      <div className={styles.goBackButton}>
        <GoBackBtn onClick={onGoingBack} />
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>{blog.title}</h2>

        <div className={styles.userInfo}>
          <img src="/blogPic.png" alt="user photo" width={40} height={40} />
          <div>
            <p>{blog.author}</p>
            <span>
              {readTime} min read . {postDate}
            </span>
          </div>
        </div>

        {blog.heroImage && (
          <div className={styles.heroImage}>
            <img
              src={blog.heroImage}
              alt="heroImage"
              width={700}
              height={467}
            />
          </div>
        )}
        <div className={styles.content}>
          <ParseHTML content={blog.content} />
        </div>
        {currentUser && (
          <div className={styles.deleteBtn}>
            <DeleteBtn
              id={blogId}
              onDelete={onDelete}
              ariaDescribedBy={popoverId}
              onClick={handleClick}
            />
            <Popover
              id={popoverId}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2 }}>
                Are you sure you want to delete this blog?
              </Typography>
              <Button onClick={() => onDelete(blogId!)}>Yes</Button>
              <Button onClick={handleClose}>No</Button>
            </Popover>
          </div>
        )}
      </div>
    </>
  );
}

export default BlogPage;
