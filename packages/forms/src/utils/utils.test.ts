import { describe, it, expect, vi } from "vitest";
import { Field } from "../types";
import { getIndexInArray } from "./arrays";
import { removeIfNotVisible } from "./common";
import {
  CustomEvent,
  defaultFormat,
  defaultHandleChange,
  getFromat,
} from "./inputMapper";

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
    it("should return state.data[field.name] if field.name is defined", () => {
      const state = {
        data: { id: 1, name: "John", age: 25 },
        aux: {
          b: 2,
        },
      };
      const field: Field = { type: "text", name: "name", property: "age" };
      const result = defaultFormat({ state, field });
      expect(result).toEqual("John");
    });
    it("should return state.data[field.property] if field.name is not defined", () => {
      const state = {
        data: { id: 1, name: "John", age: 25 },
        aux: {
          b: 2,
        },
      };
      const field: Field = { type: "text", property: "age" };
      const result = defaultFormat({ state, field });
      expect(result).toEqual(25);
    });
    it("should return state.data[field.property] if field.name is defined but it doesn't exist in state.data", () => {
      const state = {
        data: { id: 1, name: "John", age: 25 },
        aux: {
          b: 2,
        },
      };
      const field: Field = { type: "text", name: "test", property: "age" };
      const result = defaultFormat({ state, field });
      expect(result).toEqual(25);
    });
    it("should return undefined if field.name and field.property are not defined", () => {
      const state = {
        data: { id: 1, name: "John", age: 25 },
        aux: {
          b: 2,
        },
      };
      const field: Field = { type: "text" };
      const result = defaultFormat({ state, field });
      expect(result).toEqual(undefined);
    });
  });
});

describe("regarding the getFromat function", () => {
  it("should return the format function if it is defined", () => {
    const field: Field = {
      type: "text",
      name: "name",
      property: "age",
      upsertOptions: {
        format: (value) => value as string,
      },
    };
    const result = getFromat({ field });
    expect(result).toEqual(field.upsertOptions?.format);
  });
  it("should return the defaultFormat function if it is not defined", () => {
    const field: Field = {
      type: "text",
      name: "name",
      property: "age",
    };
    const result = getFromat({ field });
    expect(result).toEqual(defaultFormat);
  });
});

describe("regarding the defaultHandleChange function", () => {
  it("should call the handleChange function with the correct value", () => {
    const event: CustomEvent = {
      target: {
        name: "name",
        value: "John",
      },
    };
    const handleChange = vi.fn();
    defaultHandleChange(handleChange)(event);
    expect(handleChange).toHaveBeenCalledWith({ name: "John" });
  });
});
