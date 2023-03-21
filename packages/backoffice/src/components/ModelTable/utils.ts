/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header, unknownObject } from "@neoco/neoco-backoffice/src/types";
import { Field } from "@neoco/neoco-form/src/types";
import { Theme } from "@neoco/neoco-backoffice/src/styles/theme";
import { removeIfNotVisible } from "../../utils/common";
import { getPageHeaderFieldLiteral } from "../../languages/utils";
import { CustomToolbar } from "./components";
import type { useHistory } from "react-router-dom";

type GetRowFn = (item: Field[], props: Field) => unknown;

type GetFieldsFn = (props: {
  header: Header;
  t: (text: string) => string;
  item?: Field[];
}) => unknownObject[];

type RemoveIfNotFilterFn = (field: Field) => unknown;

type GetFilterFieldsFn = (header: Header) => Field[];

type getClientSidePaginatedDataFn = (props: {
  pagination: {
    page: number;
    pageSize: number;
  };
  data: unknownObject[];
}) => unknownObject[];

type GetModelPKFn = (header: Header) => string | undefined;

type GetItemIdentifierFn = (item: unknownObject, header?: Header) => string;

type GetDataGridPropsFn = (props: {
  isLoading: boolean;
  isFilterable: boolean;
  tableState: unknownObject;
  updateTableState: (props: unknownObject) => void;
  onDataGridChange: (props: unknownObject) => void;
  onFiltersButtonClick: () => void;
  openOnClickRow: boolean;
  path: string;
  header: Header;
  theme: Theme;
  history: ReturnType<typeof useHistory>;
}) => unknownObject;

const getRow: GetRowFn = (item, props) => {
  const row = item.filter((row: Field) => row?.id === props?.id)?.[0];
  return row ? row : {};
};

export const getFields: GetFieldsFn = ({ header, t, item }) => {
  return header.sections
    .reduce(
      (reducer, section) => [
        ...reducer,
        ...(section?.fields
          ? section.fields
              .filter(
                removeIfNotVisible({
                  item,
                  pageType: "tableOptions",
                }) as unknown as (field: Field) => boolean
              )
              .map(
                getPageHeaderFieldLiteral(header.options.name, t) as (
                  field: Field
                ) => Field
              )
          : []),
      ],
      [] as Field[]
    )
    .map((element: Field) => {
      const { type, ...elementProps } = element;
      const { tableOptions } = element;

      return {
        ...elementProps,
        ...(tableOptions?.format && typeof tableOptions.format === "function"
          ? {
              valueFormatter: (props: Field) =>
                tableOptions.format({
                  state: item,
                  row: getRow(item, props),
                  field: props,
                }),
            }
          : {}),
        flex: 1,
        field: element.property,
        headerName: element.label || element.name || element.property,
      };
    });
};

export const getFilterFields: GetFilterFieldsFn = (header) => {
  return header.sections.reduce(
    (reducer: Field[], section) => [
      ...reducer,
      ...(section?.fields ? section.fields.filter(removeIfNotFilter) : []),
    ],
    []
  );
};

export const removeIfNotFilter: RemoveIfNotFilterFn = (field) =>
  field.tableOptions?.filter ||
  field.tableOptions?.isSearchable ||
  field.relation;

export const getClientSidePaginatedData: getClientSidePaginatedDataFn = ({
  pagination,
  data,
}) => {
  const start = (pagination.page - 1) * pagination.pageSize;
  return data.slice(start, start + pagination.pageSize);
};

export const getModelPK: GetModelPKFn = (header) => {
  return header?.options?.primaryKey;
};

export const getItemIdentifier: GetItemIdentifierFn = (item, header) => {
  if (item?.id) {
    return item.id;
  } else {
    const primaryKeyAttribute = getModelPK(header);
    return primaryKeyAttribute ? item[primaryKeyAttribute] : null;
  }
};

export const getDataGridProps: GetDataGridPropsFn = ({
  isLoading,
  isFilterable,
  tableState,
  updateTableState,
  onDataGridChange,
  onFiltersButtonClick,
  openOnClickRow,
  path,
  header,
  theme,
  history,
}) => ({
  loading: isLoading,
  disableColumnFilter: true,
  components: {
    Toolbar: () =>
      CustomToolbar({
        isFilterable,
        onFiltersButtonClick,
        filters: tableState?.filter,
      }),
  },
  filterMode: "server",
  paginationMode: "server",
  sortingMode: "server",
  rowsPerPageOptions: [5, 10, 15],
  onStateChange: onDataGridChange,
  onPageSizeChange: (incomingPageSize: number) =>
    updateTableState({
      pagination: { ...tableState, pageSize: incomingPageSize },
    }),
  onRowClick: (item: object) =>
    openOnClickRow &&
    (history.push(
      `${path}/${getItemIdentifier(item, header)}`
    ) as unknown as void),
  pageSize: tableState?.pagination?.pageSize,
  rowCount: tableState?.count,
  autoHeight: true,
  sx: {
    "&& .MuiDataGrid-toolbarContainer": {
      "& .MuiButton-root": { marginRight: "20px" },
    },
    ...(theme?.palette?.mode === "light" && {
      "& .MuiButton-root": { color: "rgba(0, 0, 0, 0.54)" },
    }),
  },

  ...(tableState?.filter?.length && {
    filterModel: {
      items: tableState.filter,
    },
  }),
});
