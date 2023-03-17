import { describe, it, expect } from "vitest";
import { Field } from "../types";
import { getIndexInArray } from "./arrays";
import { removeIfNotVisible } from "./common";
import { defaultFormat } from "./inputMapper";

type Section = { fields: { property: string }[] };

describe("reagarding the utils", () => {
  describe("regarding the getIndexInArray function", () => {
    it("should return the correct index", () => {
      const currentSection: Section = {
        fields: [{ property: "c" }, { property: "d" }],
      };

      const sections: Section[] = [
        { fields: [{ property: "a" }, { property: "b" }] },
        { fields: [{ property: "aa" }, { property: "bb" }] },
        { fields: [{ property: "aaa" }, { property: "bbb" }] },
        { fields: [{ property: "c" }, { property: "d" }] },
      ];

      expect(getIndexInArray(sections, currentSection)).toEqual(3);
    });
  });

  describe("regarding the removeIfNotVisible function", () => {
    it("should return true by default", () => {
      expect(removeIfNotVisible()()).toEqual(true);
    });

    describe("given a show: false value", () => {
      it("should return false", () => {
        expect(
          removeIfNotVisible()({
            upsertOptions: { show: false },
          })
        ).toEqual(false);
      });
    });

    describe("given an empty object as upsertOptions", () => {
      it("should return true", () => {
        expect(
          removeIfNotVisible()({
            upsertOptions: {},
          })
        ).toEqual(true);
      });
    });

    describe("given a show: false value through the result of a function", () => {
      it("should receive the current item and return false", () => {
        const item = { id: 1 };
        expect(
          removeIfNotVisible(item)({
            upsertOptions: {
              show: (receivedItem) => {
                expect(receivedItem).toEqual(item);
                return false;
              },
            },
          })
        ).toEqual(false);
      });
    });
  });

  describe("regarding the defaultFormat function", () => {
    it("should return the correct value", () => {
      const state = {
        data: {
          a: 1,
        },
        aux: {
          b: 2,
        },
      };
      const field: Field = {
        type: "text",
        property: "a",
        name: "b",
      };
      expect(defaultFormat({ state, field })).toBeUndefined();
    });
  });
});
