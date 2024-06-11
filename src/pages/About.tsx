import {
  useMediaQueries,
  imgStyle,
  svgStyle,
  iconStyle,
} from "../helpers/MediaQueries";
import styles from "./About.module.css";
import HdrWeakIcon from "@mui/icons-material/HdrWeak";

export default function About() {
  const mediaQueries = useMediaQueries();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftHalf}>
          <HdrWeakIcon
            className={styles.icon}
            fontSize={iconStyle(mediaQueries)}
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
            style={imgStyle(mediaQueries)}
          />
        </div>
      </div>
      <footer className={styles.footer}>
        <img
          src="/glasses.png"
          alt="glasses"
          style={svgStyle(mediaQueries)}
          className={styles.svg}
        />
        <p>H.Faust © {currentYear}. All rights reserved.</p>
      </footer>
    </>
  );
}
