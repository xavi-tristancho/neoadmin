/* eslint-disable no-unused-vars */
import { ModelTable, ModelUpsert } from "../components";

export const getRoutes = ({ headers, isLoggedIn = false, user }) =>
  getRoutesFromHeaders({ headers, isLoggedIn, user }).then((routes) => {
    const authRoutes = routes.filter(({ auth = true }) => auth === true);
    const unAuthRoutes = routes.filter(({ unAuth = false }) => unAuth === true);

    return { authRoutes, unAuthRoutes };
  });

const getRoutesFromHeaders = ({ headers = [], isLoggedIn, user }) =>
  headers?.reduce((reducer, header) => {
    return reducer.then((accumulator) => {
      return (
        typeof header === "function"
          ? header({ isLoggedIn, user })
          : Promise.resolve(header)
      ).then((treatedHeader) => {
        return [...accumulator, ...getRoutesByType(treatedHeader)];
      });
    });
  }, Promise.resolve([]));

const getRoutesByType = (header) => {
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
  }
};

const mustShowOnSidebar = ({ route }) => {
  const { showOnSidebar = true } = route;
  return showOnSidebar
    ? {
        to: typeof route === "object" ? route.path : route,
      }
    : {};
};

const getRouteProps = ({ route, suffix = "" }) => {
  if (typeof route === "object") {
    const { to, ...routeProps } = route;
    return { ...routeProps, path: route.path + suffix };
  }
  return { path: route + suffix };
};

export const getRoutePath = (route) => {
  const isObject = typeof route === "object";
  const isString = typeof route === "string";
  const pathIsString = typeof route.path === "string";

  if (isObject && pathIsString) {
    return route.path.includes("/") ? route.path : `/${route.path}`;
  }

  if (isString) {
    return route.includes("/") ? route : `/${route}`;
  }

  return "";
};

const composeComponent = ({ DefaultComponent, component, header }) =>
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
