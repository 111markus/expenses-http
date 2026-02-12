import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import "./Header.css";

const Header = () => {
  const ctx = useContext(AuthContext);

  return (
    <header className="app-header">
      <h1>Expense Tracker</h1>
      <div className="app-header__user">
        <span>Welcome, {ctx.username}</span>
        <button onClick={ctx.onToggleTheme}>
          {ctx.theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button onClick={ctx.onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
