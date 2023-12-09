import * as React from "react";
import {
  configureFonts,
  MD3LightTheme as DefaultTheme,
  Provider as PaperThemeProvider
} from "react-native-paper";

import { fontConfig } from "./font-config";

type ThemeInterface = typeof DefaultTheme;

const theme: ThemeInterface = {
  ...DefaultTheme,
  fonts: configureFonts({ config: fontConfig, isV3: true }),
  roundness: 7,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F37A49",
    onPrimary: "#ffffff",
    primaryContainer: "#ffffff", // Somente Teste
    onPrimaryContainer: "#e61212", // Somente Teste
    secondary: "#00437D",
    onSecondary: "#daf10b", // Somente Teste
    secondaryContainer: "#ffffff",
    onSecondaryContainer: "#000000", // Somente Teste
    tertiary: "#bbc6ca",
    onTertiary: "#daf10b", // Somente Teste
    tertiaryContainer: "#e61212", // Somente Teste
    onTertiaryContainer: "#e61212", // Somente Teste
    background: "#f8f8f8",
    onBackground: "#fa00e5", // Somente Teste
    surface: "#ffffff",
    onSurface: "#000000",
    surfaceVariant: "#e7e7e77d",
    onSurfaceVariant: "#333333", // Somente Teste
    outline: "#adadad",
    backdrop: "#00000052",
    inverseSurface: "#ff0808", // Somente Teste
    error: "#ce08ff", // Somente Teste
    onError: "#ce08ff", // Somente Teste
    errorContainer: "#ce08ff", // Somente Teste
    onErrorContainer: "#ce08ff" // Somente Teste
  }
};

export const ThemeProvider = ({ children }: any) => {
  return <PaperThemeProvider theme={theme}>{children}</PaperThemeProvider>;
};

export const InspectionStatusColors = {
  0: "#585858",
  1: "#01d6dd",
  2: "#0063e4",
  3: "#FEA500",
  4: "#b90000",
  5: "#177200"
};

export const TagStatus = {
  1: "#177200",
  2: "#b90000",
  3: "#FEA500"
};

export const TimeMaterialStatusColors = {
  1: "#585858",
  2: "#0063e4",
  3: "#01d6dd",
  4: "#177200",
  5: "#b90000"
};
