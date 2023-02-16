import { describe, it, expect } from "vitest";
import { isEmptyObject } from "./object";

describe("regarding the isEmptyObject function", () => {
  describe("given an empty object", () => {
    it("should return true", () => {
      const object = new Object();
      expect(isEmptyObject(object)).toBe(true);
    });
  });

  describe("given an object with values", () => {
    it("should return false", () => {
      const object = { id: 1 };
      expect(isEmptyObject(object)).toBe(false);
    });
  });

  describe("given an empty array", () => {
    it("should return false", () => {
      const object = new Array();
      expect(isEmptyObject(object)).toBe(false);
    });
  });

  describe("given a null", () => {
    it("should return false", () => {
      const object = null;
      expect(isEmptyObject(object)).toBe(false);
    });
  });

  describe("given an undefined", () => {
    it("should return false", () => {
      const object = undefined;
      expect(isEmptyObject(object)).toBe(false);
    });
  });
});
