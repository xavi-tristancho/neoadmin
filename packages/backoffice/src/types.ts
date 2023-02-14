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
  sections?: Sections;
};

export type UnAuthFormProps = {
  onSubmit: (data: Record<string, any>) => Promise<void>;
  title: string;
  submitText: string;
  register?: {
    text: string;
    to: string;
    linkText: string;
  };
  recoverPassword?: {
    text: string;
    to: string;
    linkText: string;
  };
  fields: Array<unknownObject>;
  message?: Record<string, any>;
  children: React.ReactNode;
  resetMode?: () => void;
};

export type UnAuthPageFormProps = {
  onSubmit: (
    credentials: Record<string, string>
  ) => Promise<{ user: unknownObject; token: string }>;
  afterSubmit: (submittedProps: {
    user: unknownObject;
    token: string;
  }) => Promise<void>;
  page: string;
  title: string;
  submitText: string;
  fields: Array<unknownObject>;
  children: React.ReactNode;
};
