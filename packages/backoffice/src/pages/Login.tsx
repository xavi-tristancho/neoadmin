import { useTranslation } from "react-i18next";
import { UnAuthPageForm } from ".";
import { useAuth } from "../contexts/AuthContext";
import { getPageLiteralsObject } from "../languages/utils";
import { useTheme } from "@mui/material/styles";
import { Credentials } from "@neoco/neoco-backoffice/src/types";

export type LoginProps = {
  onSubmit: (credentials: Credentials) => Promise<void>;
  children?: React.ReactNode;
};

const Login = ({
  onSubmit = () => Promise.resolve(),
  children,
  ...props
}: LoginProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { login } = useAuth();
  const literals = getPageLiteralsObject({ page: "login" });

  const mainColor =
    theme.palette.mode === "light" ? theme.palette.primary.dark : "#ffffff";

  const commonInputProps = {
    sx: {
      "&& .MuiOutlinedInput-root": {
        color: mainColor,
        "& fieldset": {
          borderColor: mainColor,
          "&&:hover": { borderColor: mainColor },
        },
      },
      "& .MuiInputLabel-root": {
        color: mainColor,
      },
    },
  };

  return (
    <UnAuthPageForm
      {...props}
      onSubmit={onSubmit}
      afterSubmit={login}
      page={"login"}
      title={t(literals.title)}
      submitText={t("actions.signin")}
      fields={[
        {
          label: t(literals.email),
          placeholder: t(literals.email),
          type: "email",
          name: "email",
          id: "email",
          fullWidth: true,
          ...commonInputProps,
        },
        {
          label: t(literals.password),
          placeholder: t(literals.password),
          type: "password",
          name: "password",
          id: "password",
          ...commonInputProps,
        },
      ]}
    >
      {children}
    </UnAuthPageForm>
  );
};

export default Login;
