import { useState } from "react";
import { TextInput, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addNew } from "../repository/Expenses";
import { getCurrentMilliseconds } from "../extensions/time";
import { translate } from "../localization/Localization";
import { ThemeContext } from "../ds/ThemeProvider";
import { useContext } from "react";
import Panel from "../ds/molecules/Panel";

export function NewExpense() {
  const [amount, setAmount] = useState("0.0");
  const [description, setDescription] = useState("");
  const isSaving = useSelector((state: any) => state.ExpensesReducer.saving);
  const dispatch = useDispatch();

  const { blocks } = useContext(ThemeContext);

  function handleAmountChange(value: string) {
    console.log("Amount = ", value);
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
    <>
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
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={handleDescriptionChange}
        />
        <Button
          title={translate("action_AddExpense")}
          onPress={handleSaveExpense}
          disabled={isSaving}
        />
      </Panel>
    </>
  );
}
