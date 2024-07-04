import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import styles from "./Write.module.css";
import { push, ref, set } from "firebase/database";

import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../../lib/firebaserConfig";

export default function Write() {
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY as string;
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [heroImage, setHeroImage] = useState<File | string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  }, [editorRef.current]);

  const handleResetContent = () => {
    if (editorRef.current) {
      editorRef.current.setContent("");
    }
    setContent("");
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
    console.log("handleSaveStory triggered");
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
          heroImage: imageUrl,
          content: currentContent,
        });

        alert("Story saved successfully!");
        handleResetContent();
        setLoading(false);
      } else {
        alert("Please write something before saving.");
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
          heroImage: imageUrl,
          content: currentContent,
        });

        alert("Blog saved successfully!");
        handleResetContent();
        setLoading(false);
      } else {
        alert("Please write something before saving.");
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
            onEditorChange={(newContent) => setContent(newContent)}
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
        <button
          onClick={handleSaveStory}
          style={{ cursor: "pointer" }}
          disabled={loading}
        >
          Save Story
        </button>

        <button
          onClick={handleSaveBlog}
          style={{ cursor: "pointer" }}
          disabled={loading}
        >
          Save Blog
        </button>
      </div>
    </div>
  );
}
