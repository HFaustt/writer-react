import parse from "html-react-parser";
import { dataProps } from "../types";

export default function ParseHTML({
  // title,
  // author,
  // heroImage,
  content,
}: dataProps) {
  return (
    <div>
      {/* <h2>{parse(title)}</h2> */}
      {/* <img src={heroImage} alt="hero image" /> */}
      <p>{parse(content)}</p>
      {/* {author && <p>{parse(author)}</p>} */}
    </div>
  );
}
