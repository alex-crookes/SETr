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
import { appSettingsActions } from "../provider/AppSettingsStorage";

function MainPage() {
  const dispatch = useDispatch();
  const themeOptions = useSelector(
    (state: RootState) => state?.appSettingsStore?.themeSettings
  );

  useEffect(() => {
    loadExpenses(dispatch);
  }, []);

  const [submitting, isSubmitting] = useState(false);

  const { blocks, typography } = useContext(ThemeContext);

  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expensesStore.expenses
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.expensesStore.loading
  );

  const text = loading
    ? translate("common_Loading")
    : translate("expense_ThereAreX", { count: expenses.length });

  const title = `${translate("app_Name")} - ${translate(
    "section_RecentExpenses"
  )}`;
  const icon = themeOptions.useDarkMode ? "sunny-outline" : "moon-outline";

  const handleThemeChange = () => {
    isSubmitting(true);    
    dispatch(appSettingsActions.useDarkMode(!(themeOptions?.useDarkMode ?? false)));
    setTimeout(() => {
      isSubmitting(false);
    }, 1000);
  };

  const themeButtonText = themeOptions.useDarkMode
    ? "USE LIGHT MODE"
    : "USE DARK MODE";

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
