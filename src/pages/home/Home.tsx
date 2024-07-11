import { HomePageButtons } from "../../components/ui/Buttons/Buttons";
import { svgStyle, useMediaQueries } from "../../helpers/MediaQueries";
import styles from "./Home.module.css";

//TODO: Make the page responsive

export default function Home() {
  const mediaQueries = useMediaQueries();
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <div className={styles.divContainer}>
        <div className={styles.leftHalf}>
          <h1 className={styles.leftHeader}>
            WRITER'S
            <br />
            <span>HOME</span>
          </h1>
          <footer className={styles.footer}>
            <img
              src="/whiteGlasses.png"
              alt="glasses"
              style={svgStyle(mediaQueries)}
              className={styles.svg}
            />
            <p>H.Faust © {currentYear}. All rights reserved</p>
          </footer>
        </div>
        <div className={styles.rightHalf}>
          <p className={styles.upperText}>
            Nisi minus suscipit alias neque tempore <br />
            necessitatibus ipsam cupiditate repudiandae cum vel atque,
            <br />
            laudantium quod adipisci
          </p>
          <h2 className={styles.rightHeader}>
            Meet <br /> <strong> The Writer </strong>
          </h2>

          <div className={styles.readButtons}>
            <HomePageButtons />
          </div>

          <div>
            <p className={styles.lowerText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              laudantium neque aliquam. Aliquam, commodi ex rerum beatae
              quisquam perspiciatis magnam deleniti ullam. Repudiandae,
              doloremque officia,
              <br />
              <span className={styles.blockquote}>
                - Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique, cupiditate.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
