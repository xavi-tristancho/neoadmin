import { Header, Route } from "../types";

export type User = {
  [key: string]: string;
};

export type GetRoutesProps = {
  headers: Header[];
  isLoggedIn: boolean;
  user: User;
};

export type GetRoutesFn = (props: GetRoutesProps) => Promise<{
  authRoutes: Route[];
  unAuthRoutes: Route[];
}>;

export type GetRoutesFromHeadersFn = (
  props: GetRoutesProps
) => Promise<Route[]>;

export type GetRoutesByTypeFn = (header: Header) => Route[];

interface MyRoute extends Route {
  showOnSidebar?: boolean;
}

export type MustShowOnSidebarFn = (props: { route: MyRoute }) => {
  to?: string;
};

export type GetRoutePropsFn = (props: {
  route: Route | string;
  suffix?: string;
}) => {
  path: string;
};
export type GetRoutePathFn = (route: Route | string) => string;

export type ComposeComponentFn = <T extends Header>({
  DefaultComponent,
  component,
  header,
}: {
  DefaultComponent: React.ComponentType<T>;
  component?: (
    props: T & { headers: Header },
    DefaultComponent: React.ComponentType<T>
  ) => JSX.Element;
  header: Header;
}) => React.ComponentType<T>;
