import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode } from "../../types/theme";

const getInitialState = () => {
  if (localStorage.getItem("themeMode")) {
    if (localStorage) return localStorage.getItem("themeMode") as ThemeMode["mode"];
  }

  if (window.matchMedia("(prefers-colors-scheme): dark").matches) {
    return "dark";
  }

  return "light";
};

const initialState: ThemeMode = {
  mode: getInitialState(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<ThemeMode["mode"]>) => {
      state.mode = action.payload;
    },
  },
  selectors: {
    themeMode: (state) => state.mode,
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const { themeMode } = themeSlice.selectors;

export default themeSlice.reducer;
