import { describe, it, expect } from "vitest";
import { Filter } from "./types";
import { operatorOptions, getNewFilters } from "./utils";

const columnOptions = [{ value: "col1", label: "col1" }];

describe("regarding the getNewFilters function", () => {
  describe("when creating the first filter", () => {
    it("should return the new filter with default values and mustUpdateDataWithFilters === false", () => {
      const currentStateFilters = [];
      const incomingFilters: Filter[] = [
        {
          columnField: { value: "", label: "" },
          operatorValue: { value: "", label: "" },
          value: "",
        },
      ];

      const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
        currentStateFilters,
        incomingFilters,
        columnOptions,
      });

      expect(newFilters).toEqual({
        filters: [
          {
            columnField: columnOptions[0],
            operatorValue: operatorOptions[0],
            value: "",
          },
        ],
      });
      expect(mustUpdateDataWithFilters).toEqual(false);
    });

    describe("when updating the only filter", () => {
      describe("leaving the value input at its initial value (empty)", () => {
        it("should return the filter with its new values and mustUpdateDataWithFilters === false", () => {
          const currentStateFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: operatorOptions[0],
              value: "",
            },
          ];
          const incomingFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[1]],
              value: "",
            },
          ];

          const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
            currentStateFilters,
            incomingFilters,
            columnOptions,
          });

          expect(newFilters).toEqual({
            filters: [
              {
                columnField: columnOptions[0],
                operatorValue: [operatorOptions[1]],
                value: "",
              },
            ],
          });
          expect(mustUpdateDataWithFilters).toEqual(false);
        });
      });

      describe("when at least changing the value input and completing the whole filter inputs", () => {
        it("should return the filter with its new values and mustUpdateDataWithFilters === true", () => {
          const currentStateFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: operatorOptions[0],
              value: "",
            },
          ];
          const incomingFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[1]],
              value: "abc",
            },
          ];

          const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
            currentStateFilters,
            incomingFilters,
            columnOptions,
          });

          expect(newFilters).toEqual({
            filters: [
              {
                columnField: columnOptions[0],
                operatorValue: [operatorOptions[1]],
                value: "abc",
              },
            ],
          });
          expect(mustUpdateDataWithFilters).toEqual(true);
        });
      });
    });
  });

  describe("when having one filter set", () => {
    describe("and adding a new filter", () => {
      it("should return the filters with the existing filter (with its values unchanged) and the new one (with default values) and mustUpdateDataWithFilters === false", () => {
        const currentStateFilters = [
          {
            columnField: columnOptions[0],
            operatorValue: [operatorOptions[1]],
            value: "abc",
          },
        ];
        const incomingFilters = [
          {
            columnField: columnOptions[0],
            operatorValue: [operatorOptions[1]],
            value: "abc",
          },
          {
            columnField: { value: "", label: "" },
            operatorValue: { value: "", label: "" },
            value: "",
          },
        ];

        const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
          currentStateFilters,
          incomingFilters,
          columnOptions,
        });

        expect(newFilters).toEqual({
          filters: [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[1]],
              value: "abc",
            },
            {
              columnField: columnOptions[0],
              operatorValue: operatorOptions[0],
              value: "",
            },
          ],
        });
        expect(mustUpdateDataWithFilters).toEqual(false);
      });

      describe("when modifying the values of the new filter leaving the value at its initial value (empty)", () => {
        it("should return the filters with the existing filter (with its values unchanged) and the new one (with the new values) and mustUpdateDataWithFilters === false", () => {
          const currentStateFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[1]],
              value: "abc",
            },
            {
              columnField: columnOptions[0],
              operatorValue: operatorOptions[0],
              value: "",
            },
          ];
          const incomingFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[1]],
              value: "abc",
            },
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[3]],
              value: "",
            },
          ];

          const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
            currentStateFilters,
            incomingFilters,
            columnOptions,
          });

          expect(newFilters).toEqual({
            filters: [
              {
                columnField: columnOptions[0],
                operatorValue: [operatorOptions[1]],
                value: "abc",
              },
              {
                columnField: columnOptions[0],
                operatorValue: [operatorOptions[3]],
                value: "",
              },
            ],
          });
          expect(mustUpdateDataWithFilters).toEqual(false);
        });
      });

      describe("when modifying the values of the existing complete filter leaving the new filter incomplete", () => {
        it("should return the filters with the existing filter (with its values changed) and the new one (with its incomplete values unchanged) and mustUpdateDataWithFilters === true", () => {
          const currentStateFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[1]],
              value: "abc",
            },
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[3]],
              value: "",
            },
          ];
          const incomingFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[4]],
              value: "abc",
            },
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[3]],
              value: "",
            },
          ];

          const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
            currentStateFilters,
            incomingFilters,
            columnOptions,
          });

          expect(newFilters).toEqual({
            filters: [
              {
                columnField: columnOptions[0],
                operatorValue: [operatorOptions[4]],
                value: "abc",
              },
              {
                columnField: columnOptions[0],
                operatorValue: [operatorOptions[3]],
                value: "",
              },
            ],
          });
          expect(mustUpdateDataWithFilters).toEqual(true);
        });
      });

      describe("when modifying the values of the new incomplete filter leaving the existing filter unchanged", () => {
        it("should return the filters with the existing filter (with its values unchanged) and the new one (with its values completed) and mustUpdateDataWithFilters === true", () => {
          const currentStateFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[4]],
              value: "abc",
            },
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[3]],
              value: "12",
            },
          ];
          const incomingFilters = [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[4]],
              value: "abc",
            },
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[3]],
              value: "123",
            },
          ];

          const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
            currentStateFilters,
            incomingFilters,
            columnOptions,
          });

          expect(newFilters).toEqual({
            filters: [
              {
                columnField: columnOptions[0],
                operatorValue: [operatorOptions[4]],
                value: "abc",
              },
              {
                columnField: columnOptions[0],
                operatorValue: [operatorOptions[3]],
                value: "123",
              },
            ],
          });
          expect(mustUpdateDataWithFilters).toEqual(true);
        });
      });
    });

    describe("when removing the last filter", () => {
      it("should return an empty array of filters and mustUpdateDataWithFilters === true", () => {
        const currentStateFilters = [
          {
            columnField: columnOptions[0],
            operatorValue: [operatorOptions[4]],
            value: "abc",
          },
        ];
        const incomingFilters = [];

        const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
          currentStateFilters,
          incomingFilters,
          columnOptions,
        });

        expect(newFilters).toEqual({
          filters: [],
        });
        expect(mustUpdateDataWithFilters).toEqual(true);
      });
    });
  });

  describe("when having two complete filters set", () => {
    describe("and removing one filter", () => {
      it("should return the remaining filter (with its values unchanged) and mustUpdateDataWithFilters === true", () => {
        const currentStateFilters = [
          {
            columnField: columnOptions[0],
            operatorValue: [operatorOptions[4]],
            value: "abc",
          },
          {
            columnField: columnOptions[0],
            operatorValue: [operatorOptions[3]],
            value: "123",
          },
        ];
        const incomingFilters = [
          {
            columnField: columnOptions[0],
            operatorValue: [operatorOptions[4]],
            value: "abc",
          },
        ];

        const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
          currentStateFilters,
          incomingFilters,
          columnOptions,
        });

        expect(newFilters).toEqual({
          filters: [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[4]],
              value: "abc",
            },
          ],
        });
        expect(mustUpdateDataWithFilters).toEqual(true);
      });
    });
  });

  describe("when having two filters set; One complete and the other one incomplete", () => {
    describe("and removing the incomplete filter", () => {
      it("should return the remaining filter (with its values unchanged) and mustUpdateDataWithFilters === false", () => {
        const currentStateFilters = [
          {
            columnField: columnOptions[0],
            operatorValue: [operatorOptions[4]],
            value: "abc",
          },
          {
            columnField: columnOptions[0],
            operatorValue: operatorOptions[0],
            value: "",
          },
        ];
        const incomingFilters = [
          {
            columnField: columnOptions[0],
            operatorValue: [operatorOptions[4]],
            value: "abc",
          },
        ];

        const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
          currentStateFilters,
          incomingFilters,
          columnOptions,
        });

        expect(newFilters).toEqual({
          filters: [
            {
              columnField: columnOptions[0],
              operatorValue: [operatorOptions[4]],
              value: "abc",
            },
          ],
        });
        expect(mustUpdateDataWithFilters).toEqual(false);
      });
    });
  });
});
