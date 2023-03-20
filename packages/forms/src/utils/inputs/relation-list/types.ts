import { Field } from "../../../types";

export type RelationListField = {
  property: string;
  type: "relation-list";
  options: {
    isCreatable?: boolean;
    isDeletable?: boolean;
    fields: Field[];
  };
  CustomDeleteIcon?: () => JSX.Element;
  lineContainerStyles?: React.CSSProperties;
};
