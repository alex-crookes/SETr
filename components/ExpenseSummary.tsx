import { Text } from "react-native";
import { useContext } from "react";
import { Expense } from "../provider/ExpensesReducer";
import { useSelector } from "react-redux";
import { RootState } from "../provider/RootStore";
import { ThemeContext } from "../ds/ThemeProvider";
import Panel from "../ds/molecules/Panel";
import { localizeCurrency, translate } from "../localization/Localization";
import { newFilterExpensesByDate } from "../repository/Expenses";

function ExpenseSummary() {
  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expensesStore.expenses
  );
  const {typography } = useContext(ThemeContext);

  const lastSevenDaysExpenses = newFilterExpensesByDate(expenses, Date.now());
  const lastSevenDaysTotal = lastSevenDaysExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  return (
    <Panel title={"Last Seven Days"}>
      <Text style={typography.body}>
        {translate("expenses_SevenDaySummary", {
          count: lastSevenDaysExpenses.length,
          total: localizeCurrency(lastSevenDaysTotal),
        })}
      </Text>
    </Panel>
  );
}



export default ExpenseSummary;