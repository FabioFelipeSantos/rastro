import { IconButton, Tooltip } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme();

  const handleChangeMode = () => {
    let newMode: "system" | "light" | "dark" = "dark";

    if (mode === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        newMode = "light";
      }
    } else {
      if (mode === "dark") {
        newMode = "light";
      }
    }
    setMode(newMode);
  };

  return (
    <Tooltip title={mode === "light" ? "Mudar para modo escuro" : "Mudar para modo claro"}>
      <IconButton
        onClick={handleChangeMode}
        color="inherit"
        aria-label={`Muda para modo ${mode === "light" ? "Escuro" : "Claro"}`}
      >
        {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};
