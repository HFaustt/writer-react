import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useMediaQuery } from "@mui/material";
import MobileNav from "./MobileNav";
import SocialMediaIcons from "./SocialMediaIcons";
import { useAuth } from "../../auth/context/FirebaseAuth";
import { LogButtons } from "../ui/Buttons/Buttons";

export default function NavBar() {
  function activeStyle({ isActive }: { isActive: boolean }) {
    return isActive ? styles.active : undefined;
  }

  const isMobile = useMediaQuery("(max-width: 768px)");

  const location = useLocation();
  let anchorEl: null | HTMLElement = null;
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  const { userName, currentUser } = useAuth();
  const isHomePage = location.pathname === "/";
  const isReadPage = location.pathname === "/read";

  return (
    <>
      {isMobile ? (
        <MobileNav />
      ) : (
        <nav
          className={
            isHomePage || isReadPage ? styles.homeNavItems : styles.navItems
          }
        >
          <Link to="/about" className={styles.logo}>
            <img
              src={
                isHomePage || isReadPage ? "/logoWhite.webp" : "/logoBlack.webp"
              }
              alt="logo"
              height={40}
              width={40}
            />
          </Link>

          {currentUser && (
            <p
              className={
                isHomePage || isReadPage ? styles.homeName : styles.name
              }
            >
              {userName}
            </p>
          )}

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

          <div className={styles.logButtons}>
            <LogButtons ariaDescribedBy={popoverId} />
          </div>

          <div className={styles.socialMediaIcons}>
            <SocialMediaIcons />
          </div>
        </nav>
      )}
    </>
  );
}
