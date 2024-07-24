import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadExpenses } from "../repository/Expenses";
import { Expense } from "../provider/ExpensesReducer";
import { RootState } from "../provider/RootStore";
import { NewExpense } from "../components/NewExpense";
import ExpenseDetail from "../components/ExpenseDetail";
import { translate } from "../localization/Localization";
import { ThemeContext } from "../ds/ThemeProvider";
import ListHeader from "../ds/molecules/ListHeader";
import ElementBlock from "../ds/molecules/ElementBlock";

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadExpenses(dispatch);
  }, []);

  //const { layout, colors } = useTheme(true, 8);

  const { isDarkTheme, colors, measurements, blocks, typography, toggleTheme } =
    useContext(ThemeContext);

  const expenses: Expense[] = useSelector(
    (state: RootState) => state.ExpensesReducer.expenses
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.ExpensesReducer.loading
  );

  const text = loading
    ? translate("common_Loading")
    : translate("expense_ThereAreX", { count: expenses.length });

  const title = `${translate("app_Name")} - ${translate(
    "section_RecentExpenses"
  )}`;

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <View style={blocks.pageContainer}>
      <ElementBlock>
        <NewExpense />
        <FlatList
          data={expenses}
          ListHeaderComponent={
            <>
              <ListHeader text={title} />
              {/* <Text style={styles.listHeaderText}>
                {translate("app_Name")} - {translate("section_RecentExpenses")}
              </Text> */}
            </>
          }
          renderItem={({ item }) => <ExpenseDetail expense={item} />}
          keyExtractor={(item) => item.id}
        />
      </ElementBlock>
      <Text style={typography.bodyError}>{text}</Text>

      <Button
        title={isDarkTheme ? "Use Light" : "Use Dark"}
        onPress={handleThemeChange}
      />
    </View>
  );
}

export default MainPage;
