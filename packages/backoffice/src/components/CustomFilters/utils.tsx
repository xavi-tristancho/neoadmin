/* eslint-disable react/display-name */
import { Close } from "@mui/icons-material";
import { UnknownOption } from "@neoco/neoco-form/src/utils/inputs/multi-select/types";
import { sameElement } from "../../utils/common";
import { Column, Filter, FilterSection, OperatorOptions } from "./types";

export const getColumnOptions = (columns: Column[]): OperatorOptions[] =>
  columns
    .filter(({ property }) => property)
    .map((column) => ({
      value: column.property,
      label: column.label || column.name || column.property,
    }));

export const operatorOptions: OperatorOptions[] = [
  { value: "=", label: "=" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "!=", label: "!=" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

export const getFiltersSection = ({
  columnOptions,
}: {
  columnOptions: OperatorOptions[];
}): FilterSection[] => {
  const commonFieldsProps: { style: UnknownOption } = {
    style: {
      display: "flex",
      alignItems: "center",
      flexBasis: "auto",
      marginRight: "10px",
      minWidth: "150px",
      maxWidth: "2000px",
    },
  };
  const commonMultiselectProps: {
    disableClearable: boolean;
    allowEmptyValue: boolean;
    renderInputProps: UnknownOption;
  } = {
    disableClearable: true,
    allowEmptyValue: false,
    renderInputProps: { variant: "standard" },
  };
  return [
    {
      fields: [
        {
          property: "filters",
          style: { flexBasis: "auto" },
          type: "relation-list",
          CustomDeleteIcon: () => <Close />,
          lineContainerStyles: { borderBottom: "none" },
          options: {
            isCreatable: true,
            fields: [
              {
                ...commonFieldsProps,
                ...commonMultiselectProps,
                property: "columnField",
                label: "Column",
                type: "multiselect",
                relation: {
                  options: columnOptions,
                },
              },
              {
                ...commonFieldsProps,
                ...commonMultiselectProps,
                property: "operatorValue",
                label: "Operator",
                type: "multiselect",
                relation: {
                  options: operatorOptions,
                },
              },
              {
                ...commonFieldsProps,
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
  ];
};

export const getOnlyCompleteFilters = (filters: Filter[]) =>
  filters.filter(({ columnField, operatorValue, value }) =>
    [columnField, operatorValue, value].every((field) => field && field !== "")
  );

export const getNormalizedFilters = (filters?: Filter[]) => {
  try {
    return getOnlyCompleteFilters(filters).map((filter, index) => {
      if (typeof filter === "object") {
        const columnField = Array.isArray(filter?.columnField)
          ? filter.columnField[0]?.value
          : filter?.columnField?.value
          ? filter.columnField.value
          : filter.columnField;
        const operatorValue = Array.isArray(filter?.operatorValue)
          ? filter.operatorValue[0]?.value
          : filter?.operatorValue?.value
          ? filter.operatorValue.value
          : filter.operatorValue;

        return {
          id: index + 1,
          columnField,
          operatorValue,
          value: filter?.value,
        };
      }
      return filter;
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getIncomingFiltersWithInitialValues = ({
  incomingFilters,
  columnOptions,
}: {
  incomingFilters: Filter[];
  columnOptions: OperatorOptions[];
}) =>
  incomingFilters.map((inFilter) => ({
    ...inFilter,
    ...((!inFilter.columnField || inFilter.columnField.value === "") && {
      columnField: columnOptions[0],
    }),
    ...((!inFilter.operatorValue || inFilter.operatorValue.value === "") && {
      operatorValue: operatorOptions[0],
    }),
  }));

export const getNewFilters = ({
  currentStateFilters,
  incomingFilters,
  columnOptions,
}: {
  currentStateFilters: Filter[];
  incomingFilters: Filter[];
  columnOptions: OperatorOptions[];
}) => {
  const isAddingFilter = currentStateFilters.length < incomingFilters?.length;
  const mustUpdateDataWithFilters =
    !isAddingFilter &&
    !sameElement(
      getOnlyCompleteFilters(incomingFilters),
      getOnlyCompleteFilters(currentStateFilters)
    );

  const newFilters = {
    filters: isAddingFilter
      ? getIncomingFiltersWithInitialValues({ incomingFilters, columnOptions })
      : incomingFilters,
  };
  return { mustUpdateDataWithFilters, newFilters };
};

export const getInitialState = ({
  firstColumn = { value: "", label: "" },
}): { filters: Filter[] } => ({
  filters: [
    {
      columnField: {
        value: firstColumn.value,
        label: firstColumn.label,
      },
      operatorValue: {
        value: "=",
        label: "=",
      },
      value: "",
    },
  ],
});
