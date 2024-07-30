import { useLocation, useNavigate } from "react-router-dom";
import { BlogPost, StoryPost } from "../../types";
import styles from "./UserBio.module.css";
import { PostPageButton } from "../ui/Buttons/Buttons";

function UserBio({
  stories,
  blogs,
}: {
  stories?: StoryPost[];
  blogs?: BlogPost[];
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isStoriesPage = location.pathname === "/read/stories";
  const queryParams = new URLSearchParams(location.search);
  const currentCategory = queryParams.get("category");

  const storyCategories = stories?.map((story) => story.category as string);

  const uniqueStoryCategories = storyCategories?.reduce<string[]>(
    (acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    },
    []
  );

  const blogCategories = blogs?.map((blog) => blog.category as string);

  const uniqueBlogCategories = blogCategories?.reduce<string[]>((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  function handleCategoryClick(category: string) {
    if (currentCategory === category) {
      queryParams.delete("category");
    } else {
      queryParams.set("category", category);
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        {location.pathname === "/read/stories" ? (
          <h1>My Stories</h1>
        ) : (
          <h1>My Blogs</h1>
        )}
        <img
          src={
            location.pathname === "/read/stories"
              ? "/storyPic.webp"
              : "/blogPic.webp"
          }
          alt="user picture"
        />
      </div>
      <div className={styles.bio}>
        <h3>About Me</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem reiciendis voluptates aperiam numquam aspernatur
          quisquam accusantium rerum velit commodi? Hic ipsa, aut quam
          reprehenderit iure ex nam repellendus.
        </p>
      </div>

      <div className={styles.categories}>
        <h3>Categories</h3>
        {storyCategories ? (
          <ul>
            {uniqueStoryCategories?.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={currentCategory === category ? styles.active : ""}
              >
                {category}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {uniqueBlogCategories?.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={currentCategory === category ? styles.active : ""}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.button}>
        {isStoriesPage ? (
          <PostPageButton link="/read/blogs">My Blogs</PostPageButton>
        ) : (
          <PostPageButton link="/read/stories">My Stories</PostPageButton>
        )}
      </div>
    </div>
  );
}

export default UserBio;
