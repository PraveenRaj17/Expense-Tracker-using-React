// Component for forms to add new expense.
// Concepts: State, Changing states, using multiple states, event listeners, Two way binding

import React from "react";
import "./ExpenseForm.css";
import { useState } from "react";
import styled from "styled-components";

//* Styled components accept props by default
const NewExpenseControlTitle = styled.div`
  & label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
    color: ${(props) => (props.invalid ? "red" : "black")};
  }

  & input {
    font: inherit;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
    background-color: ${(props) => (props.invalid ? "#ffd7d7" : "white")};
    width: 20rem;
    max-width: 100%;
  }
`; //* Here in case of styled components, `` act like () where we pass parameters
const ExpenseForm = (props) => {
  //* Multiple useStates can be used in a component like below. Or we can club these three seperate variables into one object.

  // const [enteredTitle, setEnteredTitle] = useState("");
  // const [enteredAmount, setEnteredAmount] = useState("");
  // const [enteredDate, setEnteredDate] = useState("");

  const [displayForm, setDisplayForm] = useState(false);
  const [isValidInput, setIsValidInput] = useState({
    isValidTitle: true,
    isValidAmount: true,
    isValidDate: true,
  });
  //*** Multiple useState variables clubbed into one object */
  const [userInputs, setUserInputs] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });

  function titleChangeHandler(event) {
    //* Here we are updating only one variable. setUserInput will replace the old state for new state. It will not merge.
    //* Hence, we use the spread operator to copy values from old state and replace enteredTitle alone.

    // setUserInputs({
    // ...userInputs,
    // enteredTitle: event.target.value,})

    //
    //! However, it is not recommended to update states like above when it depends on the previous State.
    //! ...It might fail in certain niche cases.
    //* The correct way is to write a function inside setUSerInputs which receives 'prevState' as argument, copies it and replaces
    //* ...the value of the variable of interest. Using 'prevState' ensures we have the latest snapshot of the State.
    if (event.target.value.trim().length > 0) {
      setIsValidInput((prevIsValidInput) => {
        return { ...prevIsValidInput, isValidTitle: true };
      });
    }
    setUserInputs((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
    // We use prevState inplace of userInputs itself. prevState means previous state. This helps us keep track of the
    // ...previous state
  }

  function amountChangeHandler(event) {
    if (event.target.value.trim().length > 0) {
      setIsValidInput((prevIsValidInput) => {
        return { ...prevIsValidInput, isValidAmount: true };
      });
    }
    setUserInputs((prevState) => {
      return { ...prevState, enteredAmount: Number(event.target.value) };
    });
  }

  function dateChangeHandler(event) {
    if (event.target.value.trim().length > 0) {
      setIsValidInput((prevIsValidInput) => {
        return { ...prevIsValidInput, isValidDate: true };
      });
    }
    setUserInputs((prevState) => {
      return { ...prevState, enteredDate: event.target.value };
    });
  }

  // let isValidTitle = true;
  // let isValidAmount = true;
  // let isValidDate = true;

  function submitBtnHandler(event) {
    event.preventDefault(); //* This prevents the page from reloading when submit button is clicked
    // title = userInputs.enteredTitle
    // date = userInputs.enteredDate
    // amount = userInputs.enteredAmount
    // setUserInputs((prevState) => {
    //   return { enteredTitle: "", enteredAmount: "", enteredDate: "" };
    // });
    //* In the above line, we have collected the entered data into an object. Now this has to be passed to parent components.
    //* ...Props help us pass data parent to child. To pass data from child to parent we follow a different approach. Start from
    //* ...NewExpense.js return() snippet.
    //* In the below line, we use props to get the function defined in NEwExpense component and execute it passing the entered data.

    if (displayForm === true) {
      if (userInputs.enteredTitle.trim().length === 0) {
        alert("Please provide a valid title!");
        return setIsValidInput((prevIsValidInput) => {
          return { ...prevIsValidInput, isValidTitle: false };
        });
      }
      if (userInputs.enteredAmount.toString().trim().length === 0) {
        alert("Please provide a valid amount!");
        return setIsValidInput((prevIsValidInput) => {
          return { ...prevIsValidInput, isValidAmount: false };
        });
      }
      if (userInputs.enteredDate.toString().trim().length === 0) {
        alert("Please provide a valid date!");
        return setIsValidInput((prevIsValidInput) => {
          return { ...prevIsValidInput, isValidDate: false };
        });
      }
      // if (
      //   isValidAmount === false ||
      //   isValidDate === false ||
      //   isValidTitle === false
      // ) {
      //   console.log(isValidTitle)
      //   return setIsValidInput(false);
      // }
      setIsValidInput({
        isValidTitle: true,
        isValidAmount: true,
        isValidDate: true,
      });
      props.onSaveExpense(userInputs); // We use the () symbol here to execute the function pointed by onSaveExpense (refer to the function in NewExpense)
      setUserInputs((prevState) => {
        return { enteredTitle: "", enteredAmount: "", enteredDate: "" };
      });
      // setDisplayForm(true)
    } else {
      setDisplayForm(true);
    }
  }

  function cancelBtnHandler() {
    setDisplayForm(false);
  }

  if (displayForm === false) {
    return (
      <form onSubmit={submitBtnHandler}>
        <button type="submit">ADD NEW EXPENSE</button>
      </form>
    );
  }

  //* Two way binding: We give an attribute value in the input tags which will hold the current value in the field. The value
  //* ...basically changes whenever the field is changed (since we call the ChangeHandler functions). This might sound like an
  //* ...infinite loop but its not. This helps us set the field to empty when the form is submitted (refer to submitHandler).

  //* Styled components:
  //* Dynamic styling:
  //* Normal styling:
  return (
    <form onSubmit={submitBtnHandler}>
      {/* <form> */}
      <div className="new-expense__controls">
        {/* Styled Components */}
        {/* .......Using className to add 'invalid' condition */}
        {/* <newExpenseControlTitle className={!isValidInput.isValidTitle && 'invalid'}> */}
        {/* .......Using props to add 'invalid' condition */}
        <NewExpenseControlTitle invalid={!isValidInput.isValidTitle}>
          <label>Title</label>
          <input
            type="text"
            onChange={titleChangeHandler}
            value={userInputs.enteredTitle}
          />
        </NewExpenseControlTitle>
        {/* Dynamic Styling */}
        {/* {``} - This is a template literal - helps us add javascript within JSX */}
        <div
          className={`new-expense__control ${
            !isValidInput.isValidAmount ? "invalid" : ""
          }`}
        >
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
            value={userInputs.enteredAmount}
          />
        </div>
        {/* Inline Styling */}
        <div className="new-expense__control">
          <label style={{ color: !isValidInput.isValidDate ? "red" : "black" }}>
            Date
          </label>
          <input
            type="date"
            min="2019-01-01"
            max="2023-12-31"
            onChange={dateChangeHandler}
            value={userInputs.enteredDate}
            style={{
              borderColor: !isValidInput.isValidDate ? "red" : "white",
              background: !isValidInput.isValidDate ? "salmon" : "white",
            }}
          />
        </div>
      </div>
      <div>
        <span className="new-expense__actions">
          <button onClick={cancelBtnHandler}>CANCEL</button>
        </span>
        <span className="new-expense__actions">
          <button type="submit">ADD EXPENSE</button>
        </span>
      </div>
    </form>
  );
};

export default ExpenseForm;
