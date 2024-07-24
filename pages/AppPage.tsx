import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";
import MainPage from "../pages/MainPage";
import { ThemeContext } from "../ds/ThemeProvider";
import { useContext } from "react";

const AppPage = () => {  
  const { blocks, colors } = useContext(ThemeContext);
  console.log("App render with backgournd color: ", colors.background);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={blocks.page}>
        <StatusBar style="auto" />
        <MainPage />
      </View>
    </SafeAreaView>
  );
}

export default AppPage;

