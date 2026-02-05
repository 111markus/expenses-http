import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
// import './NewExpense.css';

const NewExpense = (props) => {
  // vormi nähtavuse haldamine
  const [isEditing, setIsEditing] = useState(false);

  // vormi avamine
  const startEditingHandler = () => {
    setIsEditing(true);
    console.log("vormi avamine");
  };

  //  vormi sulgemine
  const stopEditingHandler = () => {
    setIsEditing(false);
    console.log("vormi sulgemine");
  };

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    // edasta andmed App.jsx faili
    props.onAddExpense(expenseData);

    // vormi sulgemine pärast salvestamist
    setIsEditing(false);
    console.log("vormi sulgemine");
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}

      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
