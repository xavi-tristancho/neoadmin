import { describe, it, expect } from "vitest";
import getModelInitialLetter from "./authPage";

describe("regarding the authPage utils file", () => {
  describe("regarding the getModelInitialLetter function", () => {
    describe("given a path name", () => {
      it("should return the capital letter of the second element of path", () => {
        const path = "localhost/usuarios";
        return expect(getModelInitialLetter(path)).toBe("U");
      });
    });

    describe("given an empty route", () => {
      describe("given an empty string", () => {
        it("should return an empty string", () => {
          const path = "";
          return expect(getModelInitialLetter(path)).toBe("");
        });
      });

      describe("calling the function without arguments", () => {
        it("should return an empty string", () => {
          return expect(getModelInitialLetter()).toBe("");
        });
      });
    });
  });
});
