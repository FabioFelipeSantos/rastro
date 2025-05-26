import { Person } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { themeMode, toggleTheme } from "../../store/reducers/themeSlice";

import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { Input } from "../../components/form/Input";
import { TextArea } from "../../components/form/TextArea";

export const Users = () => {
  const theme = useAppSelector(themeMode);
  const dispatch = useAppDispatch();

  const handlingClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <h1>Users</h1>
      <Button
        text={theme === "light" ? "Mudar para escuro" : "Mudar para Claro"}
        onClick={handlingClick}
      />
      <IconButton>
        <Person />
      </IconButton>

      <label>
        <h3>Input</h3>
        <Input placeholder="Algum Input Maroto" />
      </label>

      <label>
        <h3>TextArea</h3>
        <TextArea placeholder="Text Area" />
      </label>
    </>
  );
};
