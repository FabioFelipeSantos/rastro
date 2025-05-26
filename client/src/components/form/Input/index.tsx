import { type InputHTMLAttributes, type FC } from "react";

import { InputStyles } from "./styles";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return <InputStyles {...props} />;
};
