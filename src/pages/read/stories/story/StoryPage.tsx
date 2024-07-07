import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, getDatabase, ref, remove } from "firebase/database";
import { StoryPost } from "../../../../types";
import { db } from "../../../../lib/firebaseConfig";
import ParseHTML from "../../../../components/ParseHTML";
import GoBackBtn from "../../../../components/ui/Buttons/GoBackBtn";
import DeleteBtn from "../../../../components/ui/Buttons/DeleteBtn";
import { useAuth0 } from "@auth0/auth0-react";

function StoryPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const { id: storyId } = useParams();
  const [story, setStory] = useState<StoryPost | null>(null);

  useEffect(() => {
    async function fetchStory() {
      const storyRef = ref(db, `posts/stories/${storyId}`);
      const snapshot = await get(storyRef);
      if (snapshot.exists()) {
        setStory(snapshot.val());
      }
    }

    fetchStory();
  }, [storyId]);

  if (!story) {
    return <div>Loading...</div>;
  }

  //TODO: The navigate is conflicting with the navigate(-1) in the '/read/stories' page when you delete a post.

  async function onDelete(id: string) {
    const dbRef = ref(getDatabase(), `posts/stories/${id}`);
    await remove(dbRef);
    navigate("/read/stories");
  }

  function onGoingBack() {
    navigate(-1);
  }

  return (
    <div>
      <GoBackBtn onClick={onGoingBack} />
      <div>Story ID: {storyId}</div>
      <h2>{story.title}</h2>
      {story.heroImage && (
        <img src={story.heroImage} alt="heroImage" width={200} height={200} />
      )}
      <div>
        <ParseHTML content={story.content} />
      </div>
      <p>Author: {story.author}</p>

      {isAuthenticated && (
        <div>
          <DeleteBtn id={storyId} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}

export default StoryPage;
