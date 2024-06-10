import { useState } from "react";
import styles from "./MobileNav.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Link, NavLink } from "react-router-dom";
import SocialMediaIcons from "./SocialMediaIcons";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.mobileNav}>
      <Link to="/about" className={styles.logo}>
        <img src="logo.jpeg" alt="logo" height={30} width={30} />
      </Link>

      <div className={styles.icons}>
        <SocialMediaIcons />
      </div>

      {isOpen ? (
        <>
          <MenuOpenIcon onClick={() => setIsOpen(false)} />
          <div
            className={`${styles.mobileNavItems} ${isOpen ? styles.open : ""}`}
          >
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/write">Write</NavLink>
              </li>
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
