import { type FC, type ReactNode } from "react";

import { SidebarContainerStyles } from "./styles";

type SidebarContainerProps = {
  children: ReactNode;
};

export const SidebarContainer: FC<SidebarContainerProps> = ({ children }) => {
  return <SidebarContainerStyles>{children}</SidebarContainerStyles>;
};
