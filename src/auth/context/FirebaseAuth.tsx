import { useContext, useState, useEffect } from "react";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { createContext } from "react";
import { AuthContextType, AuthProviderProps } from "../../types";
import { auth } from "../../lib/firebaseConfig";
import { toast } from "react-hot-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const WHITELISTED_EMAIL = import.meta.env.VITE_WHITELISTED_EMAIL as string;

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === WHITELISTED_EMAIL) {
        setCurrentUser(user);
        setUserName("Faust");
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setIsAuthenticating(false);
    });
    return unsubscribe;
  }, []);

  const sendSignInEmail = async (email: string): Promise<void> => {
    const actionCodeSettings = {
      url: `${window.location.origin}/write`,
      handleCodeInApp: true,
    };

    if (email === WHITELISTED_EMAIL) {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
    } else {
      throw new Error("Access denied. This email is not allowed.");
    }
  };

  const completeSignInWithEmailLink = async (
    email: string,
    emailLink: string
  ): Promise<User | null> => {
    try {
      const result = await signInWithEmailLink(auth, email, emailLink);
      window.localStorage.removeItem("emailForSignIn");
      return result.user;
    } catch (error) {
      console.error("Error signing in with email link:", error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    await auth.signOut();
    setCurrentUser(null);
    setUserName(null);
    setUserLoggedIn(false);
    toast.success("You have been signed out.");
  };

  const value: AuthContextType = {
    userLoggedIn,
    currentUser,
    userName,
    setCurrentUser,
    sendSignInEmail,
    completeSignInWithEmailLink,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
}
