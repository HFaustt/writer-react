import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useMediaQuery } from "@mui/material";
import MobileNav from "./MobileNav";
import SocialMediaIcons from "./SocialMediaIcons";

export default function NavBar() {
  function activeStyle({ isActive }: { isActive: boolean }) {
    return isActive ? styles.active : undefined;
  }

  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();

  return (
    <>
      {isMobile ? (
        <MobileNav />
      ) : (
        <nav className={styles.navItems}>
          <Link to="/about" className={styles.logo}>
            <img
              src={
                location.pathname === "/" ? "/logoWhite.png" : "/logoBlack.png"
              }
              alt="logo"
              height={40}
              width={40}
            />
          </Link>
          <ul className={styles.navList}>
            <li>
              <NavLink to="/about" className={activeStyle}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={activeStyle}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/write" className={activeStyle}>
                Write
              </NavLink>
            </li>
            <li>
              <NavLink to="/read" className={activeStyle}>
                Read
              </NavLink>
            </li>
          </ul>
          <SocialMediaIcons />
        </nav>
      )}
    </>
  );
}
