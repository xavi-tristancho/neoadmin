import { describe, it, expect } from "vitest";
import { getRoutePath } from "./routes";

describe("regarding the getRoutePath function", () => {
  describe("given an object", () => {
    describe("given a 'path'", () => {
      describe("given a value as string", () => {
        describe("given a string with backslash", () => {
          it("should return the path value with backslash", () => {
            const route = { path: "/customers" };

            expect(getRoutePath(route)).toBe("/customers");
          });
        });

        describe("given a string without backslash", () => {
          it("should return the path value with backslash", () => {
            const route = { path: "customers" };

            expect(getRoutePath(route)).toBe("/customers");
          });
        });
      });

      describe("given any value but a string", () => {
        it("should return an empty string", () => {
          const route = { path: 2 };

          expect(getRoutePath(route)).toBe("");
        });
      });
    });

    describe("given an object without 'path'", () => {
      it("should return an empty string", () => {
        const route = { color: "blue" };

        expect(getRoutePath(route)).toBe("");
      });
    });
  });

  describe("given a string", () => {
    describe("given a string with backslash", () => {
      it("should return the string with the backslash", () => {
        const route = "/customers";

        expect(getRoutePath(route)).toBe("/customers");
      });
    });

    describe("given a string without backslash", () => {
      it("should return the string with the backslash", () => {
        const route = "customers";

        expect(getRoutePath(route)).toBe("/customers");
      });
    });
  });

  describe("given not an object nor a string", () => {
    it("should return an empty string", () => {
      const route = 2;

      expect(getRoutePath(route)).toBe("");
    });
  });
});
