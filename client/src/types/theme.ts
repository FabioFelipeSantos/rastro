export type ThemeMode = {
  mode: "light" | "dark";
};

export type Colors = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
  cardBackground: string;
  accent: string;
  error: string;
  success: string;
  sidebarBackground: string;
  widgetBackground: string;
  hoverBackground: string;
  inputBackground: string;
  buttonText: string;
  link: string;
  icon: string;
};

export interface AppDefaultTheme {
  colors: Colors;
  changeBrightness: (color: Colors[keyof Colors]) => string;
  applyAlpha: (color: Colors[keyof Colors], alpha: number) => string;
  fonts: {
    main: string;
  };
  spacing: (value?: number, type?: "rem" | "em") => string; // Para margin, padding e outros espaços no tema
  sizing: (value?: number) => string; // Para fontes apenas
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
