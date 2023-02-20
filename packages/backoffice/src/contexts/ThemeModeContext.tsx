import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../styles/theme";
import { ConfigContext } from ".";
import { Config } from "../types";

type ColorModeType = {
  toggleColorMode: () => void;
};

const ThemeModeContext = createContext<ColorModeType>({
  toggleColorMode: () => {},
});

type ThemeModeProviderProps = {
  children: React.ReactNode;
};

type ConfigThemeContextType = {
  config: Partial<Config>;
};

export const ThemeModeProvider = ({ children }: ThemeModeProviderProps) => {
  const { config: { customTheme = {}, renderThemeProvider = true } = {} } =
    useContext<ConfigThemeContextType>(ConfigContext);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });
  const [themeMode, setThemeMode] = useState(
    prefersDarkMode ? "dark" : "light"
  );

  useEffect(() => {
    setThemeMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme(themeMode === "light" ? lightTheme : darkTheme, customTheme),
    [themeMode]
  );

  return renderThemeProvider ? (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  ) : (
    <>{children}</>
  );
};

export const useThemeMode = () => {
  const themeContext = useContext(ThemeModeContext);

  if (!themeContext) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
};

export default ThemeModeContext;
