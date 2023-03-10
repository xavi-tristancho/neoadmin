import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type CustomToolbarProps = {
  isFilterable?: boolean;
  onFiltersButtonClick?: () => void;
  filters?: string[];
};

const CustomToolbar = ({
  isFilterable = true,
  onFiltersButtonClick,
  filters = [],
}: CustomToolbarProps) => {
  const { t } = useTranslation();
  const filtersAmount = filters.length;
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      {isFilterable && (
        <Button onClick={onFiltersButtonClick}>
          <IconContainer>
            <FilterList />
            {filtersAmount > 0 && (
              <FiltersAmount>{filtersAmount}</FiltersAmount>
            )}
          </IconContainer>
          {t("general.filters")}
        </Button>
      )}
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const IconContainer = styled.span`
  display: inherit;
  margin-right: 8px;
  margin-left: -2px;
  position: relative;
`;

const FiltersAmount = styled.div`
  position: absolute;
  background: gray;
  color: white;
  border-radius: 50px;
  right: -8px;
  top: -8px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

export default CustomToolbar;
