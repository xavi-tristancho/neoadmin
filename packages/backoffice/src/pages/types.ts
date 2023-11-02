import { unknownObject } from "@app-artisans/backoffice/src/types";
import { Field } from "@app-artisans/form/src/types";
import { LoginInputProps } from "../contexts/AuthContext";

export type UnAuthPageFormProps = {
  onSubmit: (credentials: unknownObject) => Promise<LoginInputProps>;
  afterSubmit?: (args: LoginInputProps) => void;
  page?: string;
  title?: string;
  register?: {
    text?: string;
    to: string;
    linkText: string;
  };
  submitText?: string;
  fields?: Field[];
  children?: React.ReactNode;
};
