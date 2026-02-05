import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2023");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    console.log("Valitud aasta:", selectedYear);
  };

  const filteredExpenses = props.expenses.filter((expense) => {
    return new Date(expense.date).getFullYear() == filteredYear;
  });

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />

      {filteredExpenses.length === 0 ? (
        <p style={{ color: "white", textAlign: "center" }}>
          Sellel aastal kulusid ei leitud.
        </p>
      ) : (
        filteredExpenses.map((item) => (
          <ExpenseItem key={item.id} expenseData={item} />
        ))
      )}
    </Card>
  );
};

export default Expenses;
