// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import "whatwg-fetch";

import { blobToBase64, getBase64FromUrl } from "./file";

describe("Regarding blobToBase64 function", () => {
  describe("when a valid blob is passed", () => {
    it("should return a promise", () => {
      const blob = new Blob(["Hello, world!"], { type: "text/plain" });
      const result = blobToBase64(blob);
      expect(result).toBeInstanceOf(Promise);
    });
  });
});

describe("Regarding getBase64FromUrl function", () => {
  describe("when a valid url is passed", () => {
    it("should return a promise", () => {
      const result = getBase64FromUrl("https://example.com");
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
