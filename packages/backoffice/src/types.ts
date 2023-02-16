import { BrowserRouterProps, RouteChildrenProps } from "react-router-dom";
import { Field } from "../../forms/src/types";

export type Config = {
  renderThemeProvider: boolean;
  wysiwyg: { apiKey: string };
  router: BrowserRouterProps;
};

export type unknownObject = {
  [key: string]: unknown;
};

export type Sections = {
  component?: () => JSX.Element;
  fields?: Field[];
  FieldsContainer?: ({
    children,
    style,
  }: {
    children: JSX.Element;
    style: React.CSSProperties;
  }) => JSX.Element;
  fieldsContainerStyles?: unknownObject;
  subtitle?: string;
  title?: string;
}[];

export type Header = {
  type: "CRUD" | "Page";
  options: {
    name: string;
    primaryKey?: string;
    requests?: {
      findRequest: () => Promise<unknown | unknown[]>;
      findOneRequest?: (
        item: unknownObject
      ) => Promise<unknownObject | unknownObject[]>;
      countRequest?: ({
        data: [],
        fields: [],
        filter: [],
        pagination: {},
        sort: [],
      }) => Promise<number>;
      upsertRequest(
        data: unknownObject
      ): Promise<unknownObject | unknownObject[]>;
      deleteRequest?: ({
        id,
      }: {
        id: string;
      }) => Promise<unknownObject | unknownObject[]>;
      uploadFileRequest?: (file: File) => Promise<string>;
      mapFindResponse?: (response: unknown[]) => unknown[];
    };
    route: {
      path: string;
      home?: boolean;
      unAuth?: boolean;
      auth?: boolean;
      exact?: boolean;
      component?: (props?: RouteChildrenProps) => JSX.Element;
    };
    tableOptions?: {
      children?: (state: unknownObject) => JSX.Element;
      component?: (
        props: unknown,
        ModelTable: React.ComponentType<unknown>
      ) => React.ReactElement;
      getItemActions?: (
        item: unknownObject,
        state: unknownObject
      ) => { isEditable: boolean; isDeletable: boolean };
      isCreatable?: boolean;
      isEditable?: boolean;
      isDeletable?: boolean;
      openOnClickRow?: boolean;
      pageSize?: number;
      renderBefore?: () => React.ReactNode;
    };
    upsertOptions?: {
      children?: (state: unknownObject) => JSX.Element;
      component?: (
        props: unknown,
        ModelUpsert: React.ComponentType<unknown>
      ) => React.ReactElement;
      onMount?: () => Promise<unknownObject>;
      renderAfter?: (state: unknownObject) => React.ReactNode;
    };
  };
  sections?: Sections;
};

export type Credentials = {
  token: string;
  user: unknownObject;
};
