const API_ROOT = process.env.EXPO_PUBLIC_FIREBASE_API;

import axios from "axios";
import { Expense } from "./ExpensesReducer";
import AppSettings from "../AppSettings";

export async function addNewExpense(expenseData: Expense) {
  const response = await axios.post(`${API_ROOT}/expenses.json`, expenseData);

  return response.data;
}

export async function fetchAllExpenses(): Promise<Expense[]> {
  console.log(`Fetching all expenses from ${API_ROOT}`);
  const reponses = await axios.get(`${API_ROOT}/expenses.json`);
  const expenses = [];

  for (const key in reponses.data) {
    const expense = {
      id: key,
      amount: reponses.data[key].amount,
      date: reponses.data[key].date,
      description: reponses.data[key].description,
    };
    expenses.push(expense);
  }

  return expenses;
}
