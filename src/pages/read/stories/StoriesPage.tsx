import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../../../lib/firebaseConfig";
import Post from "../../../components/posts/Post";
import { GoBackBtn } from "../../../components/ui/Buttons/Buttons";
import { StoryPost } from "../../../types";
import styles from "./StoriesPage.module.css"; // Import the styles for StoriesPage
import Loader from "../../../components/shared/Loader";

function StoriesPage() {
  const navigate = useNavigate();

  const [stories, setStories] = useState<StoryPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getStories() {
    const storiesRef = ref(db, "posts/stories");
    const snapshot = await get(storiesRef);
    if (snapshot.exists()) {
      const stories = snapshot.val();
      const storiesArray = Object.keys(stories).map((key) => ({
        ...stories[key],
        storyId: key,
      }));
      setStories(storiesArray);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getStories();
  }, []);

  function onGoingBack() {
    navigate("/read");
  }

  return (
    <div>
      <GoBackBtn onClick={onGoingBack} />
      <h1>Stories</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.container}>
          {stories.map((story, index) => (
            <Post
              key={index}
              title={story.title}
              author={story.author}
              heroImage={story.heroImage}
              content={story.content}
              link={`/read/stories/${story.storyId}`}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default StoriesPage;
