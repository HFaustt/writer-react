import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, getDatabase, ref, remove } from "firebase/database";
import { StoryPost } from "../../../../types";
import { db } from "../../../../lib/firebaseConfig";
import ParseHTML from "../../../../components/ParseHTML";
import GoBackBtn from "../../../../components/ui/Buttons/GoBackBtn";
import DeleteBtn from "../../../../components/ui/Buttons/DeleteBtn";
import { useAuth } from "../../../../auth/context/FirebaseAuth";
import { toast } from "react-hot-toast";

function StoryPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
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

  async function onDelete(id: string) {
    const dbRef = ref(getDatabase(), `posts/stories/${id}`);
    await remove(dbRef);
    navigate("/read/stories");
    toast.success("Story deleted successfully");
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

      {currentUser && (
        <div>
          <DeleteBtn id={storyId} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}

export default StoryPage;
