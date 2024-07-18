import { Dispatch } from "react";
import { addNewExpense, fetchAllExpenses } from "../provider/http";
import { Expense, expensesActions } from "../provider/ExpensesReducer";
import { getCurrentMilliseconds } from "../extensions/time";

export async function loadExpenses(dispatch: Dispatch<any>) {
  dispatch(expensesActions.setLoading(true));
  fetchAllExpenses()
    .then((data) => {
      console.log(data);
      dispatch(expensesActions.setExpenses(data));
    })
    .catch((error) => {
      console.log("Expenses Error: ", error);
    })
    .finally(() => {
      dispatch(expensesActions.setLoading(false));
    });
}

export async function addNew(
  amount: number,
  description: string,
  date: number | null,
  dispatch
) {
  const savedDate = date ? date : getCurrentMilliseconds();
  dispatch(expensesActions.setSaving(true));
  const newExpense: Expense = {
    amount: amount,
    description: description,
    date: savedDate,
    id: null,
  };

  const response = await addNewExpense(newExpense);

  newExpense.id = response.name;
  dispatch(expensesActions.addExpense(newExpense));
  dispatch(expensesActions.setSaving(false));
}
