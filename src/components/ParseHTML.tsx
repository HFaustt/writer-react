import parse from "html-react-parser";
import { dataProps } from "../types";

export default function ParseHTML({ content }: dataProps) {
  return <div>{parse(content)}</div>;
}
