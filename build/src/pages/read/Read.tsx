import { useNavigate } from "react-router-dom";
import styles from "./Read.module.css";
import { ReadPageButtons } from "../../components/ui/Buttons/Buttons";

export default function Read() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.leftHalf}>
        <div className={styles.leftSide}>
          <p>Want to Expand</p>
          <h2> your imagination?</h2>
          <ReadPageButtons onClick={() => navigate("/read/stories")}>
            Awesome Fictional Stories
          </ReadPageButtons>
        </div>
      </div>

      <div className={styles.rightHalf}>
        <div className={styles.rightSide}>
          <p>Want to satisfy</p>
          <h2> Your Curiosity?</h2>
          <ReadPageButtons onClick={() => navigate("/read/blogs")}>
            Different Educational Blogs
          </ReadPageButtons>
        </div>
      </div>
    </div>
  );
}
