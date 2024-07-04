import { useAuth0 } from "@auth0/auth0-react";

function LoginBtn() {
  const { loginWithRedirect } = useAuth0();

  async function handleLogin() {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  }
  return (
    <button onClick={handleLogin} style={{ cursor: "pointer" }}>
      Log in
    </button>
  );
}

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

function SignupBtn() {
  const { loginWithRedirect } = useAuth0();

  async function handleSignUp() {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  }

  return (
    <button style={{ cursor: "pointer" }} onClick={handleSignUp}>
      Sign Up
    </button>
  );
}

export { LoginBtn, LogoutBtn, SignupBtn };
