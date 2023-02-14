import { BrowserRouterProps } from "react-router-dom";

export type Config = {
  renderThemeProvider: boolean;
  wysiwyg: { apiKey: string };
  router: BrowserRouterProps;
};

export type unknownObject = {
  [key: string]: unknown | any;
};

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
      mapFindResponse?: (response: any[]) => any[];
    };
    route: {
      path: string;
      home?: boolean;
      unAuth?: boolean;
      auth?: boolean;
      exact?: boolean;
      component?: (props?: any) => JSX.Element;
    };
    tableOptions?: {
      children?: (state: unknownObject) => JSX.Element;
      component?: (
        props: any,
        ModelTable: React.ComponentType<any>
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
        props: any,
        ModelUpsert: React.ComponentType<any>
      ) => React.ReactElement;
      onMount?: () => Promise<unknownObject>;
      renderAfter?: (state: unknownObject) => React.ReactNode;
    };
  };
  sections?: {
    component?: () => JSX.Element;
    fields?: Array<unknownObject>;
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
};
