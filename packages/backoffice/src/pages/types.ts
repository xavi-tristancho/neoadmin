import {  unknownObject } from "@neoco/neoco-backoffice/src/types";
import { Field } from "@neoco/neoco-form/src/types";
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
