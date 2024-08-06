import { DateTime } from "luxon";
import { Expense } from "../provider/ExpensesReducer";
import { View, Text, StyleSheet } from "react-native";
import { localizeCurrency } from "../localization/Localization";
import { ThemeContext } from "../ds/ThemeProvider";
import { useContext } from "react";
import TextLozenge from "../ds/molecules/TextLozenge";

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
        <Text style={[typography.titleSmall, { marginBottom: 4 }]}>
          {expense.description}
        </Text>
        <Text style={typography.bodySmallPassive}>{printedDate}</Text>
      </View>
      <TextLozenge text={localizeCurrency(expense.amount)} />
      
    </View>
  );
}

type Props = {
  expense: Expense;
};

export default ExpenseDetail;
