import { useContext, useState } from "react";
import { View, Text, Switch } from "react-native";
import { ThemeContext } from "../ds/ThemeProvider";
import Panel from "../ds/molecules/Panel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../provider/RootStore";
import { appSettingsActions } from "../provider/AppSettingsStorage";
import SettingsToggle from "../ds/molecules/SettingsToggle";
import ElementBlock from "../ds/molecules/ElementBlock";

function SettingsPage() {
  const { blocks } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const themeOptions = useSelector(
    (state: RootState) => state.appSettingsStore.themeSettings
  );

  const [submitting, isSubmitting] = useState(false);
  const darkModeEnabled = themeOptions.useDarkMode;

  const handleThemeChange = () => {
    isSubmitting(true);
    dispatch(
      appSettingsActions.useDarkMode(!(themeOptions?.useDarkMode ?? false))
    );
    setTimeout(() => {
      isSubmitting(false);
    }, 1000);
  };
  return (
    <View style={blocks.pageContainer}>
      <ElementBlock>
        <Panel title="Use Dark Mode">
          <SettingsToggle
            onValueChange={handleThemeChange}
            value={darkModeEnabled}
            disabled={submitting}
            text="Dark mode is better for night usage. or just looking cool"
          />
        </Panel>
      </ElementBlock>
    </View>
  );
}

export default SettingsPage;
