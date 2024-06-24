import { useAuth0 } from "@auth0/auth0-react";
import SignupBtn from "../ui/SignupBtn";
import LoginBtn from "../ui/LoginBtn";
import LogoutBtn from "../ui/LogoutBtn";
import styles from "./NavBarButtons.module.css";

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
