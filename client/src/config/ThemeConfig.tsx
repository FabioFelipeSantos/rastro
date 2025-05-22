import { type ReactNode } from "react";
import { ThemeProvider, createTheme, useColorScheme } from "@mui/material/styles";
import CssBaseLine from "@mui/material/CssBaseline";

export function ThemeConfig({ children }: { children: ReactNode }) {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    setMode("system");
  }

  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });

  return (
    <ThemeProvider
      theme={theme}
      defaultMode={mode}
    >
      <CssBaseLine />
      {children}
    </ThemeProvider>
  );
}
