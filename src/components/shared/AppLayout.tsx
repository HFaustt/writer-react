import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import styles from "./AppLayout.module.css";
import MediaQueries from "../../helpers/MediaQueries";

export default function AppLayout() {
  const { isMediumScreen } = MediaQueries();
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
