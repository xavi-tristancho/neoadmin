import { useState } from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { FormGenerator } from "@neoco/neoco-form";
import responsive from "../utils/responsive";
import { useTheme } from "@mui/material/styles";
import { Section, unknownObject } from "@neoco/neoco-backoffice/src/types";
import { Field } from "@neoco/neoco-form/src/types";

export type UnAuthFormProps = {
  onSubmit: (data: unknownObject) => Promise<void>;
  title: string;
  submitText: string;
  register?: {
    text?: string;
    to: string;
    linkText: string;
  };
  recoverPassword?: {
    text: string;
    to: string;
    linkText: string;
  };
  fields: Field[];
  message?: string;
  children: React.ReactNode;
  resetMode?: () => void;
};

type GetInitialState = (sections: Section[]) => unknownObject;

type State = {
  data: unknownObject;
  aux: unknownObject;
};

const { mediaQuery } = responsive;

const getInitialState: GetInitialState = (sections) =>
  sections.reduce(
    (reducer, { fields }) => ({
      ...reducer,
      ...fields.reduce(
        (fieldsReducer, { property, upsertOptions }) => ({
          ...fieldsReducer,
          ...(upsertOptions?.value ? { [property]: upsertOptions.value } : {}),
        }),
        {}
      ),
    }),
    {}
  );

const UnAuthForm = ({
  onSubmit = () => Promise.resolve(),
  title,
  submitText,
  register = {
    text: "",
    to: "",
    linkText: "",
  },
  recoverPassword = {
    text: "",
    to: "",
    linkText: "",
  },
  fields,
  message,
  children,
  resetMode = () => {},
}: UnAuthFormProps) => {
  const section: Section[] = [
    {
      ...(message ? { title } : {}),
      fields,
      fieldsContainerStyles: { flexDirection: "column" },
    },
  ];

  const [state, setState] = useState<State>({
    data: getInitialState(section),
    aux: {},
  });
  const theme = useTheme();

  const updateState = (nextState: unknownObject) => {
    setState((currentState) => ({ ...currentState, ...nextState }));
    resetMode();
  };

  const handleChange = (
    data: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    updateState({ data: { ...state.data, ...data } });
  };

  return (
    <FormContainer>
      <FormGenerator
        sections={section}
        onSubmit={() => onSubmit(state.data)}
        state={state}
        handleChange={handleChange}
        submitText={submitText}
        Title={() => (
          <Title theme={theme} data-testid="login-title">
            {title}
          </Title>
        )}
      >
        {children}
      </FormGenerator>
      <LinksContainer>
        {recoverPassword.linkText && (
          <LinkContainer theme={theme}>
            {recoverPassword.text}
            <CustomRouterLink to={recoverPassword.to}>
              {recoverPassword.linkText}
              <Underline theme={theme} />
            </CustomRouterLink>
          </LinkContainer>
        )}
        {register.linkText && (
          <LinkContainer theme={theme}>
            {register.text}
            <CustomRouterLink to={register.to}>
              {register.linkText}
              <Underline theme={theme} />
            </CustomRouterLink>
          </LinkContainer>
        )}
      </LinksContainer>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 90%;
  ${mediaQuery.TABLET`width: 80%;`}
  ${mediaQuery.DESKTOP`width: 70%;`}
`;

const LinksContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 24px;
`;

const Title = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 133.4%;
  margin-top: 0px;
  color: ${({ theme }) =>
    theme?.palette?.mode === "light" ? theme.palette.primary?.dark : "#ffffff"};
`;

const CustomRouterLink = styled(RouterLink)`
  position: relative;
`;

const LinkContainer = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: ${({ theme }) =>
    theme?.palette?.mode === "light" ? theme.palette.primary?.dark : "#ffffff"};

  a,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
    text-decoration: none;
  }
`;

const Underline = styled.div`
  position: absolute;
  height: 0px;
  left: 0%;
  right: 0%;
  bottom: 1px;

  border-bottom: 1px solid
    ${({ theme }) =>
      theme?.palette?.mode === "light"
        ? theme.palette.primary?.dark
        : "#ffffff"};
`;

export default UnAuthForm;
