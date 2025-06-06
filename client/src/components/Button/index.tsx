import { type FC, type ButtonHTMLAttributes } from "react";

import { ButtonStyle } from "./styles";

type ButtonProps = {
  text: string;
  primary?: boolean;
  fullWidth?: boolean;
  variant?: "default" | "outline";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ text, primary = true, fullWidth = false, variant = "default", ...props }) => {
  return (
    <ButtonStyle
      $primary={primary}
      $fullWidth={fullWidth}
      $variant={variant}
      {...props}
    >
      {text}
    </ButtonStyle>
  );
};
