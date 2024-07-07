import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/context/FirebaseAuth";

function LoginBtn() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("login")} style={{ cursor: "pointer" }}>
      Log in
    </button>
  );
}

function LogoutBtn() {
  const { signOut } = useAuth();
  return (
    <button style={{ cursor: "pointer" }} onClick={signOut}>
      Log Out
    </button>
  );
}

export { LoginBtn, LogoutBtn };
