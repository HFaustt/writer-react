import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, getDatabase, ref, remove } from "firebase/database";
import { StoryPost } from "../../../../types";
import { db } from "../../../../lib/firebaseConfig";
import ParseHTML from "../../../../components/ParseHTML";
import { useAuth } from "../../../../auth/context/FirebaseAuth";
import { toast } from "react-hot-toast";
import {
  DeleteBtn,
  GoBackBtn,
} from "../../../../components/ui/Buttons/Buttons";
import styles from "./StoryPage.module.css";
import Loader from "../../../../components/shared/Loader";
import { Button, Popover, Typography } from "@mui/material";

function StoryPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id: storyId } = useParams();
  const [story, setStory] = useState<StoryPost | null>(null);
  const [readTime, setReadTime] = useState<number>(0);
  const [postDate, setPostDate] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    async function fetchStory() {
      const storyRef = ref(db, `posts/stories/${storyId}`);
      const snapshot = await get(storyRef);
      if (snapshot.exists()) {
        const storyData = snapshot.val();
        setStory(storyData);

        const wordCount = storyData.content.split(" ").length;
        const readTime = Math.ceil(wordCount / 200);
        setReadTime(readTime);

        if (storyData.createdAt) {
          const date = new Date(storyData.createdAt);
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

    fetchStory();
  }, [storyId]);

  if (!story) {
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
    const dbRef = ref(getDatabase(), `posts/stories/${id}`);
    await remove(dbRef);
    navigate("/read/stories");
    toast.success("Story deleted successfully");
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
        <h2 className={styles.title}>{story.title}</h2>

        <div className={styles.userInfo}>
          <img src="/user.webp" alt="user photo" width={40} height={40} />
          <div>
            <p>{story.author}</p>
            <span>
              {readTime} min read . {postDate}
            </span>
          </div>
        </div>

        {story.heroImage && (
          <div className={styles.heroImage}>
            <img src={story.heroImage} alt="heroImage" />
          </div>
        )}
        <div className={styles.content}>
          <ParseHTML content={story.content} />
        </div>
        {currentUser && (
          <div className={styles.deleteBtn}>
            <DeleteBtn
              id={storyId}
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
                Are you sure you want to delete this story?
              </Typography>
              <Button onClick={() => onDelete(storyId!)}>Yes</Button>
              <Button onClick={handleClose}>No</Button>
            </Popover>
          </div>
        )}
      </div>
    </>
  );
}

export default StoryPage;
