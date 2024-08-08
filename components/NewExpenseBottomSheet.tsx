import { useContext, useRef, useState } from "react";
import FabIconButton from "../ds/molecules/FabIconButton";
import RBSheet from "react-native-raw-bottom-sheet";
import { ThemeContext } from "../ds/ThemeProvider";
import { TextInput, View } from "react-native";
import PrimaryButton from "../ds/molecules/PrimaryButton";
import { translate } from "../localization/Localization";
import { useDispatch, useSelector } from "react-redux";
import { addNew } from "../repository/Expenses";
import { getCurrentMilliseconds } from "../extensions/time";
import Panel from "../ds/molecules/Panel";

function NewExpenseBottomSheet() {
  const { colors, blocks, measurements } = useContext(ThemeContext);
  const sheet = useRef();
  const [amount, setAmount] = useState("0.0");
  const [description, setDescription] = useState("");
  const isSaving = useSelector((state: any) => state.expensesStore.saving);
  const dispatch = useDispatch();

  function handleAmountChange(value: string) {
    setAmount(value);
  }

  function handleDescriptionChange(value: string) {
    setDescription(value);
  }

  function handleSaveExpense() {
    const newAmount = parseFloat(amount);
    addNew(newAmount, description, getCurrentMilliseconds(), dispatch).then(
      () => {
        if (sheet.current) {
          sheet.current?.close();
        }
      }
    );
  }

  return (
    <View style={{ position: "absolute", bottom: 0, right: 0, height: 300 }}>
      <View
        style={{ position: "absolute", bottom: 16, right: 0, zIndex: 1000 }}
      >
        <FabIconButton
          icon={"add-outline"}
          onPress={() => sheet.current?.open()}
        />
      </View>
      <RBSheet
        ref={sheet}
        height={300}
        draggable
        dragOnContent={true}
        useNativeDriver={false}
        customStyles={{
          wrapper: { backgroundColor: colors.scrim },
          draggableIcon: { backgroundColor: colors.secondary },
          container: { backgroundColor: colors.surface, padding: 16 },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{ enabled: false }}
      >
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
      </RBSheet>
    </View>
  );
}

export default NewExpenseBottomSheet;
