export interface BlogPost {
  title: string;
  blogId: string | undefined;
  author?: string | undefined;
  heroImage: string;
  content: string;
  createdAt: number;
}

export interface StoryPost {
  title: string;
  storyId: string | undefined;
  author?: string | undefined;
  heroImage: string;
  content: string;
  createdAt: number;
}

export interface PostProps {
  title: string;
  author?: string;
  heroImage: string;
  content: string;
  link: string;
}

export interface dataProps {
  // title: string;
  // author?: string | undefined;
  // heroImage: string;
  content: string;
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

export interface truncateTextProps {
  text: string;
  length: number;
}

export interface WritePageButtonsProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export interface ReadPageButtonsProps {
  children: React.ReactNode;
  onClick: () => void;
}

export interface DeleteBtnProps {
  id: string | undefined;
  onDelete: (id: string) => void;
  ariaDescribedBy?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  sx?: object;
}

export type MediaQueries = {
  isXXLargeScreen: boolean;
  isXLargeScreen: boolean;
  isLargeScreen: boolean;
  isMediumScreen: boolean;
  isSmallScreen: boolean;
  isXSmallScreen: boolean;
};
