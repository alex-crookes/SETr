import { createSlice } from "@reduxjs/toolkit";

const initialState: ExpensesState = {
  expenses: [],
  loading: false,
  saving: false,
};

const ExpensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSaving(state, action) {
      state.saving = action.payload;
    },
  },
});

type ExpensesState = {
  expenses: Expense[];
  loading: boolean;
  saving: boolean;
};

export type Expense = {
  amount: number;
  date: number;
  description: string;
  id: string | null; // null if create locally, but not yet persisted
};

export const expensesActions = ExpensesSlice.actions;
export default ExpensesSlice.reducer;
