import { Text, View } from "react-native";
import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

function Panel(props: PanelProps) {
  const { blocks, measurements, typography, colors } = useContext(ThemeContext);
  return (
    <View
      style={{
        padding: measurements.twoX,
        borderRadius: measurements.threeX,
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
