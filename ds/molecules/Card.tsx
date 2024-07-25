import { AnimatableNumericValue, Text, View } from "react-native";
import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

function Card(props: CardProps) {
  const { blocks, measurements, typography, colors } = useContext(ThemeContext);
  return (
    <View
      style={{        
        borderRadius: measurements.oneAndHalfX as AnimatableNumericValue,
        backgroundColor: colors.surfaceContainer,
        ...blocks.shadow

      }}
    >      
      {props.children}
    </View>
  );
}

export default Card;

type CardProps = {
  children: React.ReactNode;  
};
