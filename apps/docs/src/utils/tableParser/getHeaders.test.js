import { describe, it, expect } from "vitest";
import { getHeaders } from "./tableParser";

describe("regarding the getHeaders function", () => {
  describe("given an array of headers", () => {
    describe("that are strings", () => {
      it("should return a string in headers format with a bottom divider", () => {
        expect(
          getHeaders({ headers: ["Name", "Default", "Description"] })
        ).toStrictEqual(`|Name|Default value|Description|\n|:-|:-:|:-|`);
      });
    });

    describe("that are empty strings", () => {
      it("should return a empty strings in headers format with a bottom divider", () => {
        expect(getHeaders({ headers: ["", ""] })).toStrictEqual(
          `|||\n|:-:|:-:|`
        );
      });
    });

    describe("that are not strings", () => {
      it("should return a empty strings if they are not strings or numbers in headers format with a bottom divider", () => {
        expect(getHeaders({ headers: [2, {}] })).toStrictEqual(
          `|2||\n|:-:|:-:|`
        );
      });
    });
  });

  describe("given a type", () => {
    describe("that corresponds to some element of types dictionary", () => {
      it("should return the headers of the specified type with a bottom divider", () => {
        expect(getHeaders({ type: "compact" })).toStrictEqual(
          `|Name|Options|Required|Type|Default|\n|:-|:-|:-:|:-:|:-:|`
        );
      });
    });
  });

  describe("given an array of headers and a type", () => {
    it("should return the headers formatted", () => {
      expect(
        getHeaders({ headers: ["Name", "Required"], type: "compact" })
      ).toStrictEqual(`|Name|Required|\n|:-|:-:|`);
    });
  });
});
