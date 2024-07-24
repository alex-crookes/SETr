import { DateTime } from "luxon";
import { Expense } from "../provider/ExpensesReducer";
import { View, Text, StyleSheet } from "react-native";
import { localizeCurrency } from "../localization/Localization";
import { ThemeContext } from "../ds/ThemeProvider";
import { useContext } from "react";

function ExpenseDetail({ expense }: Props) {
  const { measurements, typography, colors } = useContext(ThemeContext);

  const date = DateTime.fromMillis(expense.date).toLocaleString(
    DateTime.DATETIME_MED
  );
  const printedDate = date; //copy.l("date.formats.short", expense.date);
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: measurements.paragraphGap,
        paddingTop: measurements.paragraphGap,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Text style={typography.titleSmall}>{expense.description}</Text>
        <Text style={typography.bodySmallPassive}>{printedDate}</Text>
      </View>
      <View>
        <Text style={typography.title}>{localizeCurrency(expense.amount)}</Text>
      </View>
    </View>
  );
}

type Props = {
  expense: Expense;
};

export default ExpenseDetail;
