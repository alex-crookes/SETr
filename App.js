import { Provider } from "react-redux";
import { persistedStore, reduxStore } from "./provider/RootStore";
import ThemeProvider from "./ds/ThemeProvider";
import AppPage from "./pages/AppPage";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ThemeProvider>
          <AppPage />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
