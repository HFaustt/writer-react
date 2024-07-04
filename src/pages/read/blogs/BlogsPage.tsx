import { useNavigate } from "react-router-dom";
import Blogs from "../../../components/posts/Blogs";
import GoBackBtn from "../../../components/ui/Buttons/GoBackBtn";

function BlogsPage() {
  const navigate = useNavigate();
  function onGoingBack() {
    navigate("/read");
  }
  return (
    <div>
      <GoBackBtn onClick={onGoingBack} />
      <h1>Blogs</h1>
      <section>
        <Blogs />
      </section>
    </div>
  );
}

export default BlogsPage;
