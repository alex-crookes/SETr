import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";
import { ButtonProps } from "./PrimaryButton";

function LinkButton(props: ButtonProps) {
  const { measurements, typography, colors } = useContext(ThemeContext);
  
  const textOpacity = props.disabled ? 0.6 : 1;

  const buttonLabel = props.smallMode
    ? typography.smallButtonLabel
    : typography.buttonLabel;
  const height = props.smallMode
    ? measurements.smallButtonHeight
    : measurements.buttonHeight;
  const buttonTextColor = props.disabled ? colors.onSurface : colors.primary;

  const handleButtonPress = () => {
    if (props.onPress && !props.disabled) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      style={{
        height: height,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...buttonLabel,
            color: buttonTextColor,
            opacity: textOpacity,
            textTransform: "capitalize",
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default LinkButton;
