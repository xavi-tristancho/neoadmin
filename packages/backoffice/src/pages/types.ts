import { unknownObject, Credentials } from "@neoco/neoco-backoffice/src/types";

export type CommonProps = {
  onSubmit: (data: Credentials) => Promise<void>;
  children: React.ReactNode;
  title: string;
  submitText: string;
  fields: Array<unknownObject>;
};
