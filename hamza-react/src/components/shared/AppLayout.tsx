import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import styles from "./AppLayout.module.css";
import { useMediaQueries } from "../../helpers/MediaQueries";

export default function AppLayout() {
  const { isMediumScreen } = useMediaQueries();
  return (
    <div className={styles.container}>
      <header
        className={isMediumScreen ? styles.headerMobile : styles.headerDesktop}
      >
        <NavBar />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
