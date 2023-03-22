import { describe, it, expect } from "vitest";
import { getSelectedOptions } from "./radioGroup";

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
