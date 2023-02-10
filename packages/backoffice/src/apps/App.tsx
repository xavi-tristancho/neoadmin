import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthPage, UnAuthPage } from "../pages";
import { ThemeModeProvider } from "../contexts";
import { getRoutes } from "../utils/routes";
import "../languages/i18n";
import "../styles/fonts/fonts.css";
import { SnackbarProvider } from "notistack";
import { merge } from "lodash";
import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext";
import { Config, Header } from "../types";

const defaultConfig = { renderThemeProvider: true };

type AppProps = {
  headers: Header[];
  config?: Partial<Config>;
};

const App = ({ headers = [], config }: AppProps) => {
  const { isLoggedIn, user } = useAuth();
  const { updateConfig } = useConfig();
  const [state, setState] = useState({
    authRoutes: [],
    unAuthRoutes: [],
    authRedirect: "",
    unAuthRedirect: "",
  });

  const actualConfig: Config = merge({}, defaultConfig, config);
  const Page = isLoggedIn ? AuthPage : UnAuthPage;
  const availableRoutes = state[isLoggedIn ? "authRoutes" : "unAuthRoutes"];
  const redirect = state[isLoggedIn ? "authRedirect" : "unAuthRedirect"];

  useEffect(() => {
    updateConfig(actualConfig);
    getRoutes({
      headers,
      isLoggedIn,
      user,
    }).then(({ authRoutes, unAuthRoutes }) => {
      const homeAuthRoute = authRoutes.find(({ home = false }) => home);
      const homeUnAuthRoute = unAuthRoutes.find(({ home = false }) => home);
      setState({
        authRoutes,
        unAuthRoutes,
        authRedirect: homeAuthRoute ? homeAuthRoute.path : "/",
        unAuthRedirect: homeUnAuthRoute ? homeUnAuthRoute.path : "/",
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return availableRoutes.length > 0 ? (
    <Router>
      <SnackbarProvider>
        <ThemeModeProvider customTheme={actualConfig}>
          <Page routes={availableRoutes}>
            <Switch>
              {availableRoutes.map((route, key) => (
                <Route key={key} {...route} />
              ))}
              <Redirect to={redirect}></Redirect>
            </Switch>
          </Page>
        </ThemeModeProvider>
      </SnackbarProvider>
    </Router>
  ) : (
    <></>
  );
};

export default App;
