import { type FC, type ReactNode } from "react";

import { ContainerStyles } from "./styles";

type ContainerProps = {
  children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => {
  return <ContainerStyles>{children}</ContainerStyles>;
};
