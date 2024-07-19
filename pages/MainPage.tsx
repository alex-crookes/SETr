import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadExpenses } from "../repository/Expenses";
import { Expense } from "../provider/ExpensesReducer";
import { RootState } from "../provider/RootStore";
import { NewExpense } from "../components/NewExpense";
import ExpenseDetail from "../components/ExpenseDetail";
import { copy } from "../localization/Localization";

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadExpenses(dispatch);
  }, []);

  const expenses: Expense[] = useSelector(
    (state: RootState) => state.ExpensesReducer.expenses
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.ExpensesReducer.loading
  );

  const text = loading
    ? copy.t("common_Loading")
    : copy.t("expense_ThereAreX", { count: expenses.length });

  return (
    <View>
      <View style={styles.container}>
        <NewExpense />
        <FlatList
          data={expenses}
          ListHeaderComponent={
            <Text style={styles.listHeaderText}>
              {copy.t("app_Name")} - {copy.t("section_RecentExpenses")}
            </Text>
          }
          renderItem={({ item }) => <ExpenseDetail expense={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  listHeaderText: {
    marginTop: 32,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "600",
  },
});

export default MainPage;
