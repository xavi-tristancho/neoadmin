import { describe, it, expect } from "vitest";
import { getDefinitionsDescription } from "../components/ui/Signature";

describe("regarding the getDefinitionsDescription function", () => {
  describe("when receiving undefined props", () => {
    it("should return an empty string", () => {
      const result = getDefinitionsDescription();
      const expectedResult = "";

      expect(result).toEqual(expectedResult);
    });
  });

  describe("when receiving an array with an object with props", () => {
    it("should return the props in the form of 'key: value'", () => {
      const result = getDefinitionsDescription([
        { prop: "a", description: "aa" },
      ]);
      const expectedResult = "a: aa";

      expect(result).toEqual(expectedResult);
    });
  });

  describe("when receiving an array with multiple objects with props", () => {
    it("should return the props in the form of 'key1: value1<br />key2: value2'", () => {
      const result = getDefinitionsDescription([
        { prop: "a", description: "aa" },
        { prop: "b", description: "bb" },
      ]);
      const expectedResult = "a: aa<br />b: bb";

      expect(result).toEqual(expectedResult);
    });
  });
});
