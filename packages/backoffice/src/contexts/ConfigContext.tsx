import { createContext, useState, useContext } from "react";
import { Config } from "../types";

export type ConfigContextType = {
  config: Partial<Config>;
  updateConfig: (nextConfig: Config) => void;
};

const ConfigContext = createContext<ConfigContextType | null>(null);

const initState = { wysiwyg: { apiKey: "" } };

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(initState);

  const updateConfig = (nextConfig: Config) => {
    setConfig(nextConfig);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const configContext = useContext(ConfigContext);

  if (!configContext) {
    throw new Error("useConfig has to be used within <ConfigContext.Provider>");
  }

  return configContext;
};

export default ConfigContext;
