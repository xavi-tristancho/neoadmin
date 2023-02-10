import React from "react";
import { AuthProvider, ConfigProvider } from ".";

const NeoAdminProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ConfigProvider>{children}</ConfigProvider>
    </AuthProvider>
  );
};

export default NeoAdminProviders;
