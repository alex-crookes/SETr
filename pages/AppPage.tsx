import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";
import MainPage from "../pages/MainPage";
import { ThemeContext } from "../ds/ThemeProvider";
import { useContext } from "react";
import TabNavigator from "../components/TabNavigator";

const AppPage = () => {
  const { blocks, colors } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* <View style={blocks.page}> */}
        <StatusBar style="auto" />
        {/* <MainPage /> */}
        <TabNavigator />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default AppPage;
