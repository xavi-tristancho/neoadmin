import { describe, it, expect } from "vitest";
import { isEmptyObject } from "./object";

describe("regarding the isEmptyObject function", () => {
  describe("given an empty object", () => {
    it("should return true", () => {
      const object = {};
      expect(isEmptyObject(object)).toBe(true);
    });
  });

  describe("given an object with values", () => {
    it("should return false", () => {
      const object = { id: 1 };
      expect(isEmptyObject(object)).toBe(false);
    });
  });
});
