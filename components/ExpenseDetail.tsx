import { DateTime } from "luxon";
import { Expense } from "../provider/ExpensesReducer";
import { View, Text, StyleSheet } from "react-native";
import { localizeCurrency } from "../localization/Localization";

function ExpenseDetail({ expense }: Props) {
  const date = DateTime.fromMillis(expense.date).toLocaleString(
    DateTime.DATETIME_MED
  );
  const printedDate = date //copy.l("date.formats.short", expense.date);
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{expense.description}</Text>
        <Text style={styles.dateText}>{printedDate}</Text>
      </View>
      <View>
        <Text style={styles.amountText}>
          {localizeCurrency(expense.amount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  amountText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#444",
  },
});

type Props = {
  expense: Expense;
};

export default ExpenseDetail;
