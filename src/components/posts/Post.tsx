import { Link, useNavigate } from "react-router-dom";
import ParseHTML from "../ParseHTML";
import { truncateText } from "../../helpers/truncateText";
import styles from "./Post.module.css";
import { PostProps } from "../../types";

function Post({ title, author, heroImage, content, link }: PostProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.author}>{author}</p>
      {heroImage && (
        <img
          src={heroImage}
          alt="heroImage"
          width={200}
          height={200}
          className={styles.image}
          onClick={() => navigate(link)}
        />
      )}
      <div className={styles.content}>
        <ParseHTML content={truncateText({ text: content, length: 200 })} />
      </div>
      <Link to={link} className={styles.readMoreLink}>
        <p>Read more...</p>
      </Link>
    </div>
  );
}

export default Post;
