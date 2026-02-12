import React, { useContext, useState, useEffect } from "react";

import "./App.css";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Error from "./components/UI/Error";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import AuthContext from "./store/auth-context";

const App = () => {
  const ctx = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!ctx.isLoggedIn) return;

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
  }, [ctx.isLoggedIn]);

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
      {!ctx.isLoggedIn && <Login />}
      {ctx.isLoggedIn && (
        <>
          <Header />
          <NewExpense onAddExpense={addExpensehandler}></NewExpense>
          <Expenses expenses={expenses} isLoading={isFetching}></Expenses>
        </>
      )}
    </div>
  );
};

export default App;
