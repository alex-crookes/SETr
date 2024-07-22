import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addNew } from "../repository/Expenses";
import { getCurrentMilliseconds } from "../extensions/time";
import { translate } from "../localization/Localization";

export function NewExpense() {
  const [amount, setAmount] = useState("0.0");
  const [description, setDescription] = useState("");
  const isSaving = useSelector((state: any) => state.ExpensesReducer.saving);
  const dispatch = useDispatch();

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
    <View style={styles.container}>
      <Text style={styles.sectionHeading}>
        {translate("section_NewExpense")}
      </Text>
      <TextInput
        style={styles.inputField}
        keyboardType="decimal-pad"
        placeholder={translate("common_Amount")}
        value={amount.toString()}
        onChangeText={handleAmountChange}
      />
      <TextInput
        style={styles.inputField}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
  },
});
