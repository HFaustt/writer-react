import { svgStyle, useMediaQueries } from "../helpers/MediaQueries";
import styles from "./Home.module.css";

export default function Home() {
  const mediaQueries = useMediaQueries();
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <div className={styles.leftHalf}>
        <h1 className={styles.header}>WRITER'S HOME</h1>
        {/* <footer className={styles.footer}>
          <p>H.Faust © {currentYear}. All rights reserved</p>
        </footer> */}
      </div>
      <div className={styles.rightHalf}>
        <p>
          Lorem ipsum dolor.
          <br />
          Nisi minus suscipit alias neque tempore <br />
          necessitatibus ipsam cupiditate repudiandae cum vel atque,
          <br />
          laudantium quod adipisci
        </p>
        <h2>Meet the Writer</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          laudantium neque aliquam. Aliquam, commodi ex rerum beatae quisquam
          perspiciatis magnam deleniti ullam. Repudiandae, doloremque officia,
          nihil consequuntur deleniti suscipit quia eaque quae perspiciatis
          voluptate praesentium.
          <br />
          <span>
            - Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Similique, cupiditate.
          </span>
        </p>
      </div>
    </div>
  );
}
