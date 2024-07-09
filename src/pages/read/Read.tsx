import { useNavigate } from "react-router-dom";
import styles from "./Read.module.css";
import { ReadPageButtons } from "../../components/ui/Buttons/Buttons";

export default function Read() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.leftHalf}>
        <ReadPageButtons onClick={() => navigate("/read/stories")}>
          Read Stories
        </ReadPageButtons>
      </div>
      <div className={styles.rightHalf}>
        <ReadPageButtons onClick={() => navigate("/read/blogs")}>
          Read Blogs
        </ReadPageButtons>
      </div>
    </div>
  );
}
