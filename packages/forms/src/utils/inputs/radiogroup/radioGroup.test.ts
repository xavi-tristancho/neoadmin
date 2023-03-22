import { describe, it, expect } from "vitest";
import { getOptions, getSelectedOptions } from "./radioGroup";

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
