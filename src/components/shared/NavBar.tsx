import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useMediaQuery } from "@mui/material";
import MobileNav from "./MobileNav";
import SocialMediaIcons from "./SocialMediaIcons";
import NavAuthButtons from "./NavAuthButtons";
import { useAuth } from "../../auth/context/FirebaseAuth";

export default function NavBar() {
  function activeStyle({ isActive }: { isActive: boolean }) {
    return isActive ? styles.active : undefined;
  }

  const isMobile = useMediaQuery("(max-width: 768px)");

  const location = useLocation();
  const { userName, currentUser } = useAuth();

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

          {currentUser && <p className={styles.name}>{userName}</p>}

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

            {currentUser && (
              <li>
                <NavLink to="/write" className={activeStyle}>
                  Write
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/read" className={activeStyle}>
                Read
              </NavLink>
            </li>
          </ul>

          <NavAuthButtons />

          <div className={styles.socialMediaIcons}>
            <SocialMediaIcons />
          </div>
        </nav>
      )}
    </>
  );
}
