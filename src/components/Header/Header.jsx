import React from "react";
import "./Header.css";

const Header = ({ username, onLogout }) => {
  return (
    <header className="app-header">
      <h1>Expense Tracker</h1>
      <div className="app-header__user">
        <span>Welcome, {username}</span>
        <button className="app-header__logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
