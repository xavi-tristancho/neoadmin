import { describe, it, expect, vi } from "vitest";
import { Field, Option } from "@neoco/neoco-form/src/types";
import radiogroup, {
  getName,
  getOptions,
  getSelectedOptions,
} from "./radioGroup";

describe("regarding getSelectedOptions function", () => {
  describe("given a state with a name defined", () => {
    describe("and relation has a name property", () => {
      it("should return the value from state.data[relation.name]", () => {
        const relation = {
          name: "name",
          nameProps: [],
          primaryKey: "id",
        };
        const property = "testProperty";
        const state = {
          data: { id: 1, name: "John", age: 25 },
        };
        expect(getSelectedOptions({ state, relation, property })).toEqual(
          "John"
        );
      });
    });
  });

  describe("and relation has no name property", () => {
    it("should return the value from state.data[property]", () => {
      const relation = {
        name: "name",
        nameProps: [],
        primaryKey: "id",
      };
      const property = "age";
      const state = {
        data: { id: 1, age: 25 },
      };
      expect(getSelectedOptions({ state, relation, property })).toEqual(25);
    });
  });

  describe("when there is no relation.name and property value does not match any state.data key", () => {
    it("should return undefined", () => {
      const relation = {
        name: "name",
        nameProps: [],
        primaryKey: "id",
      };
      const property = "address";
      const state = {
        data: { id: 1, age: 25 },
      };
      expect(getSelectedOptions({ state, relation, property })).toEqual(
        undefined
      );
    });
  });
});

describe("regarding getOptions function", () => {
  describe("when aux data exists", () => {
    it("should return options with mapped value and label fields ", () => {
      const name = "test";
      const nameProps = ["name"];
      const primaryKey = "id";
      const state = {
        aux: {
          [name]: [
            { id: "1", name: "Option 1" },
            { id: "2", name: "Option 2" },
          ],
        },
      };
      expect(getOptions({ state, name, nameProps, primaryKey })).toEqual([
        { value: "1", label: "Option 1", id: "1", name: "Option 1" },
        { value: "2", label: "Option 2", id: "2", name: "Option 2" },
      ]);
    });
  });
  describe("when aux data does not exist", () => {
    it("should return an empty array", () => {
      const name = "test";
      const nameProps = ["name"];
      const primaryKey = "id";
      const state = {};
      expect(getOptions({ state, name, nameProps, primaryKey })).toEqual([]);
    });
  });
});

describe("getName", () => {
  const item: Option = {
    value: "John",
  };
  it("should return a string with names joined by a space", () => {
    const nameProps = ["value"];
    expect(getName({ item, nameProps })).toEqual("John");
  });

  describe("when nameProps is not provided", () => {
    it("should return an empty string", () => {
      expect(getName({ item })).toEqual("");
    });
  });
});

describe("radiogroup", () => {
  const field: Field = {
    type: "relation-list",
    name: "age",
    property: "age",
    relation: {
      name: "test",
      nameProps: ["name"],
      primaryKey: "id",
    },
  };
  const state = {
    data: { id: 1, name: "John", age: 27 },
    aux: {
      test: [
        { id: "1", name: "Option 1", value: 27 },
        { id: "2", name: "Option 2", value: 23, default: true },
      ],
    },
  };
  const handleChange = vi.fn();

  describe(" when no relation or options prop is defined", () => {
    it("should throw an error", () => {
      const field: Field = { type: "text", name: "name", property: "age" };
      const state = {
        data: { id: 1, name: "John", age: 25 },
        aux: {
          b: 2,
        },
      };
      expect(() => radiogroup({ field, state, handleChange })).toThrow();
    });
  });

  it("should return an object with value, defaultValue, options, and onChange fields", () => {
    const radiogroupOutput = radiogroup({ field, state, handleChange });
    expect(Object.keys(radiogroupOutput)).toEqual([
      "value",
      "defaultValue",
      "options",
      "onChange",
    ]);
  });

  it("should set the selected option as the value", () => {
    const radiogroupOutput = radiogroup({ field, state, handleChange });
    expect(radiogroupOutput.value).toEqual(27);
  });

  describe("when there is a default option", () => {
    it("should set the default option as the defaultValue", () => {
      const radiogroupOutput = radiogroup({ field, state, handleChange });
      expect(radiogroupOutput.defaultValue).toEqual(23);
    });
  });
});
