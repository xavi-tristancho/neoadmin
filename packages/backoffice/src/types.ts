import { Field } from "@app-artisans/form/src/types";
import { BrowserRouterProps, RouteChildrenProps } from "react-router-dom";

export type ModelUpsertState = {
  data: unknownObject;
  aux: unknownObject;
};

export type Config = {
  customTheme: unknownObject;
  renderThemeProvider: boolean;
  wysiwyg: { apiKey: string };
  router: BrowserRouterProps;
  CompanyLogo?: () => JSX.Element;
};

export type unknownObject = {
  [key: string]: unknown | unknownObject;
};

export type Section<Entity> = {
  component?: () => JSX.Element;
  fields?: Field<Entity>[];
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
};

export type Route = {
  path: string;
  home?: boolean;
  unAuth?: boolean;
  auth?: boolean;
  exact?: boolean;
  component?: (props?: RouteChildrenProps) => JSX.Element;
  showOnSidebar?: boolean;
};

type CountRequestParams = {
  data: unknownObject[];
  fields: unknownObject[];
  filter: unknownObject[];
  pagination: unknownObject;
  sort: unknownObject[];
};

export type TableOptions = {
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

export type UpsertOptions = {
  children?: (state: unknownObject) => JSX.Element;
  component?: (
    props: unknown,
    ModelUpsert: React.ComponentType<unknown>
  ) => React.ReactElement;
  onMount?: () => Promise<unknownObject>;
  renderAfter?: (state: unknownObject) => React.ReactNode;
  show?: boolean;
};

export type Header<Entity = null> = {
  type: "CRUD" | "Page";
  options: {
    name: string;
    primaryKey?: string;
    requests?: {
      findRequest: () => Promise<unknown | unknown[]>;
      findOneRequest?: (
        item: unknownObject
      ) => Promise<unknownObject | unknownObject[]>;
      countRequest?: (params: CountRequestParams) => Promise<number>;
      upsertRequest?: (
        data: unknownObject
      ) => Promise<unknownObject | unknownObject[]>;
      deleteRequest?: ({
        id,
      }: {
        id: string;
      }) => Promise<unknownObject | unknownObject[]>;
      uploadFileRequest?: (file: File) => Promise<string>;
      mapFindResponse?: (response: unknown[]) => unknown[];
    };
    route: Route;
    tableOptions?: TableOptions;
    upsertOptions?: UpsertOptions;
  };
  sections?: Section<Entity>[];
};
