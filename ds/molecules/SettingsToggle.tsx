import { View, Text, Switch } from "react-native";
import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

function SettingsToggle(props: SettingsToggleProps) {
  const { typography } = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Text style={[typography.body, { flex: 1 }]} numberOfLines={2}>
        Dark mode is better for night usage. or just looking cool
      </Text>
      <Switch
        disabled={props.disabled}
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </View>
  );
}

type SettingsToggleProps = {
  onValueChange: () => void;
  value: boolean;
  disabled: boolean;
  text: string;
};

export default SettingsToggle;
