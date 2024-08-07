import { AnimatableNumericValue, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons"

function PrimaryButton(props: ButtonProps) {
  const { measurements, typography, colors } = useContext(ThemeContext);

  const backgroundOpacity = props.disabled ? 0.12 : 1;
  const buttonColor = props.disabled ? colors.onSurface : colors.primary;  
  const textOpacity = props.disabled ? 0.6 : 1;

  const buttonLabel = props.smallMode ? typography.smallButtonLabel : typography.buttonLabel;
  const cornerRadius = props.smallMode
    ? measurements.smallButtonCornerRadius
    : measurements.buttonCornerRadius;
  const height = props.smallMode ? measurements.smallButtonHeight : measurements.buttonHeight;
  const textColor = props.disabled ? colors.onSurface : colors.onPrimary;  
  const handleButtonPress = () => {
    if (props.onPress && !props.disabled) {
      props.onPress();
    }
  }
  const iconSize = props.smallMode ? measurements.twoX : measurements.threeX;

  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      style={{
        height: height,
        backgroundColor: buttonColor,
        borderRadius: cornerRadius as AnimatableNumericValue,
        elevation: measurements.oneHalfX as number,
        opacity: backgroundOpacity,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.icon &&
          <Ionicons name={props.icon} size={iconSize as number} color={textColor} style={{marginEnd: measurements.oneX}} />
        }

        <Text
          style={{
            ...buttonLabel,
            color: colors.onPrimary,
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

export type ButtonProps = {
  icon?: keyof typeof Ionicons.glyphMap|undefined;
  title: string;
  onPress: () => void | null;
  disabled?: boolean;
  smallMode?: boolean|undefined;
};

export default PrimaryButton;
