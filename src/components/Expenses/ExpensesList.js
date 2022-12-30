// Conditional Content
import ExpenseItem from "./ExpenseItem";
import './ExpensesList.css'

function ExpensesList(props) {
  if (props.expenses.length === 0) {
    return <h4 className="expenses-list__fallback">Found no expenses for the selected year!</h4>
  }

  // We add key to help react identify each component or item in the array.
  return (
    <ul className="expenses-list"> 
      {
        props.expenses.map((x) => (
          <ExpenseItem key={x.id} title={x.title} amount={x.amount} date={x.date} />
        ))
      }
    </ul>
  )
}

export default ExpensesList
