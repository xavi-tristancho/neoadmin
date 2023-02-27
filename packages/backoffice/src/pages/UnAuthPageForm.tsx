import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { Theme } from "../styles/theme";
import UnAuthForm from "../components/UnAuthForm";
import useNotiAlert from "../utils/NotiAlert/useNotiAlert";
// @ts-ignore
import { ReactComponent as BackgroundImg } from "../images/login_bg.svg";
import responsive from "../utils/responsive";
import { someRequiredValuesAreEmpty } from "../utils/common";
import { UnAuthPageFormProps } from "./types";

type ErrorMessage = {
  message: string;
};

const { mediaQuery } = responsive;

const UnAuthPageForm = ({
  onSubmit,
  afterSubmit = () => Promise.resolve(),
  page = "",
  title = "",
  submitText = "",
  fields = [],
  children,
  ...props
}: UnAuthPageFormProps) => {
  const { t } = useTranslation();
  const { showErrorAlert, showSuccessAlert } = useNotiAlert();
  const theme = useTheme();
  const onLocalSubmit = (credentials: unknownObject) => {
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
        .catch(({ message }: ErrorMessage) => {
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
  background-color: ${({ theme }: { theme: Theme }): string =>
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
  background-color: ${({ theme }: { theme: Theme }) =>
    theme?.palette?.neoAdmin?.login?.formBackground};
  && .MuiButton-root {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme?.palette?.secondary?.main};
    color: ${({ theme }: { theme: Theme }): string =>
      theme?.palette?.secondary?.text};
    width: 100%;
  }
`;

export default UnAuthPageForm;
