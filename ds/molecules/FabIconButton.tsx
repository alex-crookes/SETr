import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AnimatableNumericValue, TouchableOpacity, View } from "react-native";

function FabIconButton(props: FabIconProps) {
  const { measurements, colors } = useContext(ThemeContext);
  const backgroundOpacity = props.disabled ? 0.12 : 1;
  const buttonColor = props.disabled ? colors.onSurface : colors.secondary;
  const iconColor = props.disabled ? colors.surface : colors.onSecondary;
  const size = props.smallMode
    ? measurements.smallFabSize
    : measurements.fabSize;
  const radius = Number(size) / 2;
  
  const iconSize = Number(size) - (props.smallMode ? 8 : 12) //props.smallMode ? measurements.threeX : measurements.threeX;

  const handleButtonPress = () => {
    if (props.onPress && !props.disabled) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      style={{
        width: size,
        height: size,
        backgroundColor: buttonColor,
        borderRadius: radius as AnimatableNumericValue,
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
        <Ionicons
          name={props.icon}
          size={iconSize as number}
          color={iconColor}
        />
      </View>
    </TouchableOpacity>
  );
}

type FabIconProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void | null;
  disabled?: boolean;
  smallMode?: boolean | undefined;
};

export default FabIconButton;
