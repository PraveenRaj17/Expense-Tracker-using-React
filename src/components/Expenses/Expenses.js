import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("")

  function yearFilterHandler(selectedYear) {
    setFilteredYear(selectedYear)
  }

  let filteredExpenses = []
  if (filteredYear==="") {
    filteredExpenses = props.items}
  else{
  filteredExpenses = props.items.filter(y => {return (y.date.getFullYear().toString()===filteredYear)})
  }

  return (
    <Card className="expenses">
      <ExpensesFilter currSelectedYear={filteredYear} onYearSelect={yearFilterHandler}></ExpensesFilter> {/* Two way Binding in action */}
      {/*/* Here is how to render lists. Seen in the commented code below is a static way of rendering lists - not effective. Seen right below */}
      {/* ...is the dynamic way of rendering lists.// Refer to line 18*/}
      <ExpensesChart expenses={filteredExpenses}></ExpensesChart>
      <ExpensesList expenses={filteredExpenses}/>
      {/* <div><ExpenseItem
        title={items[0].title}
        amount={items[0].amount}
        date={items[0].date}
      ></ExpenseItem></div>
      <div><ExpenseItem
        title={items[1].title}
        amount={items[1].amount}
        date={items[1].date}
      ></ExpenseItem></div>
      <div><ExpenseItem
        title={items[2].title}
        amount={items[2].amount}
        date={items[2].date}
      ></ExpenseItem></div>
      <div><ExpenseItem
        title={items[3].title}
        amount={items[3].amount}
        date={items[3].date}
      ></ExpenseItem></div> */}
    </Card>
  );
}

export default Expenses;
