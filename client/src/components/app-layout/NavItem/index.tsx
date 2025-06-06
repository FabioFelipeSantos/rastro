import { type FC, type ReactNode } from "react";

import { NavItemStyles } from "./styles";

type NavItemProps = {
  to: string | Partial<{ pathname: string; search: string; hash: string }>;
  children: ReactNode;
  $isActive?: boolean;
};

export const NavItem: FC<NavItemProps> = ({ to, children, $isActive = false }) => {
  return (
    <NavItemStyles
      to={to}
      $isActive={$isActive}
    >
      {children}
    </NavItemStyles>
  );
};
