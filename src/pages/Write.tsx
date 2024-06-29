import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import styles from "./Write.module.css";

export default function Write() {
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY as string;
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <div className={styles.container}>
      <section>
        <Editor
          apiKey={apiKey}
          onInit={(_evt, editor) => {
            editorRef.current = editor;
          }}
          init={{
            height: 700,
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
              "quickimage",
            ],
            toolbar:
              "styles| bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            content_style:
              "body { font-family:Eczar,Arial,sans-serif; font-size:14px;}",
          }}
        />
      </section>
    </div>
  );
}
