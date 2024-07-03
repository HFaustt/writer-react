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
