import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import styles from "./AppLayout.module.css";
import { useMediaQuery } from "@mui/material";

export default function AppLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={styles.container}>
      <header className={isMobile ? styles.headerMobile : styles.headerDesktop}>
        <NavBar />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
