/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { useState, useEffect } from "react";
import { FormGenerator } from "@neoco/neoco-form";
import styled from "styled-components";
import {
  getColumnOptions,
  getInitialState,
  getFiltersSection,
  getNormalizedFilters,
  getNewFilters,
} from "./utils";
import useDebounce from "../../utils/useDebounce";
import { Card } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Column, Filter } from "./types";

type CustomFiltersProps = {
  columns: Column[];
  onFiltersChange?: (filters: Filter[]) => void;
  hideFilters?: () => void;
  visible?: boolean;
};

const CustomFilters = ({
  columns,
  onFiltersChange = () => {},
  hideFilters = () => {},
  visible = false,
}: CustomFiltersProps) => {
  const columnOptions = getColumnOptions(columns);
  const headerSections = getFiltersSection({
    columnOptions,
  });
  const firstColumn = {
    value: columns[0]?.property,
    label: columns[0]?.label || columns[0]?.name || columns[0]?.property,
  };

  const [state, setState] = useState<{ filters: Filter[] }>(
    getInitialState({ firstColumn })
  );

  const [mustUpdateData, setMustUpdateData] = useState<boolean>(false);
  const debouncedFilters = useDebounce<{ filters: Filter[] }>(state);
  const theme = useTheme();

  const updateState = (nextState: { filters: Filter[] }) =>
    setState((currentState) => ({ ...currentState, ...nextState }));

  const sendFilters = (): void => {
    onFiltersChange(getNormalizedFilters(debouncedFilters.filters));
    setMustUpdateData(false);
  };

  const handleChange = ({ filters: incomingFilters }): void => {
    const { mustUpdateDataWithFilters, newFilters } = getNewFilters({
      currentStateFilters: state.filters,
      incomingFilters,
      columnOptions,
    });
    updateState(newFilters);
    if (mustUpdateDataWithFilters) setMustUpdateData(true);
  };

  useEffect(() => {
    if (state.filters.length <= 0) {
      hideFilters();
      setState(getInitialState({ firstColumn }));
    }
  }, [state.filters]);

  useEffect(() => {
    if (mustUpdateData) sendFilters();
  }, [debouncedFilters]);

  console.log(headerSections);

  return visible ? (
    <FormContainer theme={theme}>
      <FormGenerator
        state={{ data: state, aux: {} }}
        sections={headerSections}
        handleChange={handleChange}
        Button={() => <></>}
      />
    </FormContainer>
  ) : (
    <></>
  );
};

const FormContainer = styled(Card)`
  && {
    padding: 10px;
    padding-top: 0px;
    position: absolute;
    top: 130px;
    left: 5px;
    background: ${({ theme }) =>
      theme?.palette?.neoAdmin?.page?.backgroundColor};
    z-index: 1;
  }
`;

export default CustomFilters;
