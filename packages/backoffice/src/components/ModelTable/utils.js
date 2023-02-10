/* eslint-disable react/display-name */
import { removeIfNotVisible } from "../../utils/common";
import { getPageHeaderFieldLiteral } from "../../languages/utils";
import { CustomToolbar } from "./components";

const getRow = (item, props) =>
  item.filter((row) => row?.id === props?.id)?.[0] || {};

export const getFields = ({ header, t, item }) => {
  return header.sections
    .reduce(
      (reducer, section) => [
        ...reducer,
        ...(section?.fields
          ? section.fields
              .filter(removeIfNotVisible({ item, pageType: "tableOptions" }))
              .map(getPageHeaderFieldLiteral(header.options.name, t))
          : []),
      ],
      []
    )
    .map((element) => {
      // eslint-disable-next-line no-unused-vars
      const { type, ...elementProps } = element;
      const { tableOptions } = element;

      return {
        ...elementProps,
        ...(tableOptions?.format && typeof tableOptions.format === "function"
          ? {
              valueFormatter: (props) =>
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

export const getFilterFields = (header) => {
  return header.sections.reduce(
    (reducer, section) => [
      ...reducer,
      ...(section?.fields ? section.fields.filter(removeIfNotFilter) : []),
    ],
    []
  );
};

const removeIfNotFilter = (field) =>
  field.tableOptions?.filter ||
  field.tableOptions?.isSearchable ||
  field.relation;

export const getClientSidePaginatedData = ({ pagination, data }) => {
  const start = (pagination.page - 1) * pagination.pageSize;
  return data.slice(start, start + pagination.pageSize);
};

const getModelPK = (header) => {
  return header?.options?.primaryKey;
};

export const getItemIdentifier = (item, header) => {
  if (item?.id) {
    return item.id;
  } else {
    const primaryKeyAttribute = getModelPK(header);
    return primaryKeyAttribute ? item[primaryKeyAttribute] : null;
  }
};

export const getDataGridProps = ({
  isLoading,
  isFilterable,
  tableState,
  updateTableState = () => {},
  onDataGridChange = () => {},
  onFiltersButtonClick = () => {},
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
  onPageSizeChange: (incomingPageSize) =>
    updateTableState({
      pagination: { ...tableState, pageSize: incomingPageSize },
    }),
  onRowClick: (item) =>
    openOnClickRow &&
    history.push(`${path}/${getItemIdentifier(item, header)}`),
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
