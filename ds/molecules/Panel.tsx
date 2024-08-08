import { AnimatableNumericValue, Text, View } from "react-native";
import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

function Panel(props: PanelProps) {
  const { measurements, typography, colors } = useContext(ThemeContext);
  return (
    <View
      style={{
        padding: measurements.twoX,
        borderRadius: measurements.oneAndHalfX as AnimatableNumericValue,
        backgroundColor: colors.surfaceContainer,
      }}
    >
      <Text style={{ ...typography.title, marginBottom: measurements.oneX }}>
        {props.title}
      </Text>
      {props.children}
    </View>
  );
}

export default Panel;

type PanelProps = {
  children: React.ReactNode;
  title: string;
};
