import { describe, it, expect } from "vitest";
import {
  getColumnOptions,
  getInitialState,
  getFiltersSection,
  getOnlyCompleteFilters,
  getNormalizedFilters,
} from "./utils";

describe("regarding the getFiltersSection function", () => {
  describe("given an option with name and label, another one with only label, another one with only name and an option without label nor name", () => {
    it("should return the proper section of a header to be used as a relation list of filters", () => {
      const columnOptions = [
        { property: "property-coo", label: "label-coo", name: "name-coo" },
        { property: "property-foo", label: "label-foo" },
        { property: "property-boo", name: "name-boo" },
        { property: "property-zoo" },
      ];
      const result = getFiltersSection({ columnOptions });
      const resultWithoutComponentsToCompare = [
        {
          ...result[0],
          fields: result[0].fields.map((field) => ({
            ...field,
            ...(typeof field.CustomDeleteIcon === "function"
              ? { CustomDeleteIcon: "JSX" }
              : {}),
          })),
        },
      ];

      expect(resultWithoutComponentsToCompare).toEqual([
        {
          fields: [
            {
              property: "filters",
              style: {
                flexBasis: "auto",
              },
              type: "relation-list",
              CustomDeleteIcon: "JSX",
              lineContainerStyles: {
                borderBottom: "none",
              },
              options: {
                isCreatable: true,
                fields: [
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      flexBasis: "auto",
                      marginRight: "10px",
                      minWidth: "150px",
                      maxWidth: "2000px",
                    },
                    disableClearable: true,
                    allowEmptyValue: false,
                    renderInputProps: {
                      variant: "standard",
                    },
                    property: "columnField",
                    label: "Column",
                    type: "multiselect",
                    relation: {
                      options: [
                        {
                          property: "property-coo",
                          label: "label-coo",
                          name: "name-coo",
                        },
                        { property: "property-foo", label: "label-foo" },
                        { property: "property-boo", name: "name-boo" },
                        { property: "property-zoo" },
                      ],
                    },
                  },
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      flexBasis: "auto",
                      marginRight: "10px",
                      minWidth: "150px",
                      maxWidth: "2000px",
                    },
                    disableClearable: true,
                    allowEmptyValue: false,
                    renderInputProps: {
                      variant: "standard",
                    },
                    property: "operatorValue",
                    label: "Operator",
                    type: "multiselect",
                    relation: {
                      options: [
                        { value: "=", label: "=" },
                        { value: "<", label: "<" },
                        { value: ">", label: ">" },
                        { value: "!=", label: "!=" },
                        { value: "<=", label: "<=" },
                        { value: ">=", label: ">=" },
                      ],
                    },
                  },
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      flexBasis: "auto",
                      marginRight: "10px",
                      minWidth: "150px",
                      maxWidth: "2000px",
                    },
                    variant: "standard",
                    property: "value",
                    label: "Value",
                    type: "text",
                  },
                ],
              },
            },
          ],
        },
      ]);
    });
  });
});

describe("regarding the getOnlyCompleteFilters function", () => {
  describe("given an array of complete and incomplete filters", () => {
    it("should return only the complete filters", () => {
      const filters = [
        {
          columnField: { value: "coo" },
          operatorValue: { value: "=" },
          value: "cooVal",
        },
        {
          columnField: { value: "coo" },
          operatorValue: { value: "=" },
          value: "",
        },
        {
          columnField: { value: "coo" },
          operatorValue: { value: "=" },
          value: "cooVal",
        },
      ];
      expect(getOnlyCompleteFilters(filters)).toEqual([filters[0], filters[2]]);
    });
  });
});

describe("regarding the getInitialState function", () => {
  describe("given an array of columns options", () => {
    it("should return only the initial state", () => {
      const columnOptions = [
        { value: "name", label: "pages.usuarios.model.name" },
        { value: "email", label: "Email" },
        { value: "date", label: "labbel" },
        { value: "datetime-local", label: "labbel2" },
        { value: "styles", label: "styles" },
        { value: "isAdmin", label: "isAdmin" },
        { value: "email2", label: "pages.usuarios.model.email2" },
        { value: "file", label: "pages.usuarios.model.file" },
        { value: "file2", label: "pages.usuarios.model.file2" },
      ];
      expect(getInitialState({ firstColumn: columnOptions[0] })).toEqual({
        filters: [
          {
            columnField: {
              value: columnOptions[0].value,
              label: columnOptions[0].label,
            },
            operatorValue: {
              value: "=",
              label: "=",
            },
            value: "",
          },
        ],
      });
    });
  });
});

describe("regarding the getColumnOptions function", () => {
  describe("given an array of columns", () => {
    it("should return the columns formatted to the multiselect needs; [{ value, label }]", () => {
      const columns = [
        {
          property: "col1",
          label: "col1label",
          flex: 1,
          field: "col1",
          headerName: "col1",
        },
        {
          property: "file1",
          name: "file1name",
          flex: 1,
          field: "file1",
          headerName: "file1",
        },
        {
          property: "file2",
          flex: 1,
          field: "file2",
          headerName: "file2",
        },
        {
          field: "actions",
          headerName: "",
          sortable: false,
          filterable: false,
          editable: false,
          flex: 0.5,
        },
      ];

      const columnOptions = [
        { value: "col1", label: "col1label" },
        { value: "file1", label: "file1name" },
        { value: "file2", label: "file2" },
      ];

      expect(getColumnOptions(columns)).toEqual(columnOptions);
    });
  });
});

describe("regarding the getNormalizedFilters function", () => {
  describe("given nothing", () => {
    it("should return an empty array", () => {
      const result = [];
      expect(getNormalizedFilters()).toEqual(result);
    });
  });

  describe("given an object", () => {
    it("should return an error", () => {
      const expected = () => getNormalizedFilters({});
      expect(expected).toThrow("TypeError: filters.filter is not a function");
    });
  });

  describe("given a raw filter", () => {
    it("should return the filter clean", () => {
      const input = [
        {
          columnField: { value: "name", label: "name" },
          operatorValue: { value: "=", label: "=" },
          value: "abc",
        },
      ];
      const result = [
        {
          id: 1,
          columnField: "name",
          operatorValue: "=",
          value: "abc",
        },
      ];
      expect(getNormalizedFilters(input)).toEqual(result);
    });
  });
});
