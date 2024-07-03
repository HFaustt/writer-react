import Stories from "../../../components/posts/Stories";
import GoBackBtn from "../../../components/ui/Buttons/GoBackBtn";

function StoriesPage() {
  return (
    <div>
      <GoBackBtn />
      <h1>Stories</h1>
      <section>
        <Stories />
      </section>
    </div>
  );
}

export default StoriesPage;
