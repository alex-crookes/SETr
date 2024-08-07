import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../provider/RootStore";
import { ThemeContext } from "../ds/ThemeProvider";
import { useContext, useState } from "react";
import ElementBlock from "../ds/molecules/ElementBlock";
import { Expense } from "../provider/ExpensesReducer";
import ListHeader from "../ds/molecules/ListHeader";
import ExpenseDetail from "../components/ExpenseDetail";
import { translate } from "../localization/Localization";
import DateRangePicker from "../components/DateRangePicker";
import NewExpenseBottomSheet from "../components/NewExpenseBottomSheet";

function ExpensesListPage() {
  const { blocks } = useContext(ThemeContext);
  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expensesStore.expenses
  );

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const title = `${translate("section_AllExpenses")}`;

  const handleDateChange = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
    console.log(`update with State = ${startDate} - ${endDate}`);
  };

  const filteredExpenses = () => {
    if (!startDate || !endDate) {
      return expenses;
    }

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  };

  return (
    <View style={blocks.pageContainer}>
      <DateRangePicker onSuccess={handleDateChange} />
      <ElementBlock>
        <FlatList
          data={filteredExpenses()}
          ListHeaderComponent={<ListHeader text={title} />}
          renderItem={({ item }) => <ExpenseDetail expense={item} />}
          keyExtractor={(item) => item.id}
        />
      </ElementBlock>
      <NewExpenseBottomSheet />
    </View>
  );
}

export default ExpensesListPage;
