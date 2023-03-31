import { createMemoryHistory } from "history";
import { Header } from "@neoco/neoco-backoffice/src/types";
import { Field } from "@neoco/neoco-form/src/types";
import { describe, it, expect, vi } from "vitest";
import { darkTheme as theme } from "../../styles/theme";
import {
  getRow,
  getFields,
  getItemIdentifier,
  getFilterFields,
  removeIfNotFilter,
  getClientSidePaginatedData,
  getModelPK,
  getDataGridProps,
} from "./utils";

const header: Header = {
  options: {
    name: "Test",
    primaryKey: "concept",
    route: { path: "/test", home: true },
  },
  type: "CRUD",
  sections: [
    {
      fields: [
        {
          type: "text",
          name: "Concepto",
          property: "concept",
        },
      ],
    },
    {
      fields: [
        {
          type: "text",
          name: "Horas",
          property: "hours",
        },
      ],
    },
  ],
};

describe("this", () => {
  describe("regarding the getRow function", () => {
    it("should be able to get a row from an item", () => {
      const item = header.sections[0].fields;
      const props = header.sections[0].fields[0];
      expect(getRow(item, props)).toEqual({
        type: "text",
        name: "Concepto",
        property: "concept",
      });
    });
    it("should return an empty object if the row does not exist", () => {
      const item = header.sections[0].fields;
      const props = {
        ...header.sections[0].fields[0],
        id: "not-exists",
      };
      expect(getRow(item, props)).toEqual({});
    });
    it("should return an empty object if the item array is empty", () => {
      const item: Field[] = [];
      const props = header.sections[0].fields[0];
      expect(getRow(item, props)).toEqual({});
    });
  });

  describe("regarding the getFields function", () => {
    it("should be able to get all the fields of all the sections of the header", () => {
      expect(getFields({ header, t: (text) => text })).toEqual([
        {
          field: "concept",
          flex: 1,
          headerName: "pages.test.model.concept",
          name: "pages.test.model.concept",
          property: "concept",
        },
        {
          field: "hours",
          flex: 1,
          headerName: "pages.test.model.hours",
          name: "pages.test.model.hours",
          property: "hours",
        },
      ]);
    });
  });

  describe("regarding the getItemIdentifier function", () => {
    it("should return id field if it exists", () => {
      expect(getItemIdentifier({ id: 1 })).toEqual(1);
    });

    it("should be able to get identifier for item based on header config", () => {
      expect(getItemIdentifier({ concept: "sample" }, header)).toEqual(
        "sample"
      );
    });

    it("cannot get identifier if header config not permit and item not hace id property", () => {
      expect(getItemIdentifier({ hours: "sample" }, header)).toBeUndefined();
    });
  });

  describe("regarding the getFilterFields function", () => {
    describe("given a header with the fields' sections without filters", () => {
      it("should return an empty array", () => {
        const emptyHeader: Header = {
          options: {
            name: "Test",
            primaryKey: "concept",
            route: { path: "/test", home: true },
          },
          type: "CRUD",
          sections: [
            {
              title: "Principal",
              fields: [
                {
                  type: "text",
                  property: "customerId",
                },
                {
                  type: "text",
                  property: "name",
                },
                {
                  type: "text",
                  property: "city",
                  tableOptions: {},
                },
                {
                  type: "text",
                  property: "postalCode",
                },
                {
                  type: "text",
                  property: "phone",
                  tableOptions: {},
                },
              ],
            },
          ],
        };
        expect(getFilterFields(emptyHeader)).toEqual([]);
      });
    });

    describe("given a header with the fields sections with filters", () => {
      it("should return an array with the fields that contain filters", () => {
        const filtersHeader: Header = {
          options: {
            name: "Test",
            primaryKey: "concept",
            route: { path: "/test", home: true },
          },
          type: "CRUD",
          sections: [
            {
              title: "Principal",
              fields: [
                {
                  type: "multiselect",
                  property: "customerId",
                  relation: {
                    isMulti: true,
                  },
                },
                {
                  type: "multiselect",
                  property: "name",
                  relation: {
                    isMulti: true,
                  },
                },
                {
                  type: "text",
                  property: "city",
                  tableOptions: {
                    filter: (item: unknown) => String(item),
                  },
                },
                {
                  type: "text",
                  property: "postalCode",
                },
                {
                  type: "text",
                  property: "phone",
                  tableOptions: {
                    isSearchable: true,
                  },
                },
              ],
            },
          ],
        };
        expect(getFilterFields(filtersHeader)).toStrictEqual([
          {
            type: "multiselect",
            property: "customerId",
            relation: {
              isMulti: true,
            },
          },
          {
            type: "multiselect",
            property: "name",
            relation: {
              isMulti: true,
            },
          },
          {
            type: "text",
            property: "city",
            tableOptions: {
              filter: expect.any(Function) as () => string,
            },
          },
          {
            type: "text",
            property: "phone",
            tableOptions: {
              isSearchable: true,
            },
          },
        ]);
      });
    });
  });

  describe("regarding the removeIfNotFilter function", () => {
    it("should return true if the field has a filter", () => {
      const field: Field = {
        type: "text",
        property: "city",
        tableOptions: {
          filter: (item: unknown) => String(item),
        },
      };
      expect(removeIfNotFilter(field)).toBeTruthy();
    });
    it("should return true if the field has a isSearchable", () => {
      const field: Field = {
        type: "text",
        property: "city",
        tableOptions: {
          isSearchable: true,
        },
      };
      expect(removeIfNotFilter(field)).toBeTruthy();
    });
    it("should return true if the field has a relation", () => {
      const field: Field = {
        type: "relation-list",
        property: "city",
        relation: {
          name: "name",
          nameProps: [],
          primaryKey: "id",
        },
      };
      expect(removeIfNotFilter(field)).toBeTruthy();
    });
    it("should return false if the field has not a filter", () => {
      const field: Field = {
        type: "text",
        property: "city",
      };
      expect(removeIfNotFilter(field)).toBeFalsy();
    });
  });

  describe("regarding the getClientSidePaginatedData function", () => {
    it("should return the data paginated following the pageSize value", () => {
      const pagination = {
        page: 1,
        pageSize: 10,
      };
      const data = Array.from({ length: 100 }, (_, i) => ({ [`key${i}`]: i }));
      expect(getClientSidePaginatedData({ pagination, data })).toEqual(
        data.slice(0, 10)
      );
    });
  });

  describe("regarding the getModelPK function", () => {
    it("should return the primaryKey value from the header", () => {
      expect(getModelPK(header)).toBe("concept");
    });
  });

  describe("regarding the getDataGridProps function", () => {
    const history = createMemoryHistory();
    const props = {
      isLoading: false,
      isFilterable: true,
      tableState: {
        pagination: { page: 1, pageSize: 10 },
      },
      updateTableState: vi.fn(),
      onDataGridChange: vi.fn(),
      onFiltersButtonClick: vi.fn(),
      openOnClickRow: true,
      path: "/test",
      header: header,
      theme: theme,
      history: history,
    };
    it("should return the props for the DataGrid component", () => {
      expect(getDataGridProps(props)).toStrictEqual({
        loading: false,
        disableColumnFilter: true,
        components: {
          Toolbar: expect.any(Function) as () => JSX.Element,
        },
        filterMode: "server",
        paginationMode: "server",
        sortingMode: "server",
        rowsPerPageOptions: [5, 10, 15],
        onStateChange: expect.any(Function) as () => void,
        onPageSizeChange: expect.any(Function) as () => void,
        onRowClick: expect.any(Function) as () => void,
        pageSize: 10,
        rowCount: undefined,
        autoHeight: true,
        sx: {
          "&& .MuiDataGrid-toolbarContainer": {
            "& .MuiButton-root": {
              marginRight: "20px",
            },
          },
        },
      });
    });
    describe("when the tableState has a filter", () => {
      it("should return the props for the DataGrid component with the filterModel", () => {
        const propsWithFilter = {
          ...props,
          tableState: {
            ...props.tableState,
            filter: [
              {
                columnField: "name",
                operatorValue: "contains",
                value: "test",
              },
            ],
          },
        };
        expect(getDataGridProps(propsWithFilter)).toStrictEqual({
          loading: false,
          disableColumnFilter: true,
          components: {
            Toolbar: expect.any(Function) as () => JSX.Element,
          },
          filterMode: "server",
          paginationMode: "server",
          sortingMode: "server",
          rowsPerPageOptions: [5, 10, 15],
          onStateChange: expect.any(Function) as () => void,
          onPageSizeChange: expect.any(Function) as () => void,
          onRowClick: expect.any(Function) as () => void,
          pageSize: 10,
          rowCount: undefined,
          autoHeight: true,
          sx: {
            "&& .MuiDataGrid-toolbarContainer": {
              "& .MuiButton-root": {
                marginRight: "20px",
              },
            },
          },
          filterModel: {
            items: [
              {
                columnField: "name",
                operatorValue: "contains",
                value: "test",
              },
            ],
          },
        });
      });
    });
  });
});
