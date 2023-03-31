/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent } from "@mui/material";
import styled from "styled-components";
import { Header, unknownObject } from "@neoco/neoco-backoffice/src/types";
import { showRender } from "../../utils/common";
import CustomFilters from "../CustomFilters/CustomFilters";
import { DeleteRowDialog, ModelTableTopPage } from "./components";
import useModelTable from "./useModelTable";

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

const ModelTable = ({
  header,
  data,
  styles = {},
  renderActions,
  dataGridProps = () => ({}),
  children,
}: ModelTableProps) => {
  const {
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
    setShowFilters,
    isLoading,
    tableState: stateToRender,
    updateTableState,
    updateAuxData,
    auxData,
    itemToDelete,
    setItemToDelete,
    renderChildren,
    renderBefore,
    renderAfter,
    t,
    language,
    ...neoProps
  } = useModelTable({
    header,
    data,
    styles,
    renderActions,
    dataGridProps,
    children,
  });

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
