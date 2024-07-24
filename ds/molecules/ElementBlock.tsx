import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../ThemeProvider";

const ElementBlock = (props: ElementBlockProps) => {
  const { measurements } = useContext(ThemeContext);

  console.log("Element Render")
  return (
    <View
      style={{
        marginTop: measurements.elementGap,
      }}
    >
      {props.children}
    </View>
  );
};

type ElementBlockProps = {
  children: React.ReactNode;
};

export default ElementBlock;