import { Link, useNavigate } from "react-router-dom";
import ParseHTML from "../ParseHTML";
import { truncateText } from "../../helpers/truncateText";
import styles from "./Post.module.css";
import { PostProps } from "../../types";
import { useEffect, useState } from "react";

function Post({
  title,
  author,
  heroImage,
  content,
  link,
  category,
  createdAt,
  storyImg,
  blogImg,
}: PostProps) {
  const navigate = useNavigate();
  const [readTime, setReadTime] = useState<number>(0);
  const [timePassed, setTimePassed] = useState<string>("");

  function getReadTime() {
    const wordCount = content.split(" ").length;
    const readTime = Math.ceil(wordCount / 200);
    setReadTime(readTime);
  }

  function getTimeDifference(createdAt: number) {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = currentTime.getTime() - postTime.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  }

  function getTimePassed() {
    const timePassed = getTimeDifference(createdAt);
    setTimePassed(timePassed);
  }

  useEffect(() => {
    getReadTime();
    getTimePassed();
    const intervalId = setInterval(getTimePassed, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container} onClick={() => navigate(link)}>
      <div className={styles.post}>
        <div className={styles.info}>
          <div className={styles.userContainer}>
            {storyImg ? (
              <img src={storyImg} alt="user picture" />
            ) : (
              <img src={blogImg} alt="user picture" />
            )}
            <p className={styles.author}>{author}</p>
          </div>
          <h2>{title}</h2>
          <p className={styles.category}> {category} </p>

          <p className={styles.readTime}>
            {timePassed}. <span>{readTime} min read</span>
          </p>

          <div className={styles.content}>
            <ParseHTML content={truncateText({ text: content, length: 250 })} />
          </div>
          <Link to={link} className={styles.readMoreLink}>
            <p>Read more...</p>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          {heroImage && (
            <img
              src={heroImage}
              alt="heroImage"
              className={styles.image}
              onClick={() => navigate(link)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
