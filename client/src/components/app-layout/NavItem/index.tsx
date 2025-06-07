import { type AnchorHTMLAttributes, type FC, type ReactNode } from "react";

import { NavItemStyles } from "./styles";

interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string | Partial<{ pathname: string; search: string; hash: string }>;
  children: ReactNode;
  $isActive?: boolean;
}

export const NavItem: FC<NavItemProps> = ({ to, children, $isActive = false, ...props }) => {
  return (
    <NavItemStyles
      to={to}
      $isActive={$isActive}
      {...props}
    >
      {children}
    </NavItemStyles>
  );
};
