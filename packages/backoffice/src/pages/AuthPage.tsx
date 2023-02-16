import { useContext } from "react";
import styled from "styled-components";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { List, ListItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AuthContext from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import responsive from "../utils/responsive";
import getModelInitialLetter from "../utils/authPage";
import { unknownObject } from "@neoco/neoco-backoffice/src/types";

type AuthPageProps = {
  children: React.ReactNode;
  routes: Array<unknownObject>;
};

const { mediaQuery } = responsive;

const AuthPage = ({ children, routes }: AuthPageProps) => {
  const theme = useTheme();
  const { sidebarProps } = useContext(AuthContext);
  const { pathname } = useLocation();
  const path = `/${pathname.split("/")?.[1]}`;

  return (
    <Container>
      <Sidebar {...sidebarProps}>
        <CustomList>
          {routes
            .filter((route) => route.to)
            .map(({ icon: CustomIcon, ...route }) => {
              const selectedPath = route.to === path;
              return (
                <CustomListItem
                  key={route.to}
                  theme={theme}
                  $selectedPath={selectedPath}
                >
                  <CustomRouterLink to={route.to}>
                    <IconContainer>
                      {CustomIcon && typeof CustomIcon === "function" ? (
                        <CustomIcon $selectedPath={selectedPath} />
                      ) : (
                        <InitialLetter>
                          {getModelInitialLetter(route.to)}
                        </InitialLetter>
                      )}
                    </IconContainer>
                    <RouteName>{route.name}</RouteName>
                  </CustomRouterLink>
                </CustomListItem>
              );
            })}
        </CustomList>
      </Sidebar>
      <ChildrenContainer theme={theme}>{children}</ChildrenContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const CustomList = styled(List)`
  && {
    padding-top: 40px;
  }
`;

const CustomListItem = styled(ListItem)`
  margin: 0px 5px;
  max-width: calc(100% - 10px);
  ${({ theme, $selectedPath }) =>
    $selectedPath &&
    "background-color: " +
      theme.palette.primary.light +
      "; border-radius: 15px; color: #ffffff;"};
  ${mediaQuery.TABLET`
    margin: 0px 12px;
    max-width: calc(100% - 24px);`}
`;

const CustomRouterLink = styled(RouterLink)`
  text-decoration: none;
  display: flex;
  align-items: center;

  &,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
  }
`;

const IconContainer = styled.div`
  && {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const InitialLetter = styled.span`
  font-weight: bold;
  text-align: center;
`;

const RouteName = styled.span`
  margin-left: 35px;
`;

const ChildrenContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 52px 24px 15px 24px;
  background: ${({ theme }) => theme?.palette?.neoAdmin?.page?.backgroundColor};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
`;

export default AuthPage;
