import MediaQueries from "../helpers/MediaQueries";
import styles from "./About.module.css";
import HdrWeakIcon from "@mui/icons-material/HdrWeak";

export default function About() {
  const currentYear = new Date().getFullYear();
  const { isLargeScreen, isMediumScreen, isSmallScreen, isXSmallScreen } =
    MediaQueries();

  function imgStyle() {
    if (isLargeScreen) {
      return {
        width: 550,
        height: "auto",
      };
    } else if (isMediumScreen) {
      return {
        width: 500,
        height: "auto",
      };
    } else if (isSmallScreen) {
      return {
        width: 400,
        height: "auto",
      };
    } else if (isXSmallScreen) {
      return {
        width: 380,
        height: "auto",
      };
    } else {
      return {
        width: "auto",
        height: "auto",
      };
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftHalf}>
          <HdrWeakIcon
            className={styles.icon}
            fontSize={`${
              isLargeScreen
                ? "medium"
                : isMediumScreen
                ? "medium"
                : isSmallScreen || isXSmallScreen
                ? "small"
                : "large"
            }`}
          />
          <h1 className={styles.header}>H.FAUST</h1>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            beatae temporibus facilis aperiam aliquid hic possimus veritatis id
            asperiores error, molestiae laborum cumque eligendi? Reiciendis,
            aspernatur! Doloremque aliquid, velit rerum optio delectus quis
            dolores possimus a dolore quam repudiandae facilis ducimus nulla
            modi.
          </p>
        </div>
        <div className={styles.rightHalf}>
          <img
            src="/about.png"
            alt="about me picture"
            className={styles.img}
            style={imgStyle()}
          />
        </div>
      </div>
      <footer className={styles.footer}>
        <img
          src="/glasses.png"
          alt="glasses"
          height={
            isMediumScreen ? 50 : isSmallScreen ? 30 : isXSmallScreen ? 29 : 70
          }
          width={
            isMediumScreen ? 50 : isSmallScreen ? 30 : isXSmallScreen ? 29 : 70
          }
          className={styles.svg}
        />
        <p>H.Faust © {currentYear}. All rights reserved.</p>
      </footer>
    </>
  );
}
