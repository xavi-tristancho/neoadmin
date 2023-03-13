import { DefaultField, Field } from "../../../types";

export type RelationListField =
  | DefaultField & {
      property: string;
      type: "relation-list";
      options: {
        isCreatable: boolean;
        isDeletable: boolean;
        fields: Field[];
      };
      CustomDeleteIcon: () => JSX.Element;
      lineContainerStyles: React.CSSProperties;
    };
