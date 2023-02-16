import React from "react";
import { useTranslation } from "react-i18next";
import { UnAuthPageForm } from ".";
import { getPageLiteralsObject } from "../languages/utils";

type RecoverPasswordProps = {
  onSubmit: () => Promise<void>;
  children: React.ReactNode;
};

const RecoverPassword = ({
  onSubmit = () => Promise.resolve(),
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
