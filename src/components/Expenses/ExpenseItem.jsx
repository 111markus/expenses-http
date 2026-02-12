import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import { useState } from "react";

const ExpenseItem = (props) => {
  const [title, setTitle] = useState(props.expenseData.title);

  const clickHandler = () => {
    setTitle((prev) =>
      prev.startsWith("Updated by click")
        ? prev
        : `Updated by click ${props.expenseData.title}`,
    );
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.expenseData.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.expenseData.amount}</div>
      </div>
      <button onClick={clickHandler}>Update!</button>
    </Card>
  );
};

export default ExpenseItem;
