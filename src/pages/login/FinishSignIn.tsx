import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useAuth } from "../../auth/context/FirebaseAuth";
import { auth } from "../../lib/firebaseConfig";

function FinishSignIn() {
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setCurrentUser } = useAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        // Prompt the user to provide their email
        email = window.prompt("Please provide your email for confirmation");
      }

      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem("emailForSignIn");
            setCurrentUser(result.user);
            setCompleted(true);
          })
          .catch((error) => {
            setError(error.message);
          });
      } else {
        setError("No email provided.");
      }
    } else {
      setError("Invalid sign-in link.");
    }
  }, [setCurrentUser]);

  if (completed) {
    return <Navigate to="/" />;
  }

  return (
    <div>{error ? <div>{error}</div> : <div>Completing sign-in...</div>}</div>
  );
}

export default FinishSignIn;
