import { unknownObject, Credentials } from "@neoco/neoco-backoffice/src/types";
import { LoginInputProps } from "../contexts/AuthContext";

export type UnAuthPageFormProps = {
  onSubmit: (credentials: Credentials) => Promise<LoginInputProps>;
  afterSubmit?: (args: LoginInputProps) => void;
  page?: string;
  title?: string;
  submitText?: string;
  fields?: Array<unknownObject>;
  children?: React.ReactNode;
};
