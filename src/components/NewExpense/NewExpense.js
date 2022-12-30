import React from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  function saveExpenseDataHandler(enteredExpenseData) {
    const [year, month, day] = enteredExpenseData.enteredDate.split("-");
    let modEnteredExpenseData = {
      title: enteredExpenseData.enteredTitle,
      amount: enteredExpenseData.enteredAmount,
      date: new Date(year, month - 1, day), // Because here month is 0 indexed
    }; // Matching key names with the ones in App.js
    let expenseData = {
      id: Math.random().toString(),
      ...modEnteredExpenseData,
    }; // We create an ID for the new entered expense data
    props.onAddedNewExpense(expenseData);
  }

  //* To pass data from child to parent, we first start from parent. We create a dummy event listener onSaveExpense which would trigger a function
  //* ...when form is submitted in ExpenseForm. This function basically appends entered data into existing object containing expenses list.
  //! We point the dummy event listener to the function but not call it. We will call it in the submit handler of ExpenseForm. However, we define the
  //! ...function here at line 7.
  //* Using onSaveExpense is like passing a prop to ExpenseForm component! We will use this prop in ExpenseForm.
  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpense={saveExpenseDataHandler}></ExpenseForm>
    </div>
  );
};

export default NewExpense;
