import { useAuth0 } from "@auth0/auth0-react";

import styles from "./NavBarButtons.module.css";
import { LoginBtn, LogoutBtn, SignupBtn } from "../ui/Buttons/AuthButtons";

function NavAuthButtons() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {!isAuthenticated && (
        <div className={styles.btns}>
          <SignupBtn />
          <LoginBtn />
        </div>
      )}
      {isAuthenticated && (
        <>
          <LogoutBtn />
        </>
      )}
    </div>
  );
}

export default NavAuthButtons;
