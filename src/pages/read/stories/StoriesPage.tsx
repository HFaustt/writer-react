import { useNavigate } from "react-router-dom";
import Stories from "../../../components/posts/Stories";
import GoBackBtn from "../../../components/ui/Buttons/GoBackBtn";

function StoriesPage() {
  const navigate = useNavigate();
  function onGoingBack() {
    navigate("/read");
  }
  return (
    <div>
      <GoBackBtn onClick={onGoingBack} />
      <h1>Stories</h1>
      <section>
        <Stories />
      </section>
    </div>
  );
}

export default StoriesPage;
