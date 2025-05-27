import { type FC, type ReactNode } from "react";

import { WidgetsContainerStyles } from "./styles";

type WidgetsContainerProps = {
  children: ReactNode;
};

export const WidgetsContainer: FC<WidgetsContainerProps> = ({ children }) => {
  return <WidgetsContainerStyles>{children}</WidgetsContainerStyles>;
};
