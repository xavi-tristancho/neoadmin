import { BrowserRouterProps } from "react-router-dom";

export type Config = {
  renderThemeProvider: boolean;
  wysiwyg: { apiKey: string };
  router: BrowserRouterProps;
};

export type Header = { [key: string]: unknown };
