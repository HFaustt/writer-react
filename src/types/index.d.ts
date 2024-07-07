export interface BlogPost {
  title: string;
  blogId: string;
  author?: string | undefined;
  heroImage: string;
  content: string;
}

export interface StoryPost {
  title: string;
  storyId: string;
  author?: string | undefined;
  heroImage: string;
  content: string;
}

export interface dataProps {
  // title: string;
  // author?: string | undefined;
  // heroImage: string;
  content: string;
}

export interface deleteBtnProps {
  id: string | undefined;
  onDelete: (id: string) => void;
}

interface AuthContextType {
  userLoggedIn: boolean;
  currentUser: User | null;
  userName: string | null;
  setCurrentUser: (user: User | null) => void;
  sendSignInEmail: (email: string) => Promise<void>;
  completeSignInWithEmailLink: (
    email: string,
    emailLink: string
  ) => Promise<User | null>;
  signOut: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
