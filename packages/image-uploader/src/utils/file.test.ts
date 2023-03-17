import { describe, it, expect } from "vitest";
import { blobToBase64 } from "./file";

describe("Regarding blobToBase64 function", () => {
  describe("when a valid blob is passed", () => {
    it("should return a promise", () => {
      const blob = new Blob(["Hello, world!"], { type: "text/plain" });
      const result = blobToBase64(blob);
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
