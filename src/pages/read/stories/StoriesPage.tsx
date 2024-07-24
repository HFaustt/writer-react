import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../../../lib/firebaseConfig";
import Post from "../../../components/posts/Post";
import { GoBackBtn } from "../../../components/ui/Buttons/Buttons";
import { StoryPost } from "../../../types";
import styles from "./StoriesPage.module.css";
import Loader from "../../../components/shared/Loader";
import UserBio from "../../../components/shared/UserBio";

function StoriesPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const [stories, setStories] = useState<StoryPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const imgStory = "/storyPic.webp";

  async function getStories(): Promise<void> {
    const storiesRef = ref(db, "posts/stories");
    const snapshot = await get(storiesRef);
    if (snapshot.exists()) {
      const stories = snapshot.val();
      const storiesArray = Object.keys(stories).map((key) => ({
        ...stories[key],
        storyId: key,
      }));

      const sortedStories = storiesArray.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setStories(sortedStories);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getStories();
  }, []);

  const filteredStories = category
    ? stories.filter((story) => story.category === category)
    : stories;

  function onGoingBack() {
    navigate("/read");
  }

  return (
    <div className={styles.heroContainer}>
      <GoBackBtn onClick={onGoingBack} />
      <div className={styles.container}>
        <div className={styles.leftSide}>
          {category && <h2 className={styles.category}>{category}</h2>}
          {isLoading ? (
            <div className={styles.loader}>
              <Loader />
            </div>
          ) : (
            <section className={styles.postsContainer}>
              {filteredStories.map((story, index) => (
                <Post
                  key={index}
                  title={story.title}
                  author={story.author}
                  createdAt={story.createdAt}
                  storyImg={imgStory}
                  category={story.category}
                  heroImage={story.heroImage}
                  content={story.content}
                  link={`/read/stories/${story.storyId}`}
                />
              ))}
            </section>
          )}
        </div>

        <div className={styles.rightSide}>
          <div>
            <UserBio stories={stories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoriesPage;
