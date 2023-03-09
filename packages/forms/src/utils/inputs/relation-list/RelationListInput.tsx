import { Button } from "@mui/material";
import styled from "styled-components";
import { fieldsMapper } from "../../../FormGenerator/FormGenerator";
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/trash.svg";

export const RelationListInput = ({ field, state, onChange, config }) => {
  const { isCreatable = true } = field?.options || {};
  const { isDeletable = true } = field?.options || {};
  const items = state.data[field?.property];

  const newItem =
    field.options?.fields.reduce(
      (reducer, key) => ({
        ...reducer,
        [key.property]: "",
      }),
      {}
    ) || {};
  return (
    <>
      <RelationListHeader
        title={field.label}
        button={{
          isDisabled: !isCreatable,
          action: (e) => {
            e.preventDefault();
            onChange([...(items ? items : []), newItem]);
          },
        }}
      />
      {items?.map((item, index) => (
        <RelationListLine
          key={index}
          data={item}
          aux={state?.aux}
          fields={field?.options?.fields || []}
          isDeletable={isDeletable}
          onChange={(data) => {
            onChange(
              items.map((item, onChangeIndex) =>
                onChangeIndex !== index ? item : { ...item, ...data }
              )
            );
          }}
          onDelete={() => {
            onChange(
              items.filter(
                (unUsedItem, onDeleteIndex) => onDeleteIndex !== index
              )
            );
          }}
          config={config}
          CustomDeleteIcon={field.CustomDeleteIcon}
          style={field.lineContainerStyles}
        />
      ))}
    </>
  );
};

const RelationListHeader = ({ title, button }) => {
  const { isDisabled = false, action = () => {} } = button;
  return (
    <HeaderContainer>
      <Label>{title}</Label>
      {!isDisabled ? (
        <AddButton variant="contained" onClick={action}>
          <AddIcon fill="white" height={20} width={20} />
        </AddButton>
      ) : (
        <></>
      )}
    </HeaderContainer>
  );
};

const RelationListLine = ({
  data = [],
  aux,
  fields,
  onChange,
  onDelete,
  isDeletable,
  config,
  CustomDeleteIcon,
  ...props
}) => {
  const inputs = fieldsMapper({
    fields,
    state: { data, aux },
    handleChange: onChange,
    config,
  });

  return (
    <LineContainer {...props}>
      {inputs}
      {isDeletable && (
        <DeleteButton onClick={onDelete}>
          {CustomDeleteIcon && typeof CustomDeleteIcon === "function" ? (
            <CustomDeleteIcon />
          ) : (
            <DeleteIcon fill="black" height={20} width={30} />
          )}
        </DeleteButton>
      )}
    </LineContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const LineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d4d4d4;
  padding-top: 8px;
`;

const AddButton = styled(Button)`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid white;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
`;

const DeleteButton = styled(Button)`
  height: 50px;
  width: 50px;
  background-color: white;
`;

const Label = styled.span`
  color: #9da1a7;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  margin-bottom: 10px;
`;

export default RelationListInput;
