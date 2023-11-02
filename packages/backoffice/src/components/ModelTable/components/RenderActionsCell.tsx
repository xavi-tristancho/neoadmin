import { SetStateAction } from "react";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { unknownObject } from "@app-artisans/backoffice/src/types";
import { Theme } from "@app-artisans/backoffice/src/styles/theme";

type RenderActionsCellProps = {
  item: unknown & { id?: string | number };
  getItemActions: (
    item: unknown,
    state?: unknown
  ) => { isEditable: boolean; isDeletable: boolean };
  onDeleteClick: (item: unknown) => void;
  renderActions?: (item: unknown) => JSX.Element;
  updateState: (fn: SetStateAction<unknown[]>) => void;
  remoteData?: unknownObject;
  isEditable: boolean;
  isDeletable: boolean;
  path: string;
};

const RenderActionsCell = ({
  item,
  getItemActions,
  onDeleteClick,
  updateState,
  renderActions,
  remoteData,
  isEditable,
  isDeletable,
  path,
}: RenderActionsCellProps) => {
  const theme = useTheme();
  const itemActions = getItemActions({
    item,
    state: remoteData,
  });
  const canEdit =
    (itemActions &&
    typeof itemActions === "object" &&
    "isEditable" in itemActions
      ? itemActions.isEditable
      : isEditable) && item.id;
  const canDelete =
    (itemActions &&
    typeof itemActions === "object" &&
    "isDeletable" in itemActions
      ? itemActions.isDeletable
      : isDeletable) && item.id;

  return (
    <ActionsContainer onClick={(e) => e.stopPropagation()}>
      {canEdit && (
        <Link to={`${path}/${item.id}`}>
          <Edit color={"action"} theme={theme} />
        </Link>
      )}
      {canDelete && (
        <DeleteContainer onClick={() => onDeleteClick(item)}>
          <Delete color={"action"} theme={theme} />
        </DeleteContainer>
      )}
      {typeof renderActions === "function" &&
        renderActions({
          item,
          state: remoteData,
          updateState,
        })}
    </ActionsContainer>
  );
};

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  flex: 1;
  align-items: center;
`;

const Edit = styled(EditIcon)`
  ${({ theme }: { theme: Theme }) =>
    theme?.palette?.mode === "dark" ? "&& {color: #ffffff}" : ""}
`;

const Delete = styled(DeleteIcon)`
  ${({ theme }: { theme: Theme }) =>
    theme?.palette?.mode === "dark" ? "&& {color: #ffffff}" : ""}
`;

const DeleteContainer = styled.div`
  cursor: pointer;
`;

export default RenderActionsCell;
