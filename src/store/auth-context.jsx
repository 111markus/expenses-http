import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  username: "",
  onLogin: (username) => {},
  onLogout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        username: username,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
