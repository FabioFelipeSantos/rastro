import { type InputHTMLAttributes, type FC } from "react";

import { InputStyles } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  $isError?: boolean;
}

export const Input: FC<InputProps> = ({ $isError = false, ...props }) => {
  return (
    <InputStyles
      $isError={$isError}
      {...props}
    />
  );
};
