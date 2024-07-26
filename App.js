import { Provider } from "react-redux";
import { reduxStore } from "./provider/RootStore";
import ThemeProvider from "./ds/ThemeProvider";
import AppPage from "./pages/AppPage";
import AppSettingsProvider from "./provider/AppSettingsStorage";

export default function App() {
  return (
    <Provider store={reduxStore}>
      <AppSettingsProvider>
        <ThemeProvider>
          <AppPage />
        </ThemeProvider>
      </AppSettingsProvider>
    </Provider>
  );
}
  