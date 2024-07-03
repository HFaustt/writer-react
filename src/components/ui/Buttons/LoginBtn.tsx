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

export default LoginBtn;
