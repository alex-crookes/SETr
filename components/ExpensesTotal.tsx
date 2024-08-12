import { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "../ds/ThemeProvider";
import { localizeCurrency, translate } from "../localization/Localization";
import NewExpenseBottomSheet from "./NewExpenseBottomSheet";
import { addOpacityToColor } from "../extensions/color";

function ExpensesTotal(props: ExpensesTotalProps) {
  const { typography, colors, measurements } = useContext(ThemeContext);

  return (
    <View
      style={{
        position: "absolute",
        bottom: measurements.twoX,
        padding: 8,
        paddingHorizontal: 16,
        left: 0,
        right: 0,
        height: measurements.tenX,
        backgroundColor: addOpacityToColor(colors.primaryContainer, 0.9),
        justifyContent: "center",
        borderRadius: 16,
      }}
    >
      <View>
        <Text style={[typography.caption]}>{translate("common_Total")}</Text>
        <Text style={[typography.displaySmall, {}]}>
          {localizeCurrency(props.total)}
        </Text>
      </View>
      <NewExpenseBottomSheet />
    </View>
  );
}

type ExpensesTotalProps = {
  total: number;
};

export default ExpensesTotal;
