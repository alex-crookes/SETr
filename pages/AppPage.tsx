import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { ThemeContext } from "../ds/ThemeProvider";
import { useContext } from "react";
import TabNavigator from "../components/TabNavigator";

const AppPage = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="auto" />
      <TabNavigator />
    </SafeAreaView>
  );
};

export default AppPage;
