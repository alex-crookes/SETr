import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import { reduxStore } from "./provider/RootStore";
import MainPage from "./pages/MainPage";

export default function App() {
  // const expenseData = {
  //   amount: 59.96,
  //   description: "Groceries",
  //   date: getCurrentMilliseconds(),
  // };

  // storeExpenseData(expenseData);

  return (
    <Provider store={reduxStore}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <MainPage />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 16,
  },
});
