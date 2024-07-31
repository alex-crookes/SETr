import { Text, View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../provider/RootStore";
import { ThemeContext } from "../ds/ThemeProvider";
import { useContext } from "react";
import ElementBlock from "../ds/molecules/ElementBlock";
import { Expense } from "../provider/ExpensesReducer";
import ListHeader from "../ds/molecules/ListHeader";
import ExpenseDetail from "../components/ExpenseDetail";
import { translate } from "../localization/Localization";

function ExpensesListPage() {
  const themeOptions = useSelector(
    (state: RootState) => state?.appSettingsStore?.themeSettings
  );
  const { blocks, typography } = useContext(ThemeContext);
  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expensesStore.expenses
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.expensesStore.loading
  );
  const title = `${translate("section_AllExpenses")}`;
  return (
    <View style={blocks.pageContainer}>
      <ElementBlock>
        <FlatList
          data={expenses}
          ListHeaderComponent={<ListHeader text={title} />}
          renderItem={({ item }) => <ExpenseDetail expense={item} />}
          keyExtractor={(item) => item.id}
        />
      </ElementBlock>
    </View>
  );
}

export default ExpensesListPage;
