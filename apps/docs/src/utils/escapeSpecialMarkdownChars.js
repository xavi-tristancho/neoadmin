import { isStringOrNumber } from "./checker";

export const escapeSpecialMarkdownChars = (string) =>
  isStringOrNumber(string) ? string?.toString().replace(/\|/g, "\\|") : "";
