import { Text, View } from "react-native";
import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

function TextLozenge(props: TextLozengeProps) {
  const { typography, colors } = useContext(ThemeContext);

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 4,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[typography.title, {color: colors.inverseOnSurface}]}>
          {props.text}
        </Text>
      </View>
    </View>
  );
}

type TextLozengeProps = {
  text: string;
};

export default TextLozenge;