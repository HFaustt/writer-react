import styles from "./Read.module.css";

export default function Read() {
  return (
    <div className={styles.container}>
      <div className={styles.leftHalf}>
        <button>Latest stories</button>
      </div>
      <div className={styles.rightHalf}>
        <button>Latest blogs</button>
      </div>
    </div>
  );
}
