import { useNavigate } from "react-router-dom";
import Blogs from "../../../components/posts/Blogs";
import GoBackBtn from "../../../components/ui/Buttons/GoBackBtn";

function BlogsPage() {
  return (
    <div>
      <GoBackBtn />
      <h1>Blogs</h1>
      <section>
        <Blogs />
      </section>
    </div>
  );
}

export default BlogsPage;
