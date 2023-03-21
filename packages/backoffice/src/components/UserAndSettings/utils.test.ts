import { describe, it, expect } from "vitest";
import stringAvatar, { stringToColor } from "./utils";

describe("regarding UserAndSettings", () => {
  describe("regarding stringAvatar function", () => {
    describe("given a string", () => {
      describe("given a single word", () => {
        it("should return the first letter of the word", () => {
          const name = "Marc";
          return expect(stringAvatar(name).children).toBe("M");
        });
      });
      describe("given multiple", () => {
        it("should return the first letter of each word", () => {
          const name = "Miquel Angel";
          return expect(stringAvatar(name).children).toBe("MA");
        });
      });
    });
    describe("given an empty string", () => {
      it("should return the default value", () => {
        const name = "";
        return expect(stringAvatar(name).children).toBe("A");
      });
    });
  });

  describe("regarding stringToColor function", () => {
    describe("given a string", () => {
      it("should return a valid HEX color", () => {
        const name = "test";
        return expect(stringToColor(name)).toBe("#924436");
      });
    });
    describe("given same string input", () => {
      it("should return same HEX color ", () => {
        const input = "Hello, World!";
        const firstColor = stringToColor(input);
        const secondColor = stringToColor(input);
        expect(firstColor).toEqual(secondColor);
      });
    });
    describe("given an empty string input", () => {
      it("should return a default color", () => {
        const defaultColor = "#000000";
        const color = stringToColor();
        expect(color).toEqual(defaultColor);
      });
    });
  });
});
