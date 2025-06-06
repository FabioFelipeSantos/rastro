import { Brightness4, Brightness7 } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { themeMode, toggleTheme } from "../../store/reducers/themeSlice";
import { IconButton } from "../IconButton";

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(themeMode);

  return (
    <div title={mode === "light" ? "Mudar para modo escuro" : "Mudar para modo claro"}>
      <IconButton
        onClick={() => dispatch(toggleTheme())}
        color="inherit"
        aria-label={`Muda para modo ${mode === "light" ? "Escuro" : "Claro"}`}
      >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </div>
  );
};
