import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import styles from "./Write.module.css";
import { push, ref, set } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../../lib/firebaseConfig";
import { toast } from "react-hot-toast";
import { WritePageButtons } from "../../components/ui/Buttons/Buttons";

export default function Write() {
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY as string;
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [heroImage, setHeroImage] = useState<File | string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetContent = () => {
    if (editorRef.current) {
      editorRef.current.setContent("");
    }
    setAuthor("");
    setTitle("");
    setHeroImage("");
  };

  const handleStoryImageUpload = async (file: File) => {
    const imageRef = storageRef(storage, `stories/${file.name}`);
    await uploadBytes(imageRef, file);
    return getDownloadURL(imageRef);
  };

  const handleBlogImageUpload = async (file: File) => {
    const imageRef = storageRef(storage, `blogs/${file.name}`);
    await uploadBytes(imageRef, file);
    return getDownloadURL(imageRef);
  };

  const handleSaveStory = async () => {
    if (editorRef.current) {
      const currentContent = editorRef.current.getContent().trim();
      if (currentContent) {
        setLoading(true);
        let imageUrl = "";
        if (heroImage instanceof File) {
          imageUrl = await handleStoryImageUpload(heroImage);
        }
        const newDocRef = push(ref(db, "posts/stories"));
        await set(newDocRef, {
          title,
          author,
          category,
          heroImage: imageUrl,
          content: currentContent,
          createdAt: Date.now(),
        });
        toast.success("Story saved successfully!");
        handleResetContent();
        setLoading(false);
      } else {
        toast.error("Please write something before saving.");
      }
    }
  };

  const handleSaveBlog = async () => {
    if (editorRef.current) {
      const currentContent = editorRef.current.getContent().trim();
      if (currentContent) {
        setLoading(true);
        let imageUrl = "";
        if (heroImage instanceof File) {
          imageUrl = await handleBlogImageUpload(heroImage);
        }
        const newDocRef = push(ref(db, "posts/blogs"));
        await set(newDocRef, {
          title,
          author,
          category,
          heroImage: imageUrl,
          content: currentContent,
          createdAt: Date.now(),
        });
        toast.success("Blog saved successfully!");
        handleResetContent();
        setLoading(false);
      } else {
        toast.error("Please write something before saving.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <section>
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="Title"
            className={styles.titleInput}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            className={styles.authorInput}
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className={styles.categoryInput}
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="file"
            className={styles.imageInput}
            id="image"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setHeroImage(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className={styles.editor}>
          <Editor
            apiKey={apiKey}
            onInit={(_evt, editor) => {
              editorRef.current = editor;
            }}
            init={{
              height: 650,
              menubar: true,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "charmap",
                "code",
                "fullscreen",
                "help",
                "image",
                "insertdatetime",
                "link",
                "lists",
                "media",
                "preview",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
              toolbar:
                "styles| bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
              content_style:
                "body { font-family:Eczar,Arial,sans-serif; font-size:14px;}",
            }}
          />
        </div>
      </section>
      <div className={styles.buttons}>
        <WritePageButtons onClick={handleSaveStory} disabled={loading}>
          Save Story
        </WritePageButtons>

        <WritePageButtons onClick={handleSaveBlog} disabled={loading}>
          Save Blog
        </WritePageButtons>
      </div>
    </div>
  );
}
