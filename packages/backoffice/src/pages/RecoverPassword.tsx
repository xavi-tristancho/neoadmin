import { useTranslation } from "react-i18next";
import { UnAuthPageForm } from ".";
import { getPageLiteralsObject } from "../languages/utils";
import { UnAuthPageFormProps } from "./types";

type RecoverPasswordProps = Partial<UnAuthPageFormProps>;

const RecoverPassword = ({
  onSubmit,
  children,
  ...props
}: RecoverPasswordProps) => {
  const { t } = useTranslation();
  const literals = getPageLiteralsObject({ page: "recoverPassword" });

  return (
    <UnAuthPageForm
      {...props}
      onSubmit={onSubmit}
      page={"recoverPassword"}
      title={t(literals.title)}
      submitText={t(literals.send)}
      fields={[
        {
          label: t(literals.email),
          placeholder: literals.email,
          type: "email",
          name: "email",
          id: "email",
        },
      ]}
      register={{ linkText: t("actions.signin"), to: "/" }}
    >
      {children}
    </UnAuthPageForm>
  );
};

export default RecoverPassword;
