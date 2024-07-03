import { useAuth0 } from "@auth0/auth0-react";

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

export default SignupBtn;
