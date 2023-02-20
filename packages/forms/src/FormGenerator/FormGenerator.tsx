import { useState } from "react";
import DefaultButton from "@mui/material/Button";
import styled from "styled-components";
import { inputMapper } from "../utils/inputs";
import { removeIfNotVisible } from "../utils/common";
import { getIndexInArray } from "../utils/arrays";
import { ButtonProps } from "@mui/material";
import {
  Sections,
  Config,
  unknownObject,
} from "@neoco/neoco-backoffice/src/types";

type FormGeneratorProps = {
  sections: Sections;
  state: unknownObject;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  children?:
    | ((props: { state: unknownObject }) => JSX.Element)
    | React.ReactNode;
  Button?: React.ComponentType<ButtonProps>;
  submitText?: string;
  submitButtonProps?: unknownObject;
  Title: React.ComponentType<{ children: string }>;
};

type SectionProps = {
  config?: Partial<Config>;
  section: Sections[number];
  state: unknownObject;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  Title?: React.ComponentType<{ children: string }>;
  Subtitle?: React.ComponentType<{ children: string }>;
};

const FormGenerator = ({
  sections,
  state,
  handleChange,
  onSubmit,
  children,
  Button = DefaultButton,
  submitText = "Guardar",
  submitButtonProps,
  ...props
}: FormGeneratorProps) => {
  const [error, setError] = useState<{ message: string }>({ message: "" });
  const onLocalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(e).catch(setError);
  };

  return (
    <form onSubmit={onLocalSubmit}>
      {sections.map((section) => (
        <Section
          section={section}
          state={state}
          key={getIndexInArray(sections, section)}
          handleChange={handleChange}
          {...props}
        />
      ))}

      {typeof children === "function" ? children({ state }) : children}

      {error.message && <DangerText>{error.message}</DangerText>}

      <Button
        type="submit"
        variant="contained"
        style={{ marginTop: 20 }}
        color="primary"
        {...submitButtonProps}
      >
        {submitText}
      </Button>
    </form>
  );
};

const Section = ({
  config,
  section,
  state,
  handleChange,
  Title = DefaultTitle,
  Subtitle = DefaultSubtitle,
}: SectionProps) => {
  const { FieldsContainer = BaseFieldsContainer } = section;
  return (
    <SectionContainer>
      {section.title ? <Title>{section.title}</Title> : ""}
      {section.subtitle ? <Subtitle>{section.subtitle}</Subtitle> : ""}
      <FieldsContainer
        style={{ marginTop: 20, ...section.fieldsContainerStyles }}
      >
        {typeof section.component === "function"
          ? section.component()
          : fieldsMapper({
              fields: section.fields.filter(removeIfNotVisible(state.data)),
              state,
              handleChange,
              config,
            })}
      </FieldsContainer>
    </SectionContainer>
  );
};

export const fieldsMapper = ({ fields, state, handleChange, config }) => {
  return fields.map(({ FieldContainer = BaseFieldContainer, ...field }) => (
    <FieldContainer key={field.property} style={field.style}>
      {typeof field.renderBefore === "function" ? field.renderBefore() : <></>}
      {inputMapper({
        field,
        state,
        handleChange,
        config,
      })}
      {typeof field.renderAfter === "function" ? field.renderAfter() : <></>}
      {typeof field.isValid === "function" && (
        <ErrorMessage>{field.isValid(state.data[field.name])}</ErrorMessage>
      )}
    </FieldContainer>
  ));
};

const SectionContainer = styled.div``;
const DefaultTitle = styled.p`
  font-size: 18px;
`;

const DefaultSubtitle = styled.p`
  color: #909090;
  font-size: 16px;
`;

const BaseFieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BaseFieldContainer = styled.div`
  flex-basis: ${(props) => (props?.type === "relation-list" ? "100%" : "30%")};
`;

const DangerText = styled.p`
  color: red;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
`;

export default FormGenerator;
