import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  username: "",
  theme: "dark",
  onLogin: (username) => {},
  onLogout: () => {},
  onToggleTheme: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (storedLogin === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const loginHandler = (loggedInUsername) => {
    const displayName = loggedInUsername.includes("@")
      ? loggedInUsername.split("@")[0]
      : loggedInUsername;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", displayName);
    setIsLoggedIn(true);
    setUsername(displayName);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUsername("");
  };

  const toggleThemeHandler = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        username: username,
        theme: theme,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onToggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
