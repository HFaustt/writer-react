import { truncateTextProps } from "../types";

export function truncateText({ text, length }: truncateTextProps) {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + "...";
}
