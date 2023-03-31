import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { describe, it, expect, vi } from "vitest";
import { DefaultField } from "../../../types";
import date from "./date";

describe("Regarding date function", () => {
  const field = {
    name: "date",
    label: "Date",
    type: "text",
  };
  const state = {
    date: "2022-01-01",
  };
  const handleChange = vi.fn();

  const format = ({
    state,
    field,
  }: {
    state: unknownObject;
    field: DefaultField;
  }) => state[field.name] as string;

  describe("when date is valid", () => {
    it("should return a valid date", () => {
      const result = date({
        field,
        state,
        handleChange,
        format,
      });
      expect(result.value).toEqual("2022-01-01");
    });
  });

  describe("when given date is invalid", () => {
    it("should return the same date", () => {
      const invaliDate = { ...state, date: "20220101T00:00:00.000Z" };
      const result = date({
        field,
        state: invaliDate,
        handleChange,
        format,
      });
      expect(result.value).toEqual("2022-01-01");
    });
  });
});
