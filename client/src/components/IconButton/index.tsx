import { type ReactNode, type FC, type ButtonHTMLAttributes } from "react";

import { IconButtonStyles } from "./styles";

type IconButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton: FC<IconButtonProps> = ({ children, ...props }) => {
  return <IconButtonStyles {...props}>{children}</IconButtonStyles>;
};
