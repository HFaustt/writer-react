import styles from "./NavBarButtons.module.css";
import { LoginBtn, LogoutBtn } from "../ui/Buttons/AuthButtons";
import { useAuth } from "../../auth/context/FirebaseAuth";

function NavAuthButtons() {
  const { currentUser } = useAuth();
  return (
    <div>
      {!currentUser && (
        <div className={styles.btns}>
          <LoginBtn />
        </div>
      )}
      {currentUser && (
        <>
          <LogoutBtn />
        </>
      )}
    </div>
  );
}

export default NavAuthButtons;
