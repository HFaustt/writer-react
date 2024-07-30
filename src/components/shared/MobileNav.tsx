import { useState } from "react";
import styles from "./MobileNav.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Link, NavLink, useLocation } from "react-router-dom";
import SocialMediaIcons from "./SocialMediaIcons";
import { useAuth } from "../../auth/context/FirebaseAuth";

export default function MobileNav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isDarkPage = location.pathname === "/" || location.pathname === "/read";
  const isReadPage = location.pathname === "/read";

  const { currentUser } = useAuth();

  return (
    <nav className={isReadPage ? styles.mobileNavDark : styles.mobileNav}>
      <Link to="/about" className={styles.logo}>
        <img
          src={isReadPage ? "/logoWhite.webp" : "/logoBlack.webp"}
          alt="logo"
          height={30}
          width={30}
        />
      </Link>

      <div className={styles.icons}>
        <SocialMediaIcons />
      </div>

      {isOpen ? (
        <>
          <MenuOpenIcon onClick={() => setIsOpen(false)} />
          <div
            className={`${
              isDarkPage ? styles.mobileNavItems : styles.mobileNavItemsDark
            } ${isOpen ? styles.open : ""}`}
          >
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              {currentUser && (
                <li>
                  <NavLink to="/write">Write</NavLink>
                </li>
              )}

              <li>
                <NavLink to="/read">Read</NavLink>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <MenuIcon onClick={() => setIsOpen(true)} />
      )}
    </nav>
  );
}
