import { createContext, useState, useContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  user: AuthContextUser;
  login: (userConfig: LoginInputProps) => void;
  logout: () => void;
  updateUser: (user: AuthContextUser) => void;
};

type AuthContextUser = { [key: string]: unknown };

export type LoginInputProps = {
  token: string;
  user: AuthContextUser;
};

const AuthContext = createContext<AuthContextType | null>(null);

const initState = (key, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return defaultValue;
  }
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initState("isLoggedIn", false));
  const [user, setUser] = useState(initState("user", {}));

  const login = ({ token, user: nextUser }) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(nextUser));

    setUser(nextUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser({});
    setIsLoggedIn(false);
  };

  const updateUser = (nextUser) => {
    localStorage.setItem("user", JSON.stringify({ ...user, ...nextUser }));
    setUser({ ...user, ...nextUser });
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth has to be used within <AuthContext.Provider>");
  }

  return authContext;
};

export default AuthContext;
