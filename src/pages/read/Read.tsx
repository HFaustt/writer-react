import { useNavigate } from "react-router-dom";
import styles from "./Read.module.css";
import ReadButton from "../../components/ui/Buttons/ReadButtons";

export default function Read() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.leftHalf}>
        <ReadButton onClick={() => navigate("/read/stories")}>
          Latest stories
        </ReadButton>
      </div>
      <div className={styles.rightHalf}>
        <ReadButton onClick={() => navigate("/read/blogs")}>
          Latest blogs
        </ReadButton>
      </div>
    </div>
  );
}
