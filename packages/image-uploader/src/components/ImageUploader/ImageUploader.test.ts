import { describe, it, expect } from "vitest";
import { getSrc } from "./ImageUploader";

describe("Regarding getSrc function", () => {
  describe("when a valid source is passed", () => {
    it("should return a string", () => {
      const source = {
        uri: "https://example.com",
        name: "example",
      };
      const result = getSrc(source);
      expect(result).toBe(source.uri);
    });
  });
});
