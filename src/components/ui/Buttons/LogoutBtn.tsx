import { useAuth0 } from "@auth0/auth0-react";

function LogoutBtn() {
  const { logout } = useAuth0();

  function handleLogout() {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  return (
    <button style={{ cursor: "pointer" }} onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LogoutBtn;
