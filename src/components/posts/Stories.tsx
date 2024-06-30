import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { Post } from "../../types";
import { db } from "../../lib/firebaserConfig";
import ParseHTML from "../ParseHTML";

function Stories() {
  const [stories, setStories] = useState<Post[]>([]);

  async function getStories() {
    const storiesRef = ref(db, "posts/stories");
    const snapshot = await get(storiesRef);
    if (snapshot.exists()) {
      const stories = snapshot.val();
      setStories(Object.values(stories));
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
              <img
                src={story.heroImage}
                alt="heroImage"
                width={200}
                height={200}
              />
              <ParseHTML content={story.content} />
              <p>{story.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
