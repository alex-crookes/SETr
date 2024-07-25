import { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../ThemeProvider";

const ListHeader = (props: ListHeaderProps) => {
  const { measurements, typography } = useContext(ThemeContext);
  return (
    <View
      style={{
        marginTop: measurements.fourX,
        marginBottom: measurements.twoX,
      }}
    >
      <Text style={typography.titleLarge}>{props.text}</Text>
    </View>
  );
};

type ListHeaderProps = {
  text: string;
};

export default ListHeader;
