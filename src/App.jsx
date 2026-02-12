import React, { Fragment, useState, useEffect } from "react";

import "./App.css";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Error from "./components/UI/Error";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (storedLogin === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3005/expenses");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error("Failed fetching data");
        }
        setExpenses(responseData.expenses);
      } catch (error) {
        setError({
          title: "An error occured!",
          message: "Failed fetching expenses data, please try again later.",
        });
        setShowError(true);
      }
      setIsFetching(false);
    };
    getExpenses();
    console.log(expenses);
  }, [isLoggedIn]);

  const loginHandler = (loggedInUsername) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUsername("");
    setExpenses([]);
  };

  const errorHandler = () => {
    setError(null);
    setShowError(false);
  };

  const addExpensehandler = (expense) => {
    const addExpense = async (expense) => {
      try {
        const response = await fetch("http://localhost:3005/add-expense", {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error("Failed saving data");
        }
        setExpenses([expense, ...expenses]);
      } catch (error) {
        setError({
          title: "An error occured!",
          message: "Failed saving expenses data, please try again.",
        });
        setShowError(true);
      }
    };
    addExpense(expense);
  };

  return (
    <div className="App">
      {showError && (
        <Error
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && (
        <>
          <Header username={username} onLogout={logoutHandler} />
          <NewExpense onAddExpense={addExpensehandler}></NewExpense>
          <Expenses expenses={expenses} isLoading={isFetching}></Expenses>
        </>
      )}
    </div>
  );
};

export default App;
