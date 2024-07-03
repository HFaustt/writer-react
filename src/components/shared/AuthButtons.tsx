import { useAuth0 } from "@auth0/auth0-react";

import styles from "./NavBarButtons.module.css";
import SignupBtn from "../ui/Buttons/SignupBtn";
import LoginBtn from "../ui/Buttons/LoginBtn";
import LogoutBtn from "../ui/Buttons/LogoutBtn";

function AuthButtons() {
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

export default AuthButtons;
