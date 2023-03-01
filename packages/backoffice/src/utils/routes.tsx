/* eslint-disable no-unused-vars */
import { ModelTable, ModelUpsert } from "../components";
import { Header, Route } from "../types";

type User = {
  [key: string]: string;
};

type GetRoutesProps = {
  headers: Header[];
  isLoggedIn: boolean;
  user: User;
};

type GetRoutesFn = (props: GetRoutesProps) => Promise<{
  authRoutes: Route[];
  unAuthRoutes: Route[];
}>;

type GetRoutesFromHeadersFn = (props: GetRoutesProps) => Promise<Route[]>;

type GetRoutesByTypeFn = (header: Header) => Route[];

interface MyRoute extends Route {
  showOnSidebar?: boolean;
}

type MustShowOnSidebarFn = (props: { route: MyRoute }) => {
  to?: string;
};

type GetRoutePropsFn = (props: { route: Route | string; suffix?: string }) => {
  path: string;
};
type GetRoutePathFn = (route: Route | string) => string;

type ComposeComponentFn = <T extends Header>({
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

export const getRoutes: GetRoutesFn = ({ headers, isLoggedIn = false, user }) =>
  getRoutesFromHeaders({ headers, isLoggedIn, user }).then((routes) => {
    const authRoutes: Route[] = routes.filter(
      ({ auth = true }) => auth === true
    );
    const unAuthRoutes: Route[] = routes.filter(
      ({ unAuth = false }) => unAuth === true
    );
    return { authRoutes, unAuthRoutes };
  });

const getRoutesFromHeaders: GetRoutesFromHeadersFn = ({
  headers,
  isLoggedIn,
  user,
}) =>
  (headers ?? []).reduce<Promise<Route[]>>((reducer, header) => {
    return reducer.then((accumulator: Route[]) => {
      return (
        typeof header === "function"
          ? (header as (props: GetRoutesProps) => Promise<Header>)({
              isLoggedIn,
              user,
            })
          : Promise.resolve(header)
      ).then((treatedHeader: Header) => {
        return [...accumulator, ...getRoutesByType(treatedHeader)];
      });
    });
  }, Promise.resolve([] as Route[]));

const getRoutesByType: GetRoutesByTypeFn = (header) => {
  if (typeof header.type === "undefined") {
    throw new Error(
      `You must define the type property in your ${header.options.name} header`
    );
  }

  switch (header.type) {
    case "CRUD":
      return [
        {
          name: header.options.name,
          exact: true,
          component: composeComponent({
            DefaultComponent: ModelTable,
            component: header.options?.tableOptions?.component,
            header,
          }),
          ...mustShowOnSidebar(header.options),
          ...getRouteProps({ route: header.options.route }),
        },
        {
          name: header.options.name,
          component: composeComponent({
            DefaultComponent: ModelUpsert,
            component: header.options?.upsertOptions?.component,
            header,
          }),
          exact: true,
          ...getRouteProps({
            route: header.options.route,
            suffix: "/new",
          }),
        },
        {
          name: header.options.name,
          component: composeComponent({
            DefaultComponent: ModelUpsert,
            component: header.options?.upsertOptions?.component,
            header,
          }),
          ...getRouteProps({
            route: header.options.route,
            suffix: "/:id",
          }),
        },
      ];

    case "Page":
      return [
        {
          name: header.options.name,
          ...(typeof header.options.route === "object"
            ? header.options.route
            : {}),
          ...mustShowOnSidebar(header.options),
        },
      ];

    default:
      throw new Error(
        `Unsupported type property in your ${header.options.name} header`
      );
  }
};

const mustShowOnSidebar: MustShowOnSidebarFn = ({ route }) => {
  const { showOnSidebar = true } = route;
  return showOnSidebar
    ? {
        to: typeof route === "object" ? route.path : route,
      }
    : {};
};

const getRouteProps: GetRoutePropsFn = ({ route, suffix = "" }) => {
  if (typeof route === "object") {
    const { ...routeProps } = route;
    return { ...routeProps, path: route.path + suffix };
  }
  return { path: `${route}${suffix}` };
};

export const getRoutePath: GetRoutePathFn = (route) => {
  if (typeof route === "object" && "path" in route) {
    const pathIsString = typeof route.path === "string";
    if (pathIsString) {
      return route.path.includes("/") ? route.path : `/${route.path}`;
    }
  } else if (typeof route === "string") {
    return route.includes("/") ? route : `/${route}`;
  }

  return "";
};

const composeComponent: ComposeComponentFn = ({
  DefaultComponent,
  component,
  header,
}) =>
  function ComposedComponent(props) {
    return typeof component === "function" ? (
      component(
        {
          ...props,
          headers: header,
        },
        DefaultComponent
      )
    ) : (
      <DefaultComponent {...props} header={header} />
    );
  };
