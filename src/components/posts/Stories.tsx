import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { StoryPost } from "../../types";
import { db } from "../../lib/firebaseConfig";
import ParseHTML from "../ParseHTML";
import { Link } from "react-router-dom";

function Stories() {
  const [stories, setStories] = useState<StoryPost[]>([]);

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
    }
  }

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div>
      <div>
        {stories?.map((story, index) => (
          <div key={index}>
            <div>
              <h2>{story.title}</h2>
              {story.heroImage && (
                <img
                  src={story.heroImage}
                  alt="heroImage"
                  width={200}
                  height={200}
                />
              )}
              <div>
                <ParseHTML content={story.content} />
              </div>
              <p>{story.author}</p>
              <p>{story.storyId}</p>
              <Link to={`/read/stories/${story.storyId}`}>Read more...</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
