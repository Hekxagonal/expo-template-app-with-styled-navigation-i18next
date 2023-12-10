import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";

import { ThemeProvider } from "./src/global/theme";
import { Routes } from "./src/routes";

import "./src/global/i18n";
import { AlertProvider } from "~hooks/useAlert";
import { LoadingProvider } from "~hooks/useLoading";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadFonts = useCallback(async () => {
    // await Font.loadAsync({
    //   "Montserrat-light": require("./src/assets/fonts/Montserrat-Light.ttf"),
    //   "Montserrat-medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
    //   "Montserrat-regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
    //   "Montserrat-semibold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    //   "Montserrat-thin": require("./src/assets/fonts/Montserrat-Thin.ttf")
    // });
    await SplashScreen.hideAsync();
    setIsReady(true);
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  return isReady ? (
    <ThemeProvider>
      <LoadingProvider>
        <AlertProvider>
          <Routes />
        </AlertProvider>
      </LoadingProvider>
    </ThemeProvider>
  ) : null;
}
