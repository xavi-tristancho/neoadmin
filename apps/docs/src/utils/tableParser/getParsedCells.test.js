import { getParsedCells } from "./tableParser";

describe("regarding the getParsedCells function", () => {
  describe("given an array of headers", () => {
    describe("that are strings", () => {
      it("should return the same array of strings", () => {
        expect(getParsedCells(["Hi"])).toStrictEqual(["Hi"]);
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
          getParsedCells([{ title: "hola", align: "center" }]),
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
