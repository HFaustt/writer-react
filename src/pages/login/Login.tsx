import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuth } from "../../auth/context/FirebaseAuth";
import { toast } from "react-hot-toast";

function Login() {
  const { userLoggedIn, sendSignInEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await sendSignInEmail(email);
        toast.success("Check your email for a login link");
      } catch (error) {
        setErrorMessage((error as Error).message);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to="/" replace={true} />}
      <div className={styles.info}>
        <p>
          This website was made for educational and learning puposes.
          <br />
          therefore, you are not allowed to sign in, write, delete, or edit any
          of the content that you see on this website.
          <br />
          Thank you for your understanding.
        </p>
      </div>
      <main className={styles.main}>
        <div className={styles.container}>
          <h3 className={styles.title}>Welcome Back</h3>
          <form onSubmit={onSubmit}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            {errorMessage && (
              <span className={styles.error}>{errorMessage}</span>
            )}
            <button
              type="submit"
              disabled={isSigningIn}
              className={
                isSigningIn
                  ? `${styles.button} ${styles.buttonDisabled}`
                  : styles.button
              }
            >
              {isSigningIn ? "Sending Link..." : "Send Sign-In Link"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
