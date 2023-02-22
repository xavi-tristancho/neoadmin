import { describe, it, expect } from "vitest";
import { getParsedCells } from "./tableParser";

describe("regarding the getParsedCells function", () => {
  describe("given an array of headers", () => {
    describe("that are strings", () => {
      describe("that does not contain the * symbol", () => {
        it("should return the same array of strings", () => {
          expect(getParsedCells(["Hi"])).toStrictEqual(["Hi"]);
        });
      });

      describe("that contains the * symbol", () => {
        it("should return the same array of strings with extra styling for the required (*) cells", () => {
          const required = "some*";
          expect(getParsedCells(["Hi", required])).toStrictEqual([
            "Hi",
            `<span style="color:var(--ifm-color-primary)">${required}</span>`,
          ]);
        });
      });
    });

    describe("that are empty strings", () => {
      it("should return an array of empty strings", () => {
        expect(getParsedCells([""])).toStrictEqual([""]);
      });
    });

    describe("that are not strings, objects or numbers", () => {
      it("should return an array of empty strings", () => {
        expect(getParsedCells([[], null, undefined])).toStrictEqual([
          "",
          "",
          "",
        ]);
      });
    });

    describe("that are numbers", () => {
      it("should return an array of the input numbers as strings", () => {
        expect(getParsedCells([2])).toStrictEqual(["2"]);
      });
    });

    describe("that are objects", () => {
      it("should return an array with the title property of every object", () => {
        expect(
          getParsedCells([{ title: "hola", align: "center" }])
        ).toStrictEqual(["hola"]);
      });

      describe("and are empty or not conaining the property title", () => {
        it("should return empty strings with vertical bar dividers", () => {
          expect(getParsedCells([{}, { align: "center" }])).toStrictEqual([
            "",
            "",
          ]);
        });
      });
    });
  });
});
