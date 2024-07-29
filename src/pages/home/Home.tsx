import { HomePageButtons } from "../../components/ui/Buttons/Buttons";
import { svgStyle, useMediaQueries } from "../../helpers/MediaQueries";
import styles from "./Home.module.css";

//TODO: Make the page responsive

//* : use breakpoint depending on the website style, (in the case of this website, since i'm spliting the screen in two in most pages it's better to just use 3 breakpoints)

export default function Home() {
  const mediaQueries = useMediaQueries();
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <div className={styles.divContainer}>
        <div className={styles.leftHalf}>
          <p className={styles.leftUpperText}>
            Nisi minus suscipit alias neque tempore <br />
            necessitatibus ipsam cupiditate <br /> repudiandae cum vel atque,
          </p>

          <h1 className={styles.leftHeader}>
            WRITER'S
            <br />
            <span>HOME</span>
          </h1>

          <footer className={styles.footer}>
            <img
              src="/whiteGlasses.webp"
              alt="glasses"
              style={svgStyle(mediaQueries)}
              className={styles.svg}
            />
            <p>H.Faust © {currentYear}. All rights reserved</p>
          </footer>
        </div>
        <div className={styles.rightHalf}>
          <p className={styles.rightUpperText}>
            Nisi minus suscipit alias neque tempore <br />
            necessitatibus ipsam cupiditate repudiandae cum vel atque,
            <br />
            laudantium quod adipisci
          </p>
          <h2 className={styles.rightHeader}>
            JOURNEY
            <br /> <span>ALONG</span>
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
          <footer className={styles.mobileFooter}>
            <img
              src="/glasses.webp"
              alt="glasses"
              style={svgStyle(mediaQueries)}
              className={styles.svg}
            />
            <p>H.Faust © {currentYear}. All rights reserved</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
