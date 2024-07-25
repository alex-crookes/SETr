import { Provider } from "react-redux";
import { reduxStore } from "./provider/RootStore";
import ThemeProvider from "./ds/ThemeProvider";
import AppPage from "./pages/AppPage";

export default function App() {
  return (
    <Provider store={reduxStore}>
      <ThemeProvider>
        <AppPage />
      </ThemeProvider>
    </Provider>
  );
}
