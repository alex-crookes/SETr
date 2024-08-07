import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "../pages/MainPage";
import ExpensesListPage from "../pages/ExpensesListPage";
import SettingsPage from "../pages/SettingsPage";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../ds/ThemeProvider";
import { useSelector } from "react-redux";
import { RootState } from "../provider/RootStore";
import { hexToRGB } from "../extensions/color";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const { colors } = useContext(ThemeContext);
  const themeOptions = useSelector(
    (state: RootState) => state?.appSettingsStore?.themeSettings
  );
  const theme = {
    colors: {
      primary: hexToRGB(colors.primary),
      background: hexToRGB(colors.background),
      text: hexToRGB(colors.onSurface),
      card: hexToRGB(colors.surface),
      notification: hexToRGB(colors.error),
      border: hexToRGB(colors.outline),
    },
    dark: themeOptions.useDarkMode,
  };

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "home";
              if (route.name === "Expenses") {
                iconName = "list";
              } else if (route.name === "Settings") {
                iconName = "settings";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          };
        }}
      >
        <Tab.Screen name="Main" component={MainPage} />
        <Tab.Screen name="Expenses" component={ExpensesListPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigator;
