import { useContext, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadExpenses } from "../repository/Expenses";
import { Expense } from "../provider/ExpensesReducer";
import { RootState } from "../provider/RootStore";
import ExpenseDetail from "../components/ExpenseDetail";
import { ThemeContext } from "../ds/ThemeProvider";
import ListHeader from "../ds/molecules/ListHeader";
import ElementBlock from "../ds/molecules/ElementBlock";
import LinkButton from "../ds/molecules/LinkButton";
import { useNavigation } from "@react-navigation/native";
import ExpenseSummary from "../components/ExpenseSummary";
import ExpensesTotal from "../components/ExpensesTotal";
import { translate } from "../localization/Localization";

const take = 5;
function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getExpenses() {
      await loadExpenses(dispatch);
    }

    getExpenses();
  }, []);

  const { blocks, colors } = useContext(ThemeContext);

  const navigator = useNavigation();

  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expensesStore.expenses
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.expensesStore.loading
  );

  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const mostRecentExpenses = expenses
    .slice(expenses.length - take, expenses.length)
    .reverse();

  const title = `${translate("section_RecentExpenses")}`;
  const header = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <View style={{ flex: 1 }}>
        <ListHeader text={title} />
      </View>
      {loading && (
        <View style={{}}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );

  const handleSeeMore = () => {
    navigator.navigate("Expenses");
  };

  const footer = (
    <LinkButton
      title={translate("expense_SeeXMore", { count: expenses.length - take })}
      disabled={false}
      onPress={handleSeeMore}
    />
  );

  return (
    <View style={blocks.pageContainer}>
      <ElementBlock>
        <ExpenseSummary />
      </ElementBlock>
      <ElementBlock>
        <FlatList
          data={mostRecentExpenses}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          renderItem={({ item }) => <ExpenseDetail expense={item} />}
          keyExtractor={(item) => item.id}
        />
      </ElementBlock>
      <ExpensesTotal total={total} />      
    </View>
  );
}

export default MainPage;
