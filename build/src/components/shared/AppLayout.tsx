import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import styles from "./AppLayout.module.css";
import { useMediaQueries } from "../../helpers/MediaQueries";

export default function AppLayout() {
  const { isMediumScreen } = useMediaQueries();
  return (
    <div className={styles.container}>
      <nav
        className={isMediumScreen ? styles.headerMobile : styles.headerDesktop}
      >
        <NavBar />
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
