import { useNavigate } from "react-router-dom";
import styles from "./Read.module.css";

export default function Read() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.leftHalf}>
        <button onClick={() => navigate("/read/stories")}>
          Latest stories
        </button>
      </div>
      <div className={styles.rightHalf}>
        <button onClick={() => navigate("/read/blogs")}>Latest blogs</button>
      </div>
    </div>
  );
}
