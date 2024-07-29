import { useState } from "react";
import { TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addNew } from "../repository/Expenses";
import { getCurrentMilliseconds } from "../extensions/time";
import { translate } from "../localization/Localization";
import { ThemeContext } from "../ds/ThemeProvider";
import { useContext } from "react";
import Panel from "../ds/molecules/Panel";
import PrimaryButton from "../ds/molecules/PrimaryButton";

export function NewExpense() {
  const [amount, setAmount] = useState("0.0");
  const [description, setDescription] = useState("");
  const isSaving = useSelector((state: any) => state.expensesStore.saving);
  const dispatch = useDispatch();

  const { blocks, measurements, colors } = useContext(ThemeContext);

  function handleAmountChange(value: string) {
    setAmount(value);
  }

  function handleDescriptionChange(value: string) {
    setDescription(value);
  }

  function handleSaveExpense() {
    const newAmount = parseFloat(amount);
    addNew(newAmount, description, getCurrentMilliseconds(), dispatch);
  }

  return (
    <Panel title={translate("section_NewExpense")}>
      <TextInput
        style={blocks.inputTextField}
        keyboardType="decimal-pad"
        placeholder={translate("common_Amount")}
        value={amount.toString()}
        onChangeText={handleAmountChange}
      />
      <TextInput
        style={blocks.inputTextField}
        maxLength={200}
        placeholder={translate("common_Description")}
        placeholderTextColor={colors.outline}
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={handleDescriptionChange}
      />
      <View
        style={{
          width: measurements.twentyX,
          justifyContent: "center",
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <PrimaryButton
          title={translate("action_AddExpense")}
          onPress={handleSaveExpense}
          disabled={isSaving}
          icon={"cash-outline"}
          smallMode={true}
        />
      </View>
    </Panel>
  );
}
