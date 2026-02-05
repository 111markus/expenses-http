import React, { useState, useEffect } from "react";
import "./App.css";
import Expenses from "./components/Expenses/Expenses.jsx";
import NewExpense from "./components/NewExpense/NewExpense.jsx";

const DUMMY_EXPENSES = [
  { id: "e1", date: new Date(2023, 0, 10), title: "Pants", price: 19.99 },
  { id: "e2", date: new Date(2024, 5, 5), title: "Jeans", price: 10.99 },
  { id: "e3", date: new Date(2025, 11, 1), title: "Socks", price: 25.99 },
  { id: "e4", date: new Date(2023, 8, 15), title: "Hat", price: 13.59 },
];

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const expenseFromLS = JSON.parse(localStorage.getItem("expenses"));
    return expenseFromLS || [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
    console.log("Uus kulu lisatud:", expense);
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
