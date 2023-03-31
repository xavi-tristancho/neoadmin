import { useState, useEffect, SetStateAction } from "react";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Header, unknownObject } from "@neoco/neoco-backoffice/src/types";
import { sameElement } from "../../utils/common";
import { getRoutePath } from "../../utils/routes";
import useNotiAlert from "../../utils/NotiAlert/useNotiAlert";
import {
  getFields,
  getClientSidePaginatedData,
  getFilterFields,
  getDataGridProps,
} from "./utils";
import { RenderActionsCell } from "./components";

type ModelTableProps = {
  header: Header;
  data?: unknown[];
  styles?: unknownObject & {
    container?: unknownObject;
  };
  renderActions?: (item: unknown) => JSX.Element;
  dataGridProps?: (item: unknown) => unknown;
  children?: (item: unknown) => JSX.Element;
};

type TableInitialState = {
  filter: [];
  sort: [];
  pagination: { page?: number; pageSize?: number };
};

type GetTableInitialStateFn = (pageSize?: number) => TableInitialState;

const useModelTable = ({
  header,
  data,
  styles = {},
  renderActions,
  children,
}: ModelTableProps) => {
  const getTableInitialState: GetTableInitialStateFn = (pageSize = 5) => ({
    filter: [],
    sort: [],
    pagination: { page: 0, pageSize },
  });

  const { showSuccessAlert, showErrorAlert } = useNotiAlert();
  const history = useHistory();
  const {
    t,
    i18n: { language = "enUS" },
  } = useTranslation();
  const [remoteData, setRemoteData] = useState<unknownObject[]>([]);
  const [itemToDelete, setItemToDelete] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tableState, setTableState] = useState<TableInitialState>(
    getTableInitialState(header?.options?.tableOptions?.pageSize)
  );
  // eslint-disable-next-line no-unused-vars
  const [auxData, setAuxData] = useState<unknownObject>({});

  useEffect(() => {
    onMount()
      .then((onMountAux: unknownObject) => {
        updateAuxData(onMountAux);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getData().catch((error) => {
      console.error(error);
    });
  }, [tableState.filter, tableState.pagination]);

  const updateTableState = (incomingState: unknownObject) => {
    setTableState((currentState) => ({ ...currentState, ...incomingState }));
  };
  const updateAuxData = (incomingState: unknownObject) => {
    setAuxData((currentState) => ({ ...currentState, ...incomingState }));
  };
  const updateState = (fn: SetStateAction<unknownObject[]>) => {
    setRemoteData(fn);
  };

  const {
    findRequest = () => Promise.resolve(),
    mapFindResponse = (response: unknownObject[]) => response,
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
            renderCell: (params: unknown) =>
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
          })
            .then(({ count } = { count: 0 }) => {
              updateTableState({
                count,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
        return Promise.resolve(requestResponse);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDataGridChange = (state: unknownObject) => {
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
      } as unknownObject);
  };

  const onConfirmDeleteClick = () => {
    deleteRequest(itemToDelete)
      .then(() => {
        showSuccessAlert({ message: t("actions.deleteCorrect") });
        setItemToDelete(null);
        getData().catch((error) => {
          console.error(error);
        });
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

  return {
    isSmart,
    isCreatable,
    isEditable,
    isDeletable,
    isSearchable,
    isFilterable,
    openOnClickRow,
    pageName,
    path,
    columns,
    columnsAndRowsFormattedData,
    getData,
    remoteData,
    onConfirmDeleteClick,
    onFiltersButtonClick,
    showFilters,
    isLoading,
    tableState: stateToRender,
    updateTableState,
    updateAuxData,
    auxData,
    itemToDelete,
    setItemToDelete,
    setShowFilters,
    renderChildren,
    renderBefore,
    renderAfter,
    header,
    t,
    language,
    styles,
    ...neoProps,
  };
};

export default useModelTable;
