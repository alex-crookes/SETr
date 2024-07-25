import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
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
import SecondaryButton from "../ds/molecules/SecondaryButton";

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadExpenses(dispatch);
  }, []);

  const [submitting, isSubmitting] = useState(false);

  const { isDarkTheme, blocks, typography, toggleTheme } =
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
  const icon = isDarkTheme ? "sunny-outline" : "moon-outline";

  const handleThemeChange = () => {
    isSubmitting(true);
    toggleTheme();
    setTimeout(() => {
      isSubmitting(false);
    }, 1000);
  };

  const themeButtonText = isDarkTheme ? "USE LIGHT MODE" : "USE DARK MODE";

  return (
    <View style={blocks.pageContainer}>
      <ElementBlock>
        <NewExpense />
        <FlatList
          data={expenses}
          ListHeaderComponent={<ListHeader text={title} />}
          renderItem={({ item }) => <ExpenseDetail expense={item} />}
          keyExtractor={(item) => item.id}
        />
      </ElementBlock>
      <Text style={typography.bodyError}>{text}</Text>

      <SecondaryButton
        title={themeButtonText}
        onPress={handleThemeChange}
        disabled={submitting}
        icon={icon}        
      />
    </View>
  );
}

export default MainPage;
