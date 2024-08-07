import { useContext, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadExpenses } from "../repository/Expenses";
import { Expense } from "../provider/ExpensesReducer";
import { RootState } from "../provider/RootStore";
import ExpenseDetail from "../components/ExpenseDetail";
import { localizeCurrency, translate } from "../localization/Localization";
import { ThemeContext } from "../ds/ThemeProvider";
import ListHeader from "../ds/molecules/ListHeader";
import ElementBlock from "../ds/molecules/ElementBlock";
import LinkButton from "../ds/molecules/LinkButton";
import { useNavigation } from "@react-navigation/native";
import ExpenseSummary from "../components/ExpenseSummary";
import NewExpenseBottomSheet from "../components/NewExpenseBottomSheet";

const take = 5;
function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getExpenses() {
      await loadExpenses(dispatch);
    }

    getExpenses();
  }, []);

  const { blocks, typography, colors } = useContext(ThemeContext);

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
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[typography.body]}>{translate("common_Total")}</Text>
        <Text style={[typography.displaySmall, {}]}>
          {localizeCurrency(total)}
        </Text>
      </View>
      <LinkButton
        title={translate("expense_SeeXMore", { count: expenses.length - take })}
        disabled={false}
        onPress={handleSeeMore}
      />
    </>
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
      <NewExpenseBottomSheet />
    </View>
  );
}

export default MainPage;