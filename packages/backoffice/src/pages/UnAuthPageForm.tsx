import React from "react";
import { useTranslation } from "react-i18next";
import UnAuthForm from "../components/UnAuthForm";
import useNotiAlert from "../utils/NotiAlert/useNotiAlert";
import styled from "styled-components";
import { ReactComponent as BackgroundImg } from "../images/login_bg.svg";
import { useTheme } from "@mui/material/styles";
import responsive from "../utils/responsive";
import { someRequiredValuesAreEmpty } from "../utils/common";

const { mediaQuery } = responsive;

const UnAuthPageForm = ({
  onSubmit = () => Promise.resolve(),
  afterSubmit = () => Promise.resolve(),
  page = "",
  title = "",
  submitText = "",
  fields = [],
  children,
  ...props
}) => {
  const { t } = useTranslation();
  const { showErrorAlert, showSuccessAlert } = useNotiAlert();
  const theme = useTheme();
  const onLocalSubmit = (credentials) => {
    if (
      fields.length &&
      someRequiredValuesAreEmpty({ fields, values: credentials })
    ) {
      showErrorAlert({ message: t(`${page}.invalidCredentials`) });
      return Promise.reject({ message: null });
    }

    if (typeof onSubmit === "function") {
      onSubmit(credentials)
        .then((submittedProps) => {
          showSuccessAlert({ message: t(`${page}.success`) });
          return afterSubmit(submittedProps);
        })
        .catch(({ message }) => {
          showErrorAlert({
            message: t(message ? message : `${page}.invalidCredentials`),
          });
          return Promise.reject({ message });
        });
    }
    return Promise.resolve();
  };

  return (
    <Container>
      <ImageContainer theme={theme}>
        <CustomBackgroundImg />
      </ImageContainer>
      <FormContainer theme={theme}>
        <UnAuthForm
          {...props}
          onSubmit={onLocalSubmit}
          title={title}
          submitText={submitText}
          fields={fields}
        >
          {children}
        </UnAuthForm>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  flex: 0;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) =>
    theme?.palette?.neoAdmin?.login?.background};
  ${mediaQuery.TABLET`flex: 1;`}
  ${mediaQuery.RETINA`flex: 3;`}
`;

const CustomBackgroundImg = styled(BackgroundImg)`
  width: 100%;
`;

const FormContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme?.palette?.neoAdmin?.login?.formBackground};

  && .MuiButton-root {
    background-color: ${({ theme }) => theme?.palette?.secondary?.main};
    color: ${({ theme }) => theme?.palette?.secondary?.text};
    width: 100%;
  }
`;

export default UnAuthPageForm;
