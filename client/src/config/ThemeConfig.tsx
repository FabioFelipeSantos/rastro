import { useEffect, type ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { type AppDefaultTheme, type Colors } from "../types/theme";
import { GlobalStyle } from "./GlobalStyle";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setTheme, themeMode } from "../store/reducers/themeSlice";

type BaseTheme = Pick<AppDefaultTheme, "fonts" | "spacing" | "sizing" | "breakpoints" | "applyAlpha">;

const calculatingSpacing = (value: number = 1, type: string = "rem") => {
  if (type === "em") {
    return `${value}em`;
  }
  return `${value}rem`;
};

const calculatingSizing = (value: number = 1) => {
  return `${value}rem`;
};

const changingBrightness = (value: number) => {
  return (color: Colors[keyof Colors]) => {
    const oldColorText = color;
    const lightnessText = color.split(",")[2].trim().slice(0, -1);
    const oldLightnessValue = parseInt(lightnessText.split("%")[0]);
    const newLightnessValue = oldLightnessValue + value;
    return oldColorText.replace(lightnessText, `${newLightnessValue}%`);
  };
};

const applyingAlpha = (color: Colors[keyof Colors], alpha: number) => {
  if (alpha < 0) alpha = 0;
  if (alpha > 1) alpha = 1;

  const splittedColor = color.split(")");

  return [splittedColor[0], `, ${alpha})`].join("");
};

const baseTheme: BaseTheme = {
  fonts: {
    main: "Inter, sans-serif",
  },
  spacing: calculatingSpacing,
  sizing: calculatingSizing,
  breakpoints: {
    mobile: "57.6rem",
    tablet: "76.8rem",
    desktop: "99.2rem",
  },
  applyAlpha: applyingAlpha,
};

const lightTheme: AppDefaultTheme = {
  ...baseTheme,
  colors: {
    primary: "hsl(204, 62%, 38%)",
    secondary: "hsl(192, 19%, 95%)",
    background: "hsl(0, 0%, 100%)",
    text: "hsl(210, 25%, 8%)",
    border: "hsl(200, 19%, 84%)",
    cardBackground: "hsl(0, 0%, 100%)",
    accent: "hsl(204, 88%, 53%)",
    error: "hsl(356, 91%, 54%)",
    success: "hsl(160, 100%, 36%)",
    sidebarBackground: "hsl(0, 0%, 100%)",
    widgetBackground: "hsl(180, 14%, 97%)",
    hoverBackground: "hsl(240, 2%, 91%)",
    inputBackground: "hsl(192, 19%, 95%)",
    buttonText: "hsl(0, 0%, 100%)",
    link: "hsl(204, 88%, 53%)",
    icon: "hsl(206, 15%, 38%)",
  },
  changeBrightness: changingBrightness(-10),
};

const darkTheme: AppDefaultTheme = {
  ...baseTheme,
  colors: {
    primary: "hsl(204, 98%, 68%)",
    secondary: "hsl(210, 34%, 13%)",
    background: "hsl(240, 5%, 7%)",
    text: "hsl(180, 14%, 97%)",
    border: "hsl(206, 7%, 20%)",
    cardBackground: "hsl(210, 34%, 13%)",
    accent: "hsl(204, 88%, 53%)",
    error: "hsl(356, 91%, 54%)",
    success: "hsl(160, 100%, 36%)",
    sidebarBackground: "hsl(0, 0%, 0%)",
    widgetBackground: "hsl(210, 34%, 13%)",
    hoverBackground: "hsl(210, 9%, 13%)",
    inputBackground: "hsl(210, 27%, 20%)",
    buttonText: "hsl(0, 0%, 0%)",
    link: "hsl(204, 88%, 53%)",
    icon: "hsl(206, 14%, 59%)",
  },
  changeBrightness: changingBrightness(10),
};

type ThemeProviderProps = {
  children?: ReactNode;
};

export function ThemeProvider({ children = null }: ThemeProviderProps) {
  const mode = useAppSelector(themeMode);
  const usedTheme = mode === "light" ? lightTheme : darkTheme;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("themeMode") as "light" | "dark" | null;
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  return (
    <StyledThemeProvider theme={usedTheme}>
      <GlobalStyle theme={usedTheme} />
      {children}
    </StyledThemeProvider>
  );
}
