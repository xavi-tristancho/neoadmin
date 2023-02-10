/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import {FormGenerator} from "@neoco/neoco-form";
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

const CustomFilters = ({
  columns,
  onFiltersChange = () => {},
  hideFilters = () => {},
  visible = false,
}) => {
  const columnOptions = getColumnOptions(columns);
  const headerSections = getFiltersSection({
    columnOptions,
  });
  const firstColumn = {
    value: columns[0]?.property,
    label: columns[0]?.label || columns[0]?.name || columns[0]?.property,
  };

  const [state, setState] = useState(getInitialState({ firstColumn }));

  const [mustUpdateData, setMustUpdateData] = useState(false);
  const debouncedFilters = useDebounce(state);
  const theme = useTheme();

  const updateState = (nextState) =>
    setState((currentState) => ({ ...currentState, ...nextState }));

  const sendFilters = () => {
    onFiltersChange(getNormalizedFilters(debouncedFilters.filters));
    setMustUpdateData(false);
  };

  const handleChange = ({ filters: incomingFilters }) => {
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

  return visible ? (
    <FormContainer theme={theme}>
      <Form
        state={{ data: state, aux: {} }}
        headers={{
          sections: headerSections,
        }}
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
