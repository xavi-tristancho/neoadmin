import { describe, it, expect, vi } from "vitest";
import { Field } from "../types";
import { getIndexInArray } from "./arrays";
import { removeIfNotVisible } from "./common";
import {
  CustomEvent,
  defaultFormat,
  defaultHandleChange,
  getDisabled,
  getFromat,
  getHandleChange,
  zeroNeededFormat,
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
            type: "text",
            upsertOptions: { show: false },
          })
        ).toEqual(false);
      });
    });

    describe("given an empty object as upsertOptions", () => {
      it("should return true", () => {
        expect(
          removeIfNotVisible()({
            type: "text",
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
            type: "text",
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
    describe("given a field with a name defined", () => {
      it("should return state.data[field.name]", () => {
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
    });
    describe("given a field without a property name defined", () => {
      it("should return state.data[field.property]", () => {
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
    });
    describe("given a field with a property name defined but that doesn't exist in state.data", () => {
      it("should return state.data[field.property]", () => {
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
    });
    describe("if field.name and field.property are not defined", () => {
      it("should return undefined", () => {
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
    describe("given a field with a format function defined", () => {
      it("should return that function", () => {
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
    });
    describe("given a field without a format function", () => {
      it("should return the defaultFormat function", () => {
        const field: Field = {
          type: "text",
          name: "name",
          property: "age",
        };
        const result = getFromat({ field });
        expect(result).toEqual(defaultFormat);
      });
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

  describe("regarding the getHandleChange function", () => {
    describe("when field.upsertOptions?.onChange is not defined", () => {
      it("should return the defaultHandleChange function", () => {
        const field: Field = {
          type: "text",
          name: "name",
          property: "age",
        };
        const handleChange = vi.fn();
        const defaultResult = defaultHandleChange(handleChange);
        const result = getHandleChange({ field, handleChange });
        expect(result.toString()).toEqual(defaultResult.toString());
      });
    });
    describe("when field.upsertOptions?.onChange is defined", () => {
      it("should return a function that calls the onChange function", async () => {
        const field: Field = {
          type: "text",
          name: "name",
          property: "age",
          upsertOptions: {
            onChange: vi.fn(),
          },
        };
        const handleChange = vi.fn();
        const result = getHandleChange({ field, handleChange });
        expect(result).not.toEqual(defaultHandleChange(handleChange));
        expect(field.upsertOptions?.onChange).not.toHaveBeenCalled();
        await result({ target: { name: "name", value: "John" } });
        expect(field.upsertOptions?.onChange).toHaveBeenCalledWith({
          name: "name",
          value: "John",
        });
      });
    });
  });

  describe("regarding the getDisabled function", () => {
    const state = {
      data: { id: 1, name: "John", age: 25 },
      aux: {
        b: 2,
      },
    };
    it("should return false by default", () => {
      const field: Field = {
        type: "text",
        name: "name",
        property: "age",
      };
      const result = getDisabled({ field, state });
      expect(result).toEqual(false);
    });

    describe("if disabled is not a function", () => {
      it("should return the value of the disabled property", () => {
        const field: Field = {
          type: "text",
          name: "name",
          property: "age",
          disabled: true,
        };
        const result = getDisabled({ field, state });
        expect(result).toEqual(true);
      });
    });
    describe("if disabled is a function", () => {
      it("should return the result of the disabled function", () => {
        const field: Field = {
          type: "text",
          name: "name",
          property: "age",
          disabled: (params) => {
            expect(params).toEqual({ field, state });
            return true;
          },
        };
        const result = getDisabled({ field, state });
        expect(result).toEqual(true);
      });
    });
  });

  describe("regarding the zeroNeededFormat function", () => {
    describe("with empty parameters", () => {
      it("should return '00'", () => {
        const result = zeroNeededFormat();
        expect(result).toEqual("00");
      });
    });

    describe("given a number under 10", () => {
      it("should return the number as string", () => {
        const result = zeroNeededFormat(5);
        expect(result).toEqual("05");
      });
    });

    describe("given a string", () => {
      it("should return '--'", () => {
        const result = zeroNeededFormat("abc");
        expect(result).toEqual("--");
      });
    });
  });
});
