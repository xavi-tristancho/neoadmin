import React from "react";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const RenderActionsCell = ({
  item,
  getItemActions = () => {},
  onDeleteClick = () => {},
  updateState = () => {},
  renderActions,
  remoteData,
  isEditable,
  isDeletable,
  path,
}) => {
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
  ${({ theme }) =>
    theme?.palette?.mode === "dark" ? "&& {color: #ffffff}" : ""}
`;

const Delete = styled(DeleteIcon)`
  ${({ theme }) =>
    theme?.palette?.mode === "dark" ? "&& {color: #ffffff}" : ""}
`;

const DeleteContainer = styled.div`
  cursor: pointer;
`;

export default RenderActionsCell;
