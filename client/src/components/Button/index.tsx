import { type FC, type ButtonHTMLAttributes } from "react";

import { ButtonStyle } from "./styles";

type ButtonProps = {
  text: string;
  primary?: boolean;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ text, primary = true, fullWidth = false, ...props }) => {
  return (
    <ButtonStyle
      $primary={primary}
      $fullWidth={fullWidth}
      {...props}
    >
      {text}
    </ButtonStyle>
  );
};
