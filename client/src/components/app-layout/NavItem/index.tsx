import { type FC, type ReactNode } from "react";

import { NavItemStyles } from "./styles";

type NavItemProps = {
  to: string | Partial<{ pathname: string; search: string; hash: string }>;
  children: ReactNode;
};

export const NavItem: FC<NavItemProps> = ({ to, children }) => {
  return <NavItemStyles to={to}>{children}</NavItemStyles>;
};
