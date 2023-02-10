/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  getFields,
  getClientSidePaginatedData,
  getFilterFields,
  getDataGridProps,
} from "./utils";
import { sameElement, showRender } from "../../utils/common";
import { getRoutePath } from "../../utils/routes";
import useNotiAlert from "../../utils/NotiAlert/useNotiAlert";
import { useTheme } from "@mui/material/styles";
import {
  RenderActionsCell,
  DeleteRowDialog,
  ModelTableTopPage,
} from "./components";
import CustomFilters from "../CustomFilters/CustomFilters";
import styled from "styled-components";

const getTableInitialState = (pageSize = 5) => ({
  filter: [],
  sort: [],
  pagination: { page: 0, pageSize },
});

const ModelTable = ({
  header,
  data,
  styles = {},
  renderActions,
  dataGridProps = () => ({}),
  children,
}) => {
  const { showSuccessAlert, showErrorAlert } = useNotiAlert();
  const history = useHistory();
  const {
    t,
    i18n: { language = "enUS" },
  } = useTranslation();
  const [remoteData, setRemoteData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tableState, setTableState] = useState(
    getTableInitialState(header?.options?.tableOptions?.pageSize)
  );
  // eslint-disable-next-line no-unused-vars
  const [auxData, setAuxData] = useState({});

  useEffect(() => {
    onMount().then((onMountAux) => {
      updateAuxData(onMountAux);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [tableState.filter, tableState.pagination]);

  const updateTableState = (incomingState) => {
    setTableState((currentState) => ({ ...currentState, ...incomingState }));
  };
  const updateAuxData = (incomingState) => {
    setAuxData((currentState) => ({ ...currentState, ...incomingState }));
  };
  const updateState = (fn) => setRemoteData(fn);

  const {
    findRequest = () => Promise.resolve(),
    mapFindResponse = (response) => response,
    deleteRequest = () => Promise.resolve(),
    countRequest = () => Promise.resolve(),
  } = header?.options?.requests || {};

  const {
    isCreatable = true,
    isEditable = false,
    isDeletable = false,
    isSearchable = false,
    isFilterable = true,
    openOnClickRow = false,
    getItemActions = () => ({ isEditable, isDeletable }),
    onMount = () => Promise.resolve(),
    renderBefore,
    renderAfter,
  } = header?.options?.tableOptions || {};

  const theme = useTheme();
  const path = getRoutePath(header?.options?.route);
  const isSmart = typeof data === "undefined";
  const renderChildren = children || header?.options?.tableOptions?.children;
  const pageName = header?.options?.name;
  const tableHeaders = getFields({ header, t, item: data || remoteData });
  const columns = [
    ...tableHeaders,
    ...(isEditable || isDeletable || typeof renderActions === "function"
      ? [
          {
            field: "actions",
            headerName: "",
            sortable: false,
            filterable: false,
            editable: false,
            flex: 0.5,
            renderCell: (params) =>
              RenderActionsCell({
                item: params,
                getItemActions,
                onDeleteClick: setItemToDelete,
                renderActions,
                updateState,
                isEditable,
                isDeletable,
                path,
              }),
          },
        ]
      : []),
  ];

  const columnsAndRowsFormattedData = {
    columns,
    rows: isSmart
      ? remoteData
      : getClientSidePaginatedData({
          pagination: tableState?.pagination,
          data,
        }),
  };

  const getData = () => {
    setIsLoading(true);
    return findRequest({
      ...(tableState || {}),
      fields: isSearchable || isFilterable ? getFilterFields(header) : [],
    })
      .then((requestResponse) => {
        setIsLoading(false);
        if (isSmart) setRemoteData(mapFindResponse(requestResponse));
        return Promise.resolve(requestResponse);
      })
      .then((requestResponse) => {
        if (!tableState?.count) {
          countRequest({
            ...(tableState || {}),
            fields: isSearchable || isFilterable ? getFilterFields(header) : [],
            data: requestResponse,
          }).then(({ count } = { count: 0 }) => {
            updateTableState({
              count,
            });
          });
        }
        return Promise.resolve(requestResponse);
      });
  };

  const onDataGridChange = (state) => {
    const { pagination, sorting } = state || {};
    const hasPaginationChanged =
      pagination.page !== tableState?.pagination?.page ||
      pagination.pageSize !== tableState?.pagination?.pageSize;
    const hasSortingChanged = !sameElement(tableState.sort, sorting?.sortModel);
    const mustUpload = hasSortingChanged || hasPaginationChanged;

    if (mustUpload)
      updateTableState({
        pagination,
        sort: sorting?.sortModel,
        count: undefined,
      });
  };

  const onConfirmDeleteClick = () => {
    deleteRequest(itemToDelete)
      .then(() => {
        showSuccessAlert({ message: t("actions.deleteCorrect") });
        setItemToDelete(null);
        getData();
      })
      .catch(() => {
        setItemToDelete(null);
        showErrorAlert({ message: t("actions.deleteIncorrect") });
      });
  };

  const onFiltersButtonClick = () => {
    setShowFilters(!showFilters);
  };

  const neoProps = getDataGridProps({
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
    columns,
    history,
  });

  const stateToRender = { ...tableState, data: remoteData };

  return (
    <>
      <DeleteRowDialog
        open={itemToDelete}
        onConfirmDeleteClick={onConfirmDeleteClick}
        onCancelDeleteClick={() => setItemToDelete(null)}
      />
      <ModelTableTopPage
        pageName={pageName}
        isCreatable={isCreatable}
        path={path}
      />
      {showRender(renderBefore, stateToRender)}
      <Card style={{ overflow: "visible", ...styles.container }}>
        <CustomCardContent>
          <CustomFilters
            columns={columns}
            onFiltersChange={(newFilters) =>
              updateTableState({ filter: newFilters })
            }
            hideFilters={() => setShowFilters(false)}
            visible={showFilters}
          />
          <DataGrid
            {...columnsAndRowsFormattedData}
            {...neoProps}
            // localeText={
            //   XDataGrid[language].components.MuiDataGrid.defaultProps.localeText
            // }
            {...dataGridProps(neoProps)}
          />
          {typeof renderChildren === "function"
            ? renderChildren({ state: remoteData })
            : renderChildren}
        </CustomCardContent>
      </Card>
      {showRender(renderAfter, stateToRender)}
    </>
  );
};

const CustomCardContent = styled(CardContent)`
  position: relative;
`;

export default ModelTable;
