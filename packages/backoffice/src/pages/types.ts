import { Credentials } from "@neoco/neoco-backoffice/src/types";
import { Field } from "@neoco/neoco-form/src/types";
import { LoginInputProps } from "../contexts/AuthContext";

export type UnAuthPageFormProps = {
  onSubmit: (credentials: Credentials) => Promise<LoginInputProps>;
  afterSubmit?: (args: LoginInputProps) => void;
  page?: string;
  fields?: unknownObject[];
  title?: string;
  submitText?: string;
  fields?: Field[];
  children?: React.ReactNode;
};
